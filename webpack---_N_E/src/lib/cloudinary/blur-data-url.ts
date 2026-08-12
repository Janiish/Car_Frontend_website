import { getCldImageUrl } from "next-cloudinary";

const BLUR_WIDTH = 24;
const BLUR_QUALITY = 30;
const FETCH_TIMEOUT_MS = 3000;

/**
 * Module-level cache, keyed `${publicId}@${version ?? 0}`. Dedupes repeat
 * lookups of the same asset (shared across locales, or across the
 * carousel/thumbnail/details variants of one history item) within a single
 * warm server process — steady-state ISR cost is zero once populated.
 */
const blurCache = new Map<string, Promise<string | null>>();

/**
 * Fetches a tiny (24px wide, q30) Cloudinary derivative and returns it as a
 * base64 data URL (~300–600 bytes), suitable for next/image's `blurDataURL`.
 *
 * `blurDataURL` MUST be a base64 data URL — next/image inlines it into an
 * SVG placeholder via `<image href>`, and SVG-as-image cannot fetch a remote
 * Cloudinary URL. JPEG output (not `f_auto`) is deliberate: this runs
 * server-side with no browser to content-negotiate a format with, and JPEG
 * is a safe, universally-decodable choice for a tiny embedded preview.
 *
 * Never throws — returns `null` on any failure (timeout, non-2xx, network
 * error) so a missing/slow placeholder degrades to "no placeholder", never a
 * broken build or a hung request.
 */
export async function getCldBlurDataUrl(
    publicId: string,
    version?: number | null
): Promise<string | null> {
    const cacheKey = `${publicId}@${version ?? 0}`;
    const cached = blurCache.get(cacheKey);
    if (cached) return cached;

    const promise = (async (): Promise<string | null> => {
        try {
            const url = getCldImageUrl({
                src: publicId,
                width: BLUR_WIDTH,
                quality: BLUR_QUALITY,
                format: "jpg",
            });
            const response = await fetch(url, {
                signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            });
            if (!response.ok) return null;
            const arrayBuffer = await response.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString("base64");
            return `data:image/jpeg;base64,${base64}`;
        } catch {
            return null;
        }
    })();

    blurCache.set(cacheKey, promise);
    return promise;
}

type CloudinaryAssetLike = {
    public_id?: string | null;
    resource_type?: "image" | "video" | null;
    version?: number | null;
    blur_data_url?: string | null;
    [key: string]: unknown;
};

function isImageAssetArray(value: unknown): value is CloudinaryAssetLike[] {
    if (!Array.isArray(value) || value.length === 0) return false;
    const first = value[0];
    return (
        typeof first === "object" &&
        first !== null &&
        "public_id" in first &&
        (first as CloudinaryAssetLike).resource_type === "image"
    );
}

/**
 * Recursively finds every Cloudinary image-asset array reachable from `node`
 * and pushes each one (by reference, not copy) into `found`.
 */
function collectImageAssetArrays(node: unknown, found: CloudinaryAssetLike[][]): void {
    if (Array.isArray(node)) {
        if (isImageAssetArray(node)) {
            found.push(node);
            return;
        }
        for (const item of node) collectImageAssetArrays(item, found);
        return;
    }
    if (node && typeof node === "object") {
        for (const value of Object.values(node)) collectImageAssetArrays(value, found);
    }
}

/**
 * Deep-walks a freshly-fetched homepage page object and adds `blur_data_url`
 * to every image-type Cloudinary asset entry found — History item
 * asset/thumbnailAsset/detailsAsset, Teams carousel media, News
 * heroAsset/driver.asset/team.asset/ModuleImage asset, anything shaped like
 * `ContentfulCloudinaryAssetField` — covering all homepage images and
 * nothing outside it.
 *
 * Mutates the matched asset objects **in place**. This is safe here
 * specifically because `decorateCloudinaryAssetsWithBlur` is only ever
 * called once, synchronously, immediately after `page` is freshly assembled
 * in `fetchHomepageAndNewsArticles` — before it is dehydrated, cached, or
 * shared with anything else that might assume immutability.
 *
 * Server-only: returns `page` unchanged in the browser. The client-side
 * `queryFn` path only actually executes for Preview mode (non-preview uses
 * `staleTime: Infinity` and never re-runs client-side) — Preview renders
 * without blur placeholders, an acceptable, graceful degradation.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export async function decorateCloudinaryAssetsWithBlur<T>(page: T): Promise<T> {
    if (typeof window !== "undefined") return page;

    const found: CloudinaryAssetLike[][] = [];
    collectImageAssetArrays(page, found);

    if (found.length === 0) return page;

    const uniqueAssets = new Map<string, { publicId: string; version?: number | null }>();
    for (const assetArray of found) {
        const asset = assetArray[0];
        if (!asset.public_id) continue;
        const key = `${asset.public_id}@${asset.version ?? 0}`;
        if (!uniqueAssets.has(key)) {
            uniqueAssets.set(key, { publicId: asset.public_id, version: asset.version });
        }
    }

    const resolvedEntries = await Promise.all(
        Array.from(uniqueAssets.entries()).map(async ([key, { publicId, version }]) => {
            const blurDataUrl = await getCldBlurDataUrl(publicId, version);
            return [key, blurDataUrl] as const;
        })
    );
    const blurByKey = new Map(resolvedEntries);

    for (const assetArray of found) {
        const asset = assetArray[0];
        if (!asset.public_id) continue;
        const key = `${asset.public_id}@${asset.version ?? 0}`;
        asset.blur_data_url = blurByKey.get(key) ?? null;
    }

    return page;
}

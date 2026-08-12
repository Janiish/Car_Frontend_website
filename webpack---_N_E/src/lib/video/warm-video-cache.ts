/**
 * Low-priority fetch that lands a video URL in the HTTP cache so a later
 * real `<video>`/`ScrubPlayer` fetch is served locally. Used instead of
 * `<link rel="prefetch">`, which Safari doesn't support and browsers
 * deprioritize for multi-MB payloads.
 *
 * The response body is fully consumed (`.blob()`) — `fetch()` alone settles at
 * headers, so without draining the stream a multi-MB video can be cancelled
 * before it lands in the cache and `warmVideoCacheAsync` would resolve long
 * before the file is actually downloaded.
 *
 * Module-scope dedupe set: a URL already warmed (or in-flight) is never
 * re-fetched by a second call site within the same page lifetime — shared
 * across every caller of this module (cars-section.tsx, homepage-loader.tsx).
 */
const warmedVideoUrls = new Set<string>();

/** Fire-and-forget warm-up. */
export function warmVideoCache(url: string): void {
    if (warmedVideoUrls.has(url)) return;
    warmedVideoUrls.add(url);
    fetch(url, { priority: "low" } as RequestInit)
        .then((res) => res.blob())
        .catch(() => {
            warmedVideoUrls.delete(url);
        });
}

/**
 * Same dedupe/fetch behavior as `warmVideoCache`, but returns a promise that
 * resolves once the file is **fully downloaded** (or the fetch fails) — for
 * callers that need to know when the warm-up is done (e.g. the homepage
 * loader's reveal gate) rather than firing and forgetting. Shares the same
 * dedupe set, so a URL already in flight (or already warmed) via the
 * fire-and-forget variant resolves immediately here too.
 */
export function warmVideoCacheAsync(url: string): Promise<void> {
    if (warmedVideoUrls.has(url)) return Promise.resolve();
    warmedVideoUrls.add(url);
    return fetch(url, { priority: "low" } as RequestInit)
        .then((res) => res.blob())
        .catch(() => {
            warmedVideoUrls.delete(url);
        })
        .then(() => undefined);
}

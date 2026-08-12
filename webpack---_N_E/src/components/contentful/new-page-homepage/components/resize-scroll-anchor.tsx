import { useResizeScrollAnchor } from "../hooks/use-resize-scroll-anchor";

/**
 * Render-less mount point for useResizeScrollAnchor — the hook needs the
 * Lenis context, so it can't live in NewPageHomepage itself (which renders
 * the provider).
 */
const ResizeScrollAnchor = () => {
    useResizeScrollAnchor();
    return null;
};

ResizeScrollAnchor.displayName = "ResizeScrollAnchor";

export { ResizeScrollAnchor };

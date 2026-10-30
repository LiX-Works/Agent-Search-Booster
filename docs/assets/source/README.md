# Illustration source backup

The two SVG files are self-contained, editable source copies of the README illustration. Logo artwork is embedded in the SVG; no network access is needed to open it.

Both versions have transparent backgrounds. The dark variant adjusts caption and connector contrast and uses a light GitHub silhouette. Node positions are identical.

To reproduce the 3200 x 1800 PNG files, install `sharp` in a separate Node.js workspace, make it available to `render.mjs`, and run `node assets/source/render.mjs` from the repository root. The SVG source remains the canonical editable copy; the PNG files are used in the README for consistent logo rendering.

See [asset sources](ASSET_SOURCES.md) for third-party artwork provenance.

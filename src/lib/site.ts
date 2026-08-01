/**
 * Canonical site identity, used to build the absolute URLs that link previews
 * require. Crawlers reject relative og:image/og:url values, and the request
 * origin can't be trusted for this -- it's whatever host served the page,
 * including preview deployments -- so the production origin is pinned here.
 */
export const SITE_URL = 'https://diaza.dev';

export const SITE_NAME = 'Diaza';
export const AUTHOR = 'Angel Diaz';

export const DEFAULT_TITLE = 'Angel Diaz - Full Stack Software Engineer';
export const DEFAULT_DESCRIPTION =
	'Angel Diaz, full stack software engineer from Puerto Rico. Projects, writing and contact.';

/** Social card shipped by scripts/generate-icons.mjs. */
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_IMAGE_ALT = `${AUTHOR} - Full Stack Software Engineer`;

/** Resolves a site-relative path against SITE_URL, passing absolute URLs through. */
export function absoluteUrl(pathOrUrl: string): string {
	return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : new URL(pathOrUrl, SITE_URL).href;
}

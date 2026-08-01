/**
 * Generates every icon variant the site ships from a single source SVG.
 *
 *   node scripts/generate-icons.mjs   (or: npm run icons)
 *
 * Source of truth is src/lib/assets/favicon.svg -- a 1000x1000 black rounded
 * square with the white "Diaza." wordmark. Three variants come out of it.
 *
 * By backdrop:
 *   rounded  - corners already cut, transparent outside them. Used anywhere the
 *              platform draws the icon as-is (browser tabs, PWA "any" icons).
 *   square   - full-bleed black background. Used anywhere the platform applies
 *              its own mask (iOS home screen, Android adaptive/maskable icons).
 *              Masking a pre-rounded icon double-rounds it and looks wrong.
 *
 * By optical size:
 *   wordmark - the full "Diaza.". Legible from roughly 32px up, so it is what
 *              the home-screen and PWA icons use.
 *   compact  - just "D." at 3.3x the size. Five glyphs across a 16px favicon
 *              collapse into a grey smear, so tab icons get this instead. Same
 *              lockup, same period, sized for the space it actually renders in.
 *
 * The wordmark sits inside a 31%-radius circle from centre, comfortably within
 * the 40% maskable safe zone, so no extra padding is needed for the square set.
 *
 * Outputs are committed to static/, so this only needs re-running when the logo
 * changes. Text in the OG image is rasterised with locally installed fonts.
 */

import { Buffer } from 'node:buffer';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'src/lib/assets/favicon.svg');
const OUT = path.join(root, 'static');

const BRAND_BLACK = '#000000';
const ZINC_100 = '#f4f4f5';
const ZINC_500 = '#71717a';
const ZINC_700 = '#3f3f46';
const ZINC_900 = '#18181b';
const OG_FONT = "'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const source = await readFile(SOURCE, 'utf8');

const ROUNDED_BACKDROP = /<g transform="matrix\(0\.730994[\s\S]*?<\/g>/;
const SQUARE_BACKDROP = `<rect x="0" y="0" width="1000" height="1000" fill="${BRAND_BLACK}"/>`;

/** The seven per-glyph groups of the wordmark: D i a z a . and a trailing empty one. */
const glyphs = source.match(/<g transform="matrix\(50,0,0,50,[\s\S]*?<\/g>/g) ?? [];
/** Shared parent transform that maps glyph space into the 1000x1000 canvas. */
const GLYPH_SPACE = 'matrix(4.010773,0,0,4.010773,-1495.11802,-1676.232275)';

if (glyphs.length !== 7 || !ROUNDED_BACKDROP.test(source)) {
	throw new Error(
		`Unexpected favicon.svg structure (${glyphs.length} glyphs) -- the compact mark and ` +
			'square backdrop are derived from its transforms and need revisiting.'
	);
}

const roundedSvg = Buffer.from(source);
const squareSvg = Buffer.from(source.replace(ROUNDED_BACKDROP, SQUARE_BACKDROP));

/**
 * Builds the "D." lockup by keeping the D where it is and pulling the period in
 * behind it, then scaling the pair to fill 46% of the canvas height.
 *
 * The numbers below are the mark's bounding box in canvas units, derived from the
 * source transforms: the D runs x 198.8->324.2, the repositioned period ends at
 * x 388.9, and both share a cap height of y 433.1->573.4.
 */
function compactMark(backdrop) {
	const [D] = glyphs;
	const period = glyphs[5].replace('560.005344', '457.2');
	const scale = 460 / 140.36;

	return Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
    ${backdrop}
    <g transform="translate(500,500) scale(${scale.toFixed(4)}) translate(-293.85,-503.24)">
        <g transform="${GLYPH_SPACE}">${D}${period}</g>
    </g>
</svg>
`
	);
}

const compactRoundedSvg = compactMark(source.match(ROUNDED_BACKDROP)[0]);

/**
 * Rasterise one of the source SVGs at `size`. Passing `opaque` drops the alpha
 * channel: iOS composites transparent home-screen icons against black rather
 * than honouring them, and some link scrapers do the same to og:image.
 */
const render = (svg, size, opaque) => {
	const pipeline = sharp(svg, { density: 384 }).resize(size, size, {
		fit: 'contain',
		background: { r: 0, g: 0, b: 0, alpha: 0 }
	});
	return (opaque ? pipeline.flatten({ background: opaque }) : pipeline)
		.png({ compressionLevel: 9 })
		.toBuffer();
};

/**
 * Packs PNGs into a multi-resolution .ico. PNG-compressed entries are understood
 * by every browser still in service, and keep the file an order of magnitude
 * smaller than the equivalent BMP payloads.
 */
function buildIco(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(images.length, 4);

	const directory = Buffer.alloc(16 * images.length);
	let offset = header.length + directory.length;

	images.forEach(({ size, data }, i) => {
		const entry = i * 16;
		directory.writeUInt8(size >= 256 ? 0 : size, entry); // 0 means 256
		directory.writeUInt8(size >= 256 ? 0 : size, entry + 1);
		directory.writeUInt8(0, entry + 2); // palette size
		directory.writeUInt8(0, entry + 3); // reserved
		directory.writeUInt16LE(1, entry + 4); // colour planes
		directory.writeUInt16LE(32, entry + 6); // bits per pixel
		directory.writeUInt32LE(data.length, entry + 8);
		directory.writeUInt32LE(offset, entry + 12);
		offset += data.length;
	});

	return Buffer.concat([header, directory, ...images.map((image) => image.data)]);
}

/** 1200x630 social card: brand tile over the site's own zinc-100 canvas. */
async function buildOgImage() {
	const width = 1200;
	const height = 630;
	const tile = 132;

	const backdrop = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
	<rect width="${width}" height="${height}" fill="${ZINC_100}"/>
	<g font-family="${OG_FONT}" text-anchor="middle">
		<text x="600" y="330" font-size="66" font-weight="700" fill="${ZINC_900}">Angel Diaz</text>
		<text x="600" y="381" font-size="28" font-weight="700" fill="${ZINC_700}">Full Stack Software Engineer &#183; Puerto Rico</text>
		<text x="600" y="452" font-size="26" fill="${ZINC_500}">I build web apps end to end, from the UI down to the servers they run on.</text>
		<text x="600" y="551" font-size="21" font-weight="700" letter-spacing="4" fill="${ZINC_900}">DIAZA.DEV</text>
	</g>
</svg>`);

	const composed = await sharp(backdrop, { density: 72 })
		.composite([{ input: await render(roundedSvg, tile), top: 108, left: (width - tile) / 2 }])
		.png()
		.toBuffer();

	// Flattening has to happen in its own pass: sharp orders it ahead of
	// composite internally, so chaining it above would leave the alpha behind.
	return sharp(composed).flatten({ background: ZINC_100 }).png({ compressionLevel: 9 }).toBuffer();
}

await mkdir(OUT, { recursive: true });

const written = [];
const emit = async (name, data) => {
	await writeFile(path.join(OUT, name), data);
	written.push([name, data.length]);
};

// Tab / bookmark icons, all on the compact "D." so the family stays consistent
// at the sizes it renders at. The SVG is what modern browsers actually use; the
// .ico covers the hardcoded /favicon.ico request and the PNG covers the rest.
await emit('favicon.svg', compactRoundedSvg);
await emit(
	'favicon.ico',
	buildIco(
		await Promise.all(
			[16, 32, 48].map(async (size) => ({ size, data: await render(compactRoundedSvg, size) }))
		)
	)
);
await emit('favicon-96x96.png', await render(compactRoundedSvg, 96));

// iOS home screen. 180x180 is the size current iPhones ask for, and iOS applies
// its own squircle mask -- hence the square (full-bleed) variant.
await emit('apple-touch-icon.png', await render(squareSvg, 180, BRAND_BLACK));

// PWA install icons: "any" keeps our own rounding, "maskable" hands the corners
// to the platform so Android can shape it to match the launcher.
await emit('web-app-manifest-192x192.png', await render(roundedSvg, 192));
await emit('web-app-manifest-512x512.png', await render(roundedSvg, 512));
await emit('web-app-manifest-maskable-192x192.png', await render(squareSvg, 192, BRAND_BLACK));
await emit('web-app-manifest-maskable-512x512.png', await render(squareSvg, 512, BRAND_BLACK));

await emit('og-image.png', await buildOgImage());

const pad = Math.max(...written.map(([name]) => name.length));
for (const [name, bytes] of written) {
	console.log(`  ${name.padEnd(pad)}  ${(bytes / 1024).toFixed(1).padStart(6)} KB`);
}
console.log(`\n${written.length} files written to static/`);

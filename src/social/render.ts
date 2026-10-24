/**
 * Shared pieces of the social preview images (og:image / twitter:image), rendered
 * at build time with Satori: fonts, the element helper and PNG output.
 */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import type { ImageMetadata } from "astro";
import satori from "satori";
import sharp from "sharp";
import { socialImageSize } from "../data/site";

/** Bump when the images' design changes, so social networks fetch them again. */
const designVersion = 2;

export const { width, height } = socialImageSize;

export const colors = {
  beige: "#f9f5f1",
  line: "#e6e0d8",
  fg: "#2e3036",
  fgMuted: "#555861",
  fgSubtle: "#6b6e76",
};

const require = createRequire(import.meta.url);
// Satori reads WOFF but not WOFF2, so these come from the static Fontsource packages.
const font = (family: string, weight: number) =>
  readFile(require.resolve(`@fontsource/${family}/files/${family}-latin-${weight}-normal.woff`));

/** A minimal stand-in for JSX: Satori takes React-like element objects. */
export function h(type: string, style: Record<string, unknown>, ...children: unknown[]) {
  return { type, props: { style, children: children.length === 1 ? children[0] : children } };
}

export function img(src: string, imageWidth: number, imageHeight: number, style: Record<string, unknown> = {}) {
  return { type: "img", props: { src, width: imageWidth, height: imageHeight, style } };
}

export function dataURL(data: Buffer | string, type: string): string {
  return `data:${type};base64,${Buffer.from(data).toString("base64")}`;
}

// Every image in src/assets/images, to find an imported image's file from its URL.
const assets = import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/*.{svg,png,jpg}", { eager: true });
const assetPaths = new Map(
  Object.entries(assets).map(([path, module]) => [module.default.src, resolve(process.cwd(), path.slice(1))]),
);

/** An image imported through astro:assets or a content collection, as a data URL. */
export async function assetDataURL(image: ImageMetadata): Promise<string> {
  const path = assetPaths.get(image.src);
  if (!path) throw new Error(`Couldn't find the file of ${image.src} for a social image.`);
  const data = await readFile(path);
  if (image.format === "svg") return dataURL(data, "image/svg+xml");
  // Big screenshots are scaled down first; the image is at most 630px tall.
  const png = await sharp(data)
    .resize({ height: height * 2, withoutEnlargement: true })
    .png()
    .toBuffer();
  return dataURL(png, "image/png");
}

/** Fits an image in a box, keeping its aspect ratio. */
export function fit(image: { width: number; height: number }, maxWidth: number, maxHeight: number) {
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
  return { width: Math.round(image.width * scale), height: Math.round(image.height * scale) };
}

export async function renderPNG(element: unknown): Promise<Response> {
  const [display700, display800, sans500, sans600] = await Promise.all([
    font("bricolage-grotesque", 700),
    font("bricolage-grotesque", 800),
    font("inter", 500),
    font("inter", 600),
  ]);

  const svg = await satori(element as Parameters<typeof satori>[0], {
    width,
    height,
    fonts: [
      { name: "Bricolage Grotesque", data: display700, weight: 700, style: "normal" },
      { name: "Bricolage Grotesque", data: display800, weight: 800, style: "normal" },
      { name: "Inter", data: sans500, weight: 500, style: "normal" },
      { name: "Inter", data: sans600, weight: 600, style: "normal" },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}

/** A short hash of what an image is drawn from, appended to its URL as ?v=. */
export function version(...inputs: unknown[]): string {
  return createHash("sha256")
    .update(JSON.stringify([designVersion, socialImageSize, ...inputs]))
    .digest("hex")
    .slice(0, 8);
}

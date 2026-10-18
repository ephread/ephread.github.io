/**
 * The preview image shown when the site is shared (og:image / twitter:image),
 * rendered at build time from the same data as the About section: the photo,
 * the availability badge and the intro.
 */
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { availability, availabilityColors, availabilityLabels, avatar, intro } from "../data/site";

// The size Facebook, LinkedIn and X recommend for large previews.
const width = 1200;
const height = 630;

const black = "#40434a";
const badgeStatus = "#555555";

const require = createRequire(import.meta.url);
// Satori reads WOFF but not WOFF2, which is all the variable font package ships.
const font = (weight: 500 | 700) =>
  readFile(require.resolve(`@fontsource/dosis/files/dosis-latin-${weight}-normal.woff`));

async function fetchDataURL(url: string, type?: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Couldn't fetch ${url} for the social image: ${response.status}`);
  const contentType = type ?? response.headers.get("content-type") ?? "application/octet-stream";
  return `data:${contentType};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
}

/** Emoji as Twemoji SVGs, e.g. the flag in the intro. */
function emojiURL(segment: string): string {
  const codepoints = [...segment].map((char) => char.codePointAt(0)?.toString(16)).join("-");
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/${codepoints}.svg`;
}

/** A minimal stand-in for JSX: Satori takes React-like element objects. */
function h(type: string, style: Record<string, unknown>, ...children: unknown[]) {
  return { type, props: { style, children: children.length === 1 ? children[0] : children } };
}

export const GET: APIRoute = async () => {
  const [medium, bold, photo] = await Promise.all([font(500), font(700), fetchDataURL(avatar.src)]);

  const badgeCell = (text: string, background: string, radius: string) =>
    h("div", { padding: "10px 18px", backgroundColor: background, borderRadius: radius }, text);

  const image = h(
    "div",
    {
      width,
      height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      backgroundColor: "#ffffff",
      color: black,
      fontFamily: "Dosis",
    },
    {
      type: "img",
      props: { src: photo, width: 220, height: 220, style: { borderRadius: "50%" } },
    },
    h(
      "div",
      { display: "flex", fontSize: 40, fontWeight: 700, lineHeight: 1, color: "#ffffff", textTransform: "uppercase" },
      badgeCell("Status", badgeStatus, "8px 0 0 8px"),
      badgeCell(availabilityLabels[availability], availabilityColors[availability], "0 8px 8px 0"),
    ),
    h(
      "div",
      {
        display: "flex",
        width: 1000,
        justifyContent: "center",
        fontSize: 44,
        fontWeight: 500,
        lineHeight: 1.3,
        textAlign: "center",
      },
      intro,
    ),
  );

  const svg = await satori(image as Parameters<typeof satori>[0], {
    width,
    height,
    fonts: [
      { name: "Dosis", data: medium, weight: 500, style: "normal" },
      { name: "Dosis", data: bold, weight: 700, style: "normal" },
    ],
    loadAdditionalAsset: async (code, segment) =>
      code === "emoji" ? fetchDataURL(emojiURL(segment), "image/svg+xml") : [],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

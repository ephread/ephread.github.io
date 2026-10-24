/**
 * The home page's social preview image, drawn like its hero: the availability
 * pill, the headline and the photo.
 */
import type { APIRoute } from "astro";
import { availability, availabilityColors, availabilityLabels, avatar, headline } from "../data/site";
import { assetDataURL, colors, dataURL, h, height, img, renderPNG, width } from "../social/render";

const flag = dataURL(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="#fff"/><rect width="50" height="100" fill="#d52b1e"/><rect x="150" width="50" height="100" fill="#d52b1e"/><polygon fill="#d52b1e" transform="translate(60 10) scale(0.8)" points="50,5 57,18 64,15 61,38 72,27 75,33 88,30 84,44 90,47 70,63 73,72 53,69 53,90 47,90 47,69 27,72 30,63 10,47 16,44 12,30 25,33 28,27 39,38 36,15 43,18"/></svg>`,
  "image/svg+xml",
);

const pill = { display: "flex", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 999 };

export const GET: APIRoute = async () => {
  const photo = await assetDataURL(avatar.src);

  return renderPNG(
    h(
      "div",
      {
        width,
        height,
        display: "flex",
        alignItems: "center",
        gap: 56,
        padding: "0 80px",
        backgroundColor: colors.beige,
        color: colors.fg,
        fontFamily: "Inter",
      },
      h(
        "div",
        // Satori doesn't shrink text to make room: the photo column is 364px wide.
        { display: "flex", flexDirection: "column", width: width - 160 - 56 - 364, flexShrink: 0, gap: 30 },
        h(
          "div",
          {
            ...pill,
            alignSelf: "flex-start",
            gap: 12,
            padding: "10px 22px 10px 18px",
            border: `2px solid ${colors.line}`,
            fontSize: 24,
            fontWeight: 500,
          },
          h("div", { width: 14, height: 14, borderRadius: 7, backgroundColor: availabilityColors[availability] }),
          availabilityLabels[availability],
        ),
        h(
          "div",
          {
            fontFamily: "Bricolage Grotesque",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -1.5,
          },
          headline,
        ),
        h("div", { fontSize: 26, fontWeight: 600, color: colors.fgSubtle }, "Frédéric Maquin · ephread.com"),
      ),
      h(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: 364,
          paddingBottom: 30,
        },
        h(
          "div",
          {
            display: "flex",
            padding: 12,
            borderRadius: 999,
            backgroundColor: "#ffffff",
            boxShadow: `0 0 0 2px ${colors.line}, 0 24px 48px -24px rgba(46,48,54,0.3)`,
          },
          img(photo, 340, 340, { borderRadius: 999 }),
        ),
        h(
          "div",
          {
            ...pill,
            position: "absolute",
            bottom: 0,
            gap: 12,
            padding: "14px 22px",
            boxShadow: `0 0 0 2px ${colors.line}, 0 8px 24px rgba(46,48,54,0.1)`,
            fontSize: 22,
            fontWeight: 600,
          },
          img(flag, 34, 17, { borderRadius: 2 }),
          "Montréal, Canada",
        ),
      ),
    ),
  );
};

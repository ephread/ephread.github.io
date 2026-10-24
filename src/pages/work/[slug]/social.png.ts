/**
 * A case study's social preview image, drawn like its header band: the logo or
 * eyebrow, the title and subtitle, and the illustration.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { caseStudyHeader } from "../../../data/case-study";
import { assetDataURL, fit, h, height, img, renderPNG, width } from "../../../social/render";

export const getStaticPaths = (async () => {
  const projects = await getCollection(
    "projects",
    (project) => project.data.tile !== undefined && !project.data.hidden,
  );
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}) satisfies GetStaticPaths;

interface Props {
  project: CollectionEntry<"projects">;
}

const padding = 72;
const gap = 48;

/** The illustration, as tall as the band allows. */
async function illustration(project: CollectionEntry<"projects">) {
  const { illustration } = project.data;
  if (!illustration) return undefined;
  const { placement } = caseStudyHeader(project);

  const box =
    placement === "before" ? fit(illustration.image, 300, 300) : fit(illustration.image, 420, height - 2 * padding);
  const image = img(await assetDataURL(illustration.image), box.width, box.height);

  // A device frame with a screen recording shows the recording's poster on its screen.
  const content = illustration.video
    ? h(
        "div",
        { display: "flex", position: "relative", width: box.width, height: box.height },
        image,
        img(await assetDataURL(illustration.video.poster), box.width * 0.8202, box.height * 0.8698, {
          position: "absolute",
          top: box.height * 0.0656,
          left: box.width * 0.0909,
        }),
      )
    : image;

  return {
    width: box.width,
    element: h("div", { display: "flex", alignSelf: "center", flexShrink: 0 }, content),
  };
}

export const GET: APIRoute<Props> = async ({ props: { project } }) => {
  const { header, illustration: picture } = project.data;
  const { eyebrow, title, subtitle, band } = caseStudyHeader(project);
  const long = title.length > 20;
  // Short titles shrink so their longest word fits (Bricolage's letters average ~.6em).
  const longestWord = Math.max(...title.split(" ").map((word) => word.length));

  const background = picture?.backgroundImage && {
    backgroundImage: `url(${await assetDataURL(picture.backgroundImage)})`,
    backgroundSize: `${width}px ${height}px`,
  };
  const drawing = await illustration(project);
  // Satori doesn't shrink text to make room, so the text column gets what the illustration leaves.
  const textWidth = width - 2 * padding - (drawing ? drawing.width + gap : 0);

  const logo = header.logo && fit(header.logo, 280, 64);

  return renderPNG(
    h(
      "div",
      {
        width,
        height,
        display: "flex",
        gap,
        padding: `0 ${padding}px`,
        backgroundColor: band,
        ...background,
        color: header.foreground,
        fontFamily: "Inter",
      },
      h(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: textWidth,
          flexShrink: 0,
          gap: 24,
          padding: `${padding}px 0`,
        },
        ...(header.logo && logo
          ? [img(await assetDataURL(header.logo), logo.width, logo.height)]
          : eyebrow
            ? [h("div", { fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }, eyebrow)]
            : []),
        h(
          "div",
          {
            fontFamily: "Bricolage Grotesque",
            fontSize: long ? 68 : Math.min(112, Math.floor(textWidth / (longestWord * 0.6))),
            fontWeight: long ? 700 : 800,
            lineHeight: long ? 1.02 : 0.95,
            letterSpacing: long ? -1.5 : -3,
            ...(header.titleColor && { color: header.titleColor }),
          },
          title,
        ),
        ...(subtitle
          ? [
              h(
                "div",
                {
                  fontFamily: "Bricolage Grotesque",
                  fontSize: subtitle.length > 80 ? 28 : 34,
                  fontWeight: 700,
                  lineHeight: 1.2,
                },
                subtitle,
              ),
            ]
          : []),
        h("div", { marginTop: 12, fontSize: 24, fontWeight: 600, opacity: 0.8 }, "Frédéric Maquin · ephread.com"),
      ),
      ...(drawing ? [drawing.element] : []),
    ),
  );
};

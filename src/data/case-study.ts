import type { CollectionEntry } from "astro:content";

/** Where a case study's illustration sits in its header: beside the heading, before it, or below it. */
export type Placement = "side" | "before" | "below";

const placements = {
  phone: "side",
  device: "side",
  wide: "side",
  logo: "before",
  banner: "before",
  icon: "before",
  default: "below",
  panorama: "below",
} satisfies Record<string, Placement>;

const groupLabels = { featured: undefined, indie: "Indie", contracts: "Contract", "open-source": "Open source" };

/** What a case study's header shows, shared by the page and its social image. */
export function caseStudyHeader(project: CollectionEntry<"projects">) {
  const { name, tagline, tile, color, header, illustration } = project.data;

  return {
    eyebrow:
      header.eyebrow ??
      (header.logo || !tile ? undefined : [groupLabels[tile.group], tile.platforms].filter(Boolean).join(" · ")),
    title: header.title ?? name,
    subtitle: header.subtitle ?? tagline,
    /** The band's background color. */
    band: illustration?.background ?? color ?? "#ffffff",
    /** Light text on a saturated band, or dark text on a pale one. */
    lightText: luminance(header.foreground) > 0.5,
    placement: illustration ? placements[illustration.layout] : undefined,
  };
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

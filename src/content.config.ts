import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { technologyIds } from "./data/technologies";

const technology = z.enum(technologyIds);
const hex = z.string().regex(/^#[0-9a-f]{6}$/i);

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),

      /** Projects with a parent are rendered inside the parent's case study, not in the work list. */
      parent: reference("projects").optional(),
      order: z.number(),
      /** Left out of the site entirely (no card, no case study) until it's ready. */
      hidden: z.boolean().default(false),

      /** Card in the work list on the home page. */
      tile: z
        .object({
          /** Open source projects are listed as compact rows in the archive. */
          group: z.enum(["featured", "indie", "contracts", "open-source"]),
          image: image(),
          imageAlt: z.string(),
          /** Drawn behind the tile image instead of the flat project color. */
          background: image().optional(),
          platforms: z.string(),
          /** Featured cards only: the line above the name, e.g. the dates. */
          eyebrow: z.string().optional(),
          /** Featured cards show a logo; this is its width relative to the card. */
          logoWidth: z.string().default("50%"),
        })
        .optional(),

      /** Tile and case-study header background. */
      color: hex.optional(),
      /** Links, buttons and figures in the case study; dark enough to read on white. */
      accent: hex.default("#006869"),

      /** The colored band at the top of the case study. */
      header: z
        .object({
          /** Text color on the band. */
          foreground: hex.default("#ffffff"),
          /** Heading color, when it differs from the foreground. */
          titleColor: hex.optional(),
          eyebrow: z.string().optional(),
          /** Defaults to the name; the name is still announced to screen readers. */
          title: z.string().optional(),
          /** Defaults to the tagline. */
          subtitle: z.string().optional(),
          /** Client logo shown above the heading. */
          logo: image().optional(),
          logoAlt: z.string().optional(),
        })
        .default({ foreground: "#ffffff" }),

      illustration: z
        .object({
          image: image(),
          alt: z.string(),
          /**
           * How the image sits in the header band: "phone" stands on its bottom edge,
           * "device" and "wide" float beside the heading, "logo", "banner" and "icon"
           * sit before it, "panorama" and "default" go below it.
           */
          layout: z
            .enum(["default", "phone", "wide", "panorama", "logo", "banner", "icon", "device"])
            .default("default"),
          /** Widest the image gets beside the heading, when its layout's default is too small. */
          maxWidth: z.string().optional(),
          /** Drop shadow under the image, for screenshots without a frame. */
          shadow: z.boolean().default(false),
          /** Header band background: a color (defaults to `color`), or an image drawn with background-size: cover. */
          background: hex.optional(),
          backgroundImage: image().optional(),
          /** Short description shown below the image, e.g. what a third-party logo is. */
          caption: z.string().optional(),
          /** Screen recording played inside the device frame (in /public/videos). */
          video: z
            .object({
              mp4: z.string(),
              webm: z.string(),
              poster: image(),
            })
            .optional(),
        })
        .optional(),

      dates: z.object({ from: z.string(), to: z.string() }).optional(),
      client: z.string().optional(),
      role: z.string().optional(),
      /** More rows for the sidebar, e.g. "Standards". */
      details: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      technologiesLabel: z.string().default("Technologies"),
      technologies: z
        .union([
          z.array(technology),
          /** Grouped by version (Abjapp's history) or by platform. */
          z.array(z.object({ heading: z.string(), items: z.array(technology) })),
        ])
        .default([]),

      links: z
        .array(
          z.object({
            kind: z.enum(["website", "ios", "watchos", "android"]),
            href: z.url(),
            label: z.string().optional(),
          }),
        )
        .default([]),

      /** Note shown with an archive icon, when the project is no longer maintained. Inline HTML allowed. */
      callout: z.string().optional(),

      highlights: z
        .object({
          title: z.string(),
          items: z.array(z.object({ title: z.string(), text: z.string() })),
        })
        .optional(),
      /** Small print at the end of the case study. */
      note: z.string().optional(),
    }),
});

export const collections = { projects };

import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { technologyIds } from "./data/technologies";

const technology = z.enum(technologyIds);

/** Names of the --color-* theme tokens a project can use (see global.css). */
const projectColor = z.enum([
  "abjapp",
  "actitens",
  "autodazzler",
  "combyne",
  "genesis",
  "genesis-showcase",
  "genetrainer",
  "how-many-sleeps",
  "ink",
  "ink-showcase",
  "instructions",
  "mynox",
  "pomme-plate",
  "sophisticate",
  "the-bell",
  "the-bell-showcase",
]);

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),

      /** Projects with a parent are rendered inside the parent's showcase, not in the grid. */
      parent: reference("projects").optional(),
      order: z.number(),

      /** Tile in the Work grid. */
      tile: z
        .object({
          group: z.enum(["indie", "contracts", "open-source"]),
          size: z.enum(["large", "small"]),
          image: image(),
          imageAlt: z.string(),
          /** Drawn behind the tile image instead of the flat project color. */
          background: image().optional(),
          platforms: z.string(),
        })
        .optional(),

      /** Tile background color. */
      color: projectColor.optional(),
      /** Color of links and buttons in the showcase; defaults to `color`. */
      accent: projectColor.optional(),

      illustration: z
        .object({
          image: image(),
          alt: z.string(),
          /** Short description shown below logo-only illustrations. */
          caption: z
            .object({
              /** Prefix only read by screen readers (the logo already shows it). */
              hidden: z.string(),
              text: z.string(),
            })
            .optional(),
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
      technologiesLabel: z.string().default("Technologies"),
      technologies: z
        .union([
          z.array(technology),
          /** Grouped by version, e.g. Abjapp's history. */
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

      /** Highlighted note, e.g. when the app is no longer available. Inline HTML allowed. */
      callout: z.string().optional(),
    }),
});

export const collections = { projects };

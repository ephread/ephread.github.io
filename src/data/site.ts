/**
 * The availability badge in the About section and on the social preview image
 * (/social.png). Change this line and rebuild to update both.
 */
export const availability: Availability = "unavailable";

export type Availability = "available" | "limited" | "unavailable";

export const availabilityLabels: Record<Availability, string> = {
  available: "Open to work",
  limited: "Limited availability",
  unavailable: "Unavailable",
};

/** Badge colors, matching the --color-badge-* tokens in global.css. */
export const availabilityColors: Record<Availability, string> = {
  available: "#44cc11",
  limited: "#fe7d37",
  unavailable: "#e05d44",
};

/** The first paragraph of the About section, also used on social previews. */
export const intro =
  "I'm an independent iOS, watchOS and tvOS developer based in Montréal. 🇨🇦 I help companies build amazing apps.";

export const avatar = {
  src: "https://www.gravatar.com/avatar/07cace5d941b67f22d030088283a10f0?s=400",
  alt: "Frédéric Maquin / Ephread",
};

/** The social preview image's size (/social.png), the one Facebook, LinkedIn and X recommend. */
export const socialImageSize = { width: 1200, height: 630 };

/** Title and description shown when a page is shared on social media. */
export const social = {
  title: "Frédéric Maquin | Independent iOS developer",
  description: intro,
};

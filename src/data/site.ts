import photo from "../assets/images/photo.jpg";

/**
 * The availability pill in the home page's hero and on its social preview image
 * (/social.png). Change this line and rebuild to update both.
 */
export const availability: Availability = "unavailable";

export type Availability = "available" | "limited" | "unavailable";

export const availabilityLabels: Record<Availability, string> = {
  available: "Open to work",
  limited: "Limited availability",
  unavailable: "Unavailable for new projects",
};

/** Badge colors, matching the --color-status-* tokens in global.css. */
export const availabilityColors: Record<Availability, string> = {
  available: "#2f9e0b",
  limited: "#e8640f",
  unavailable: "#d4472c",
};

/** The home page's main heading, also on its social preview image. */
export const headline = "Independent iOS & watchOS developer in Montréal.";

/** The home page's description, in search results and when it's shared. */
export const intro =
  "I'm Fred, an independent iOS & watchOS developer in Montréal. I help companies build amazing apps, from designing the user interface to publishing them on the App Store.";

/** My photo, in the hero and on the home page's social preview image. */
export const avatar = {
  src: photo,
  alt: "Frédéric Maquin, smiling, with snow in his hair on a Montréal street",
};

/** The social preview image's size (/social.png), the one Facebook, LinkedIn and X recommend. */
export const socialImageSize = { width: 1200, height: 630 };

/** Title and description shown when a page is shared on social media. */
export const social = {
  title: "Frédéric Maquin | Independent iOS & watchOS developer",
  description: intro,
};

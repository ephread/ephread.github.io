/**
 * The availability badge in the About section. Change this line to update it.
 */
export const availability: Availability = "unavailable";

export type Availability = "available" | "limited" | "unavailable";

export const availabilityLabels: Record<Availability, string> = {
  available: "Open to work",
  limited: "Limited availability",
  unavailable: "Unavailable",
};

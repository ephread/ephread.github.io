/**
 * Remembers the page shown before the current one during client-side
 * navigation. Loaded by every page so it's listening before the first
 * navigation; page scripts read it through `previousPathname()`.
 */
let previous: string | undefined;

document.addEventListener("astro:before-preparation", (event) => {
  previous = event.from.pathname;
});

/** The previous page's path, or undefined after a full page load. */
export function previousPathname(): string | undefined {
  return previous;
}

// Anchor links to the current page (the nav, "hire me") scroll smoothly. This
// isn't a global `scroll-behavior: smooth` because the router's scroll
// restoration on back navigation would then animate from the top of the page.
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener(
  "click",
  (event) => {
    const link = (event.target as Element | null)?.closest?.("a[href*='#']");
    if (!(link instanceof HTMLAnchorElement) || reducedMotion.matches) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname) return;

    const root = document.documentElement;
    root.style.scrollBehavior = "smooth";
    addEventListener("scrollend", () => root.style.removeProperty("scroll-behavior"), { once: true });
  },
  { capture: true },
);

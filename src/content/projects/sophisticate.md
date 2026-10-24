---
name: "Sophisticate"
tagline: "Clean SVGs and use them in interactive web pages"
order: 10
tile:
  group: "open-source"
  image: "../../assets/images/sophisticate.svg"
  imageAlt: "Sophisticate"
  platforms: "TypeScript"
color: "#333333"
accent: "#333333"
header:
  foreground: "#2e3036"
illustration:
  image: "../../assets/images/sophisticate-showcase.svg"
  alt: "Sophisticate preview"
  layout: "icon"
  background: "#ebe8e4"
technologies:
  - "typescript"
links:
  - kind: "website"
    href: "https://github.com/ephread/sophisticate"
    label: "View on GitHub"
callout: "Sophisticate is no longer maintained."
---

Sophisticate is a small TypeScript tool I wrote to tidy up the SVGs that vector editors export. Their output is usually messy and lacks meaningful classes or IDs, which makes it hard to style or script once it’s part of a web page.

Sophisticate applies a set of clean-up rules and can also run [SVGO](https://github.com/svg/svgo "SVGO on GitHub") to optimize the files further. Since I worked with SVGs all the time, it saved me a lot of time.

# ephread.com

My personal website, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Development

Requires Node 26 (see `.node-version`; `mise install` sets it up) and [Git LFS](https://git-lfs.com) for the videos.

```sh
npm install
npm run dev       # http://localhost:4321, reloads on change
npm run build     # type-checks, then builds the site into dist/
npm run preview   # serves dist/ (runs in the background; `npx astro preview stop` stops it)
npm run check     # astro check, ESLint and Prettier, as run on CI
npm run format    # formats everything with Prettier
```

## Where things are

- `src/data/site.ts`: the availability pill, the home page's headline and description, and the social preview text.
- `src/content/projects/`: one Markdown file per project, with its case study at `/work/<name>/`. The schema is in
  `src/content.config.ts`, which documents each field. A few worth knowing:
  - `tile.group` places the card on the home page (`featured`, `indie`, `contracts`, or `open-source` for the
    archive list); `hidden: true` leaves a project out of the site entirely.
  - `color` is the card and header band color, `accent` the color of links and buttons (dark enough to read on
    white), and `header.foreground` the text color on the band.
  - `illustration.layout` decides where the header image sits (beside, before or below the heading), and
    `illustration.maxWidth` overrides its size.
  - `details` adds rows to the sidebar (e.g. "Users"), `highlights` a set of cards below the story, `callout` a "no
    longer maintained" note, and `note` small print at the end.
- `src/data/technologies.ts`: the technologies projects can list, with their icons.
- `src/social/`: the social preview images, drawn with Satori on every build: `/social.png` for the home page and
  `/work/<name>/social.png` for each case study. Bump `designVersion` in `src/social/render.ts` after changing their
  design, so social networks fetch them again.
- `src/pages/the-bell/` and `src/pages/abjapp/`: the apps' contact forms and privacy policies, with their own look
  (`src/styles/app.css`).
- `src/assets/images/` and `public/videos/`: images (optimized at build time) and videos. Icons drawn in `currentColor`
  (store buttons, footer links) are inlined, so they take the color of the text around them.
- `public/.well-known/openpgpkey/`: my OpenPGP key, published with
  [WKD](https://wiki.gnupg.org/WKD). After changing the key, export it again with
  `gpg --export --export-options export-minimal fred@ephread.com > public/.well-known/openpgpkey/hu/gryzwhtgcz1k9u1apfexekkrw5judsi9`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which checks and builds the site and deploys it to GitHub Pages.
Pull requests run the same checks without deploying.

## License

### Code

Unless explicitly stated otherwise, the content of this repository is public domain, do whatever you want with it. See
UNLICENSE for more details.

### Images and videos

Unless explicitly stated otherwise, image and video assets, found respectively in `src/assets/images/` and
`public/videos/`, are licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nc-nd/4.0/).

- The Swift logo is a trademark of Apple, Inc.
- The Realm logo is a trademark of Tightdb, Inc.
- The Bluetooth logo is a trademark of Bluetooth SIG, Inc.
- The Firebase and Jetpack Compose logos are trademarks of Google, Inc.
- The Kotlin logo is a trademark of JetBrains s.r.o.
- The GitHub logo is a trademark of GitHub, Inc. and the LinkedIn logo a trademark of LinkedIn Corporation.
- The Diabeloop and Crave Retail logos are trademarks of their respective owners.

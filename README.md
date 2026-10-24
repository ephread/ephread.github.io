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

- `src/data/site.ts`: the availability badge, the intro and the social preview text. The social preview image
  (`/social.png`) is generated from it on every build.
- `src/content/projects/`: one Markdown file per project in the Work section, with its showcase page at `/work/<name>/`.
  The schema is in `src/content.config.ts`.
- `src/data/technologies.ts`: the technologies projects can list.
- `src/pages/the-bell/` and `src/pages/abjapp/`: the apps' contact forms and privacy policies.
- `src/assets/images/` and `public/videos/`: images (optimized at build time) and videos.
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
- The Firebase logo is a trademark of Google, Inc.

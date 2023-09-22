# Overview

[![Test, Build, Deploy](https://github.com/Bierro/pierre-amelot-portfolio/actions/workflows/test-build-deploy.yml/badge.svg?branch=main)](https://github.com/Bierro/pierre-amelot-portfolio/actions/workflows/test-build-deploy.yml)

Personal portfolio.

Run it locally with [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install && nvm use && npm install
npm run dev
```

# Code Decisions

## File Structure

<details open>
<summary>Pages and Layouts</summary>

I like Next.js 13 file-system based `app` router. You can set and remember
routes easily. But I don't like having a bunch of files all named `page.tsx` or
`layout.tsx`. They make file hopping slower during development. To address this,
I create my own Page and Layout components forwarded in `page.tsx` and
`layout.tsx` (e.g. `RootPage` and `RootLayout` are imported and immediately
re-exported by `app/page` and `app/layout`).

</details>

<details open>
<summary>Reusable components</summary>

I place components and hook reused throughout the app in root `components` and
`hooks` directories. This organization by function can be messy but it's a small
price to pay to avoid big refactoring costs ([cf Josh
Comeau](https://www.joshwcomeau.com/react/file-structure/#organized-by-function-12)).
I will usually keep specific components in the same directory as the page they
are used in, and when I start reusing them I move them to the top-level
`components` directory.

</details>

## CI

My CI pipeline is definitely overkill since I'm alone on this project, but it
was a good exercise to get familiar with Github Actions.

The pipeline lints, formats, tests, builds, and deploys previews on every PRs
and pushes to master. I run jobs concurrently when possible and cache
./node_modules and ~/.npm to speed up the pipeline.

I also automated the release process. I can trigger the workflow manually from
main, and it bumps the npm version, creates a Github Release with generated
notes, and deploys the portfolio to production.

I hooked the dev, staging, and prod deployments to Github Deployments for a nicer
overview and links in the github UI.

## Images

I host images on a public Google Cloud bucket rather than stored locally. I
think this allows to easily recreate/deploy the project on another machine or in
CI without the hassle of Git LFS or custom download scripts. Next doesn't
generate blurred image placeholders for remote images so I use
[blurred.dev](https://blurred.dev) to generate the base64 image blur
placeholders myself.

# Stack and Library Decisions

## Next.js

<details>
<summary>Rationale</summary>

### Why I chose it

- Hot skill to have these days
- Easy way to play around with React server components and Suspense
- Nice routing system and links prefetching
- Easy Image optimization, hosting, blur placeholder, and loader
- Easy google fonts integration and fallback font

### What I don't love

- Next uses SWC (which should be on par with esbuild) to compile typescript, but
  it still uses **webpack5** for bundling and HMR in development which makes it slow
  on server start and updates compared to Vite. Plugins in webpack5 are also
  supposed to be a pain to write compared to Rollup or Vite.
- Even though they let you use TurboPack in dev, it's still in beta, not
  widespread, and there are annoying issues like making svgr work
  ([details](https://github.com/vercel/next.js/issues/48140))
- Next doesn't generate base64 image blur placeholders on remote images
- Not a lot of explanation in the docs around the relatively large bundle size
  even with a simple

</details>

## Vercel

<details>
<summary>Rationale</summary>

### Why I chose it

- Individual preview links are really nice
- Natural choice for Next.js to host server and work with React server
  components (with serverless functions on the edge)
- Nice that image optimization runs on the edge with nice caching

### What I don't love

- Docs don't say much about the WebP compression settings used in their image
  optimization (e.g. lossy vs lossless)

</details>

## Tailwind

<details>
<summary>Rationale</summary>

### Why I chose it

- Hot skill to have these days
- I like the principle of co-locating style as close to the tag/component as
  possible. Unlike CSS Modules or styled-components, I don't have to think about
  naming styles which removes a lot of difficulty, overhead, and
  miscommunication between developers.
- CSS rules are generated at build time rather than runtime (like Chakra UI)
- Simple design which makes it easy for people to build and distribute very
  customizable and extendable component libraries (like headless ui, tailwind
  components, or shadcn) on top of it, without having a bunch of custom syntax
  or rules.

### What I don't love

- Lots of classnames hurts readability imo and it can be hard to find the
  tailwind rule you're looking for in this large string. I preferred the
  highlighting and ordering of props in Chakra UI, and the highlighting of
  styled-components. But I understand that following the ordering of the cascade
  is better for bug prevention.
- Semantic tokens and theming aren't really supported. The explanation by
  Tailwind's CEO that it would not be useful is wrong imo, and designers and
  large companies have now adopted semantic tokens for theming their design
  systems

</details>

## SVGR

<details>
<summary>Rationale</summary>

### Why I chose it

- Loading SVGs as React components is more flexible than `img` tags. I can style
  and animate the SVGs directly in CSS.

</details>

# TODO

- Code Splitting?
- Include Figma link
- Some Storybook example and Jest example
- Add Playwright tests
- Suspense for the Three.js scene
- Hits and likes like Josh Comeau's website
- Clean up this readme
- Setup commit signing?

# Overview

[![Test, Build, Deploy](https://github.com/pierusan/pierre-amelot-portfolio/actions/workflows/test-build-deploy.yml/badge.svg?branch=main)](https://github.com/pierusan/pierre-amelot-portfolio/actions/workflows/test-build-deploy.yml)
[![CodeQL](https://github.com/pierusan/pierre-amelot-portfolio/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)](https://github.com/pierusan/pierre-amelot-portfolio/actions/workflows/github-code-scanning/codeql)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/pierusan/pierre-amelot-portfolio/badge)](https://securityscorecards.dev/viewer/?uri=github.com/pierusan/pierre-amelot-portfolio)

I made this portfolio to describe my skills in development and UX, showcase
projects I worked on, and highlight what I have been learning over the years.

I wanted the website content to reflect the way I work:

- I spent some time on the UX (navigation, scroll behavior, Easter eggs, etc..)
- I designed the screens in Figma with the latest Figma features (variables)
- I incorporated a 3D scene that I designed in Spline
- I tried libraries I've been wanting to experiment with (react-three-fiber,
  gsap, shadcn, etc...)
- I took time to set up CI

# Design

After some thinking on what aspects of my work I wanted to showcase, I landed
while I was hiking on a stack of rocks representing the projects that I work on
and that together come to shape my style as a designer, coder, and product
owner.

I sketched a rough outline of the website, bounced ideas with my wife, and
iterated in Figma
([have a look](https://www.figma.com/file/2k7R21lwIc82hlPHH9BqyY/Portfolio-Pierre?type=design&node-id=633%3A226&mode=design&t=dNvK758we7VqyNq2-1)).
I designed the 3D stack of pebbles using Spline modeling and sculpting tools
([have a look at the scene](https://my.spline.design/untitled-dd331bee5e206ab1848bfa21db2ffc91/)),
before I ported it to Three.js use the Three.js editor.

I stuck with a mono font, and teal theme with very saturated highlights to have
a modern dev look.

# Run Locally

Run it locally with [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install && nvm use && npm install
npm run dev
```

# Implementation Decisions

## Images

I host images on a public Google Cloud bucket rather than keeping them locally.
This lets me recreate/deploy the project on another machine or in CI without the
hassle of Git LFS or custom download scripts. Next doesn't generate blurred
image placeholders for remote images so I wrote
[a script](https://github.com/pierusan/remote-images-for-next) with the
[Plaiceholder](https://plaiceholder.co/docs) library to generate them for all
the images in my bucket.

## CI

My CI pipeline is definitely overkill since I'm alone on this project, but it
was a good exercise to get familiar with Github Actions.

The pipeline lints, formats, tests, builds, and deploys previews URLs on every
PR or push to master. I run jobs concurrently when possible and cache
./node_modules and ~/.npm to speed up the pipeline.

I also automated the release process. I can trigger the workflow manually from
main, and it bumps the npm version, creates a Github Release with auto-generated
notes, and deploys the portfolio to production.

I hooked the dev, staging, and prod deployments to Github Deployments for a
nicer overview and links in the github UI.

## File Structure

I like Next.js 13 file-system based `app` router. You can set and remember
routes easily. But I don't like having a bunch of files all named `page.tsx` or
`layout.tsx`. They make file hopping slower during development. To address this,
I create my own Page and Layout components forwarded in `page.tsx` and
`layout.tsx` (e.g. `HomePage` and `RootLayout` are imported and immediately
re-exported by `app/(home)/page` and `app/layout`).

I place components, hooks, constants, store, and functions reused throughout the
app in a `app/_common` that I can import (`import ... from '@/...'`) quickly
with a typescript path remap. I will usually keep specific components in the
same directory as the page they are used in, and when I start reusing them I
move them to `app/_common/components` directory.

# Stack and Library Decisions

## Next.js

<details>
<summary>Why?</summary>

### Why I chose it

- Hot skill to have these days
- Easy way to play around with React server components and Suspense
- Nice routing system and links prefetching
- Easy Image optimization (caching, levering WebP, logic hosted on functions on
  the edge)
- Easy google fonts integration and fallback font

### What I don't love

- Next uses SWC (which should be on par with esbuild) to compile typescript, but
  it still uses **webpack5** for bundling and HMR in development which makes it
  slow on server start and updates compared to Vite. Plugins in webpack5 are
  also supposed to be a pain to write compared to Rollup or Vite.
- Even though they let you use TurboPack in dev, it's still in beta, not
  widespread, and there are annoying issues like making svgr work
  ([details](https://github.com/vercel/next.js/issues/48140))
- Next doesn't generate base64 image blur placeholders on remote images
- Not a lot of explanation in the docs around the relatively large bundle size
  even with a simple

</details>

## Vercel

<details>
<summary>Why?</summary>

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
<summary>Why?</summary>

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
- VSCode extensions with autocomplete, color preview, and tooltips is really
  nice

### What I don't love

- Lots of classnames can hurts readability imo and it can be hard to find the
  tailwind rule you're looking for in this large string. Bugs arising from order
  in the cascading stylesheet are also not intuitive. That said, it hasn't been
  much of an issue since I started using **tailwind-merge** and the `cn` util
  function to construct class names. It not only prevents bugs but it also
  allows to break strings apart and add comments between string segments.
- Semantic tokens and theming aren't really supported. The
  [explanation by Tailwind's creator](https://github.com/tailwindlabs/tailwindcss/discussions/10274#discussioncomment-4627634)
  that it would not be useful is wrong imo, and designers and large companies
  have now adopted semantic tokens for theming their design systems

</details>

## Floating UI

<details>
<summary>Why?</summary>

### Why I chose it

- Lots of control and flexibility to create 'floating' elements that are
  anchored but stay in view
- Good react wrapper and docs
- Widely used by component libraries like Radix
- Actively maintained. The library is at its third iteration (after popper v1
  and v2) and

### What I don't love

- _Nothing really..._

</details>

## GSAP

<details>
<summary>Why?</summary>

### Why I chose it

- Quite a few forum posts and docs online
- ScrollTrigger pinning behavior is nice and there doesn't seem to be an easy
  alternative to gsap

### What I don't love

- API seems a bit messy to me (lots of strings), and TS hints aren't very
  helpful
- Documentation sometimes feel outdated (pinSpacing default behavior is
  confusing in the docs), or unclear
- No straightforward integration with React (e.g. no hooks)

</details>

## React Three Fiber

<details>
<summary>Why?</summary>

### Why I chose it

- Nice to have a declarative API integrated with React to control Three.js
- Removes some boilerplate (e.g. scene and renderer setup)
- Lots of useful utilities with @react-three/drei which augment
  react-three-fiber
- leva is nicely designed UI to control react-three-fiber components

### What I don't love

- DREI and leva docs and support seem to be a bit hit or miss, and some
  questions around whether the repos they are and will remain actively
  maintained (for instance lamina, in fiber examples, has been archived, and
  leva has a lot of input todos not addressed)

</details>

## Shadcn

<details>
<summary>Why?</summary>

### Why I chose it

- TODO: Fill

### What I don't love

-

</details>

## SVGR

<details>
<summary>Why?</summary>

### Why I chose it

- Loading SVGs as React components is more flexible than `img` tags. I can style
  and animate the SVGs directly in CSS.

</details>

# TODO first

- Clean up this readme. Talk about dependabot. Explain CSS modules for
  animations
- Credits with WithPoly, Spline, and other tools
- Make 3D scene interactive on mobile
- 404 page and error page
- Code Splitting
- Add date, title, and company to project
- Explore adding little custom cursors on mobile somewhere
- ToC on mobile could also contain nav to back home, or to the other projects
- If GCP fees get crazy, move to CloudFlare registar and set URL redirect there

# TODO next

- Add Opengraph images and description for every project page
- Popover with more infos on what I liked about the resources
- Rotate scene on mobile touch
- Fix gap, padding, etc... in tailwind theme
- Suspense for the Three.js scene
- Some Storybook example and Jest example
- Add tests for custom hooks?
- Add Playwright tests
- Add code coverage tests?

# Maybe one day

- Setup commit signing
- Animate favicon fill based on page progress
- Interactive Double Diamond process. Talk about the value of design thinking
  and the slide deck that I created.
- Consider eager loading of images
- Click on images in project cards on mobile?
- Use picture HTML tag for mobile?
- Text animation like DepoStudio https://www.depo.studio/ for the home page
- Hits and likes like Josh Comeau's website
- Light mode?

# Personal Website (Diaza)

A personal website and blog built with SvelteKit, Tailwind CSS, and mdsvex, deployed to Cloudflare Workers.

## Features

- Multi-page personal site (Home, About, Projects, Blog)
- Markdown-powered blog posts with mdsvex
- Blog metadata (title, date, categories, cover image, excerpt, publish flag)
- Cloudflare-ready deployment with Wrangler
- Svelte 5 + TypeScript

## Tech Stack

- SvelteKit 2
- Svelte 5
- TypeScript
- Tailwind CSS 4
- mdsvex
- Cloudflare Workers + Wrangler

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

1) Install dependencies

npm install

2) Start the dev server

npm run dev

3) Open the app in your browser

http://localhost:5173

## Available Scripts

- npm run dev
  - Starts Vite dev server on host mode

- npm run build
  - Creates a production build

- npm run preview
  - Builds and runs via Wrangler locally

- npm run check
  - Type checks and validates Svelte project

- npm run check:watch
  - Same as check, but watch mode

- npm run deploy
  - Builds and deploys to Cloudflare

- npm run cf-typegen
  - Regenerates Cloudflare Worker environment typings

## Project Structure

src/
  routes/
    +layout.svelte
    +page.svelte
    about/+page.svelte
    projects/+page.svelte
    blog/+page.svelte
    blog/[slug]/+page.svelte
    api/posts/+server.ts
  posts/
    *.md

## Writing Blog Posts

Create a new markdown file in src/posts with a kebab-case filename.

Example:

src/posts/my-new-post.md

Use this frontmatter format:

---
title: "Your Post Title"
creationDate: "2026-03-23"
categories:
  - webdev
  - svelte
published: true
coverImageUrl: "https://..."
excerpt: "Short summary shown in the blog list."
---

Important notes:

- slug is derived from filename (my-new-post -> /blog/my-new-post)
- published must be true for the post to appear on /blog
- creationDate is used for sorting newest to oldest

## Deployment (Cloudflare)

This project is configured with:

- @sveltejs/adapter-cloudflare
- wrangler.jsonc using .svelte-kit/cloudflare worker output

Deploy command:

npm run deploy

If you need Worker env type updates after binding changes:

npm run cf-typegen

## Troubleshooting

- If npm run dev fails, ensure dependencies are installed and Node is up to date.
- If deploy fails, verify Wrangler auth (wrangler login) and Cloudflare account permissions.

## License

Private project.

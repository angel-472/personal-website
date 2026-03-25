---
title: "Why I'm Rewriting My Terraria Inspired Game"
creationDate: "2026-03-25"
categories:
  - gamedev
published: true
coverImageUrl: "/img/blog/001.png"
excerpt: "A Terraria-inspired sandbox game I built years ago while learning web development, now being rewritten from scratch with the tools and practices I've picked up since."
---

Let me start by giving some context about this project. I started this project some time ago when I was learning web development through [The Odin Project](https://www.theodinproject.com/). I found a YouTube video that taught how to make a simple 2D game using HTML5 Canvas and JavaScript, and I decided to follow along and build something inspired by Terraria.

I implemented world generation, physics, blocks, items, and an inventory system, among other things. Life got in the way and I eventually stopped working on it to focus on other stuff. But I kept coding and learning, and recently I decided to come back and finally finish it.

## Lots of Technical Debt

When I returned to the codebase I was surprised by how different the code is to what i write today. One issue I noticed even back then is how tightly coupled everything is. There's no separation of concerns and nothing is modular. On top of that, the code isn't very efficient and there's a lot of room for performance improvements.

Back then, I was just hacking features together to get them working. And since I was still early in my learning, a big project like this mostly meant piling new code on top of old code without really thinking about it.

## Issues with the UI

Then there's the UI, which is held together with hacky vanilla JS and HTML. Since I last touched this project I've learned to build frontend UIs with Svelte, TailwindCSS, and Vite. My workflow is much more efficient and enjoyable now, and using a modern frontend framework will bring many benefits in terms of performance and maintainability.

So I decided to rewrite the entire codebase from scratch using the tools I know today and better coding practices overall. I'm excited to get back into this project and I'm looking forward to sharing my progress with you all.

## What will change?

This new iteration of the game will be rebuilt around an [Entity Component System (ECS)](https://en.wikipedia.org/wiki/Entity_component_system) architecture to create a more decoupled, modular, and scalable codebase. The goal is to move away from tightly connected game logic and toward a system that is easier to maintain, extend, and reuse as the project grows.

*(plus the code will look cooler)*

I also plan to make heavier use of my [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) implementation (`signal.js`) to manage communication between components and systems through events rather than direct dependencies. This should help keep the architecture clean while making gameplay systems more flexible and easier to evolve over time.

These decisions are aimed at improving the long-term maintainability of the project and building a stronger technical foundation for future features.

On the frontend side, the UI will be completely redesigned using Svelte and Tailwind CSS. This should significantly improve both the developer experience and the overall structure of the interface code. The previous UI implementation was difficult to scale and maintain, so this rebuild is also an opportunity to create a cleaner and more sustainable workflow.

I also want to refine the engine itself, particularly around code organization, frame lifecycle management, and rendering of the visuals. I’m currently exploring the use of PixiJS as a rendering layer in place of the raw HTML Canvas API to improve rendering capabilities and simplify parts of the rendering pipeline.

This rebuild is about creating a more thoughtful technical foundation and using the project as a space to apply stronger software architecture and engineering practices.

## Source Code

The source code is on my GitHub [here](https://github.com/angel-472/paperblocks). I'll be updating the repo regularly as I make progress. If you're interested in following along or contributing, feel free to check it out and reach out if you have any questions or suggestions.
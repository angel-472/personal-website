---
title: "July Update: What i've been up to"
creationDate: "2026-08-01"
excerpt: "In this post i go over what i've been up to in the month of July, plus some thoughts on discipline, goals, and what i'm working toward next."
published: true
coverImageUrl: "/img/blog/july-2026-update.jpg"
---
- I took a short vacation to Culebra, Puerto Rico. It was a nice break from work that helped me recharge and clear my mind.

- I got a new desk! This one is more spacious and looks nicer in my room.

- [**FlowBudget**](/?project=flowbudget) **got most of my attention this month.** It ended up being where almost all of my commits went. The two big ones were offline support and savings goals.

  For offline support I added a local cache and a sync queue, so the app now keeps working when you lose connection and replays your changes once you're back online. That started out hardcoded to the transactions table, and I later refactored both the sync queue and the database API to accept any table. I also moved all the backend sync files into their own folder, because they were starting to get lost among the rest of the code.

  Savings goals went from "there's a view" to fully working: loading and saving from the local cache, a proper goals API with create, read, update and delete, modals for adding and editing goals (including renaming them), a confirmation modal before deleting, and sorting goals from biggest to smallest. The recurring section still says "under construction" in the header, and that's honest. It's next on the list.

  The rest was a long tail of fixes and polish: a custom week start day that turned out to touch way more date math than I expected, a search function, a redesign pass with rounder cards and better padding, and a handful of bugs where data silently wouldn't load or wouldn't get deleted.

- **I kept chipping away at Paperblocks**, my 2D engine and the rewrite of my old Terraria-inspired game. This month was mostly physics. I implemented spatial hashing so collision checks and spatial lookups don't have to scan everything, fixed a memory leak in it, then built AABB collision detection on top. That went through a few passes: first just returning true on a hit, then returning proper typed collision results, then testing against the *future* transform instead of the current one, which removed the need for the clamping hack I had. At the end of the month I also added jumbo frame detection so a huge deltaTime (like when you tab away) doesn't teleport everything through the world.

- **I started a booking system for Diaza Software.** Scaffolded a TypeScript backend with itty-router, set up better-auth with a Postgres database and a catch-all route handler for auth requests, and spun up a React client. It's very early days, so far I've mostly been laying the foundation the service will sit on.

- **My personal website got some love too.** I added FlowBudget to the projects page, added priority-based sorting so projects show up in the order I actually want (with diaza.dev pinned last), fixed some GSAP warnings caused by animating elements before Svelte had rendered them, and brought back the weather string in the footer.

  And right at the end of the month I finally implemented the blog, which is why you're reading this. That came with a refactor of how markdown gets rendered for both projects and blog posts, a browser-based markdown editor so I can write and edit posts with more ease, a proper icon set, a PWA manifest, and link previews.

## On my mind

The offline work on FlowBudget made me appreciate the local-first idea a lot more than I did before. Writing to a local cache first and treating the server as something you sync *toward* makes the app feel instant, and the offline support kind of falls out of it for free. It's more upfront work than just calling an API, but you notice the difference immediately.

Beyond the technical side of it, though, I really enjoyed improving and extending an app that I actually use daily. I finally fixed some big pain points, like the Supabase sync sitting behind an annoyingly long loading screen that made you wait a few seconds every time you wanted to get into the app. Now that it's fixed and the app has gotten some well-deserved love, it's much more enjoyable to use day to day, and I've been more consistent about tracking my spending and goals.

This month I've also been learning a lot about what it means to be disciplined, and figuring out what my goals are and what actually works for me right now. I've decided to pursue a job in software engineering and shelve entrepreneurship for the time being. I think getting some field experience will make those other goals easier to reach later on.

## What's next?

In August I plan to keep working on Diaza Booking and *(finally)* learn React properly so I can get an MVP shipped. I'll write a new blog post about what Diaza Booking is and what it has to offer once I have a fully working demo up.

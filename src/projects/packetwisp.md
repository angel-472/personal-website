---
name: "Packet Wisp"
description: "Schema-based binary encoding for real-time apps that cuts bandwidth usage."
images: ["/img/projects/packet-wisp/diagram.gif"]
lang: "TypeScript"
github: "https://github.com/angel-472/packetwisp"
tags: ["JavaScript", "TypeScript", "WebSocket", "Binary Encoding"]
---

A binary encoding system for real-time apps, built in JavaScript to cut down on bandwidth usage.

Real-time web apps like online games burn through bandwidth thanks to the overhead in common solutions like Socket.IO to emit JSON data. To deal with that, I built a binary encoding and decoding system based on defined schemas, which compresses packets before they go out over the WebSocket. Once they arrive, they get decoded back into their original object form, so the code stays readable and maintainable on the development side.

The result was a significant drop in bandwidth usage while staying easy to use and compatible enough to build apps quickly.

![Packet Wisp Benchmarks](/img/projects/packet-wisp/benchmarks-light.png)

<!-- keep this at the bottom for better UX -->
[See More on GitHub →](https://github.com/angel-472/packetwisp) 
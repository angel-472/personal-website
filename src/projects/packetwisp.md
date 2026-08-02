---
name: "Packet Wisp"
description: "Schema-based binary encoding for real-time apps that cuts bandwidth usage."
images: ["/img/projects/packet-wisp/packetencoder.png"]
lang: "JavaScript"
---

A binary encoding system for real-time apps, built in JavaScript to cut down on bandwidth usage.

Real-time web apps like online games burn through bandwidth thanks to the overhead in common solutions like Socket.IO. To deal with that, I built a binary encoding and decoding system based on defined schemas, which compresses packets before they go out over the WebSocket. Once they arrive, they get decoded back into their original object form, so the code stays readable and maintainable on the development side.

The result was a significant drop in bandwidth usage while staying easy to use and compatible enough to build apps quickly.

Performance tests and results are coming to this post later on.

**This page will likely become a blog post about the system, since the project is being absorbed into something larger that will be listed here instead.**
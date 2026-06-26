---
name: "Packet Wisp"
description: "Schema-based binary encoding for real-time apps that cuts bandwidth usage."
images: ["/img/projects/packet-wisp/packetencoder.png"]
lang: "JavaScript"
---

A binary encoding system for real-time apps, built in JavaScript, made to cut down bandwidth usage.

Real-time web apps like online games burn through a lot of bandwidth because of the overhead in common solutions like Socket.IO. To deal with that I built a binary encoding/decoding system based on defined schemas that compresses packets before they go out over the WebSocket. 
When they arrive at the destination, they can be decoded back to their original object form. This keeps things more readable and maintanable on the development side.

The result was a significant drop in bandwidth usage while keeping it easy to use and compatible enough to develop apps quickly.

I'll be adding performance tests and results to this post later on.
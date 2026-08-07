---
title: "Cleaning Up AI Code: Replacing Prop Drilling With Signals"
creationDate: "2026-08-07"
excerpt: "In this blog post I talk about replacing the messy prop drilling AI wrote for my notes app with a small Observer pattern module, and the tradeoffs from using the pattern."
published: true
tags: ["React", "Architecture", "AI"]
coverImageUrl: "/img/blog/react-observer-pattern/cover.png"
---

AI has advanced a lot in the last few years. It has gotten good enough at coding that we can now work alongside it and ship more than ever before, enough that a single developer like me can move at a speed that otherwise wouldn't be possible.

But shipping fast is not the same as shipping something you can live with. These tools don't hold your principles for you. Keeping code clean and maintainable is still our job.

Recently I used AI to build the UI mockup for a React based notes app I'm working on. It did a great job. The mockup worked like it was supposed to and looked the way I wanted it to for the moment. Then I sat down to read the code, because I wanted to actually understand the architecture I'd be working with for the next month.

The code looked decent. That's the thing about AI though, it reliably lands on the average, the middle ground, whatever most codebases do. And what most React codebases do is prop drilling, passing the ability to modify state down into components as callbacks:

![Screenshot of prop drilling event functions](/img/blog/react-observer-pattern/01.png)![Screenshot of prop drilling event functions into a react component](/img/blog/react-observer-pattern/02.png)This works fine. But every new interaction meant threading another function from App.tsx through a screen, and sometimes through a sub-component below that, before it finally reached the button that actually needed it. Renaming a single event meant touching it in half a dozen places across two files. The prop lists stopped describing what a component *is* and started describing everything it might *do*. That's cognitive load and complexity, which is not what we want.

## How I solved the problem

AI can help us generate code. What it will never replace is our ability to think through problems in our own ways.

So I reached for something I already trust. signalManager.js is a tiny module I've carried into every personal project for years now, an implementation of the Observer pattern. It's about as simple as code gets and it has never let me down.

The problem it solves shows up everywhere, in event driven systems, game engines, UI frameworks, servers. Modules that need to react to each other end up importing each other or threading state through middlemen, and the dependency graph knots up. With the Observer pattern, emitters announce events without knowing who listens, and listeners subscribe without needing the emitter to exist. Either side can be added, removed, or swapped in isolation without breaking the other.

The whole thing is basically a map of signal names to callbacks:

```js
class SignalManager {
  constructor(){
    this.subs = {};
  }
  sub(signalName, id, callback){
    if(typeof id !== "string"){
      console.warn(`SignalManager: Signal subscriptions for "${signalName}" require a valid identifier - rejected.`);
      return;
    }
    if(this.subs[signalName] == undefined){
      this.subs[signalName] = {};
    }
    if( this.subs[signalName][id] !== undefined){
      console.warn(`SignalManager: Tried to overwrite existing subscription for signal "${signalName}" with id "${id}" all callbacks must have unique ids - rejected.`);
      return;
    }
    this.subs[signalName][id] = callback;
  }
  unsub(signalName, id){
    if(this.subs[signalName] == undefined) return;

    if(this.subs[signalName][id] !== undefined){
      delete this.subs[signalName][id];
    }
  }
  unsubAll(id){
    Object.keys(this.subs).forEach((signalName) => {
      if(this.subs[signalName][id] !== undefined){
        delete this.subs[signalName][id];
      }
    });
  }
  emit(signalName, data){
    if(this.subs[signalName] == undefined) return;

    Object.keys(this.subs[signalName]).forEach((id) => {
      if(this.subs[signalName][id] == undefined){
        return;
      }
      this.subs[signalName][id](data);
    });
  }
  emitPrivate(signalName, data, ids){
    ids.forEach((id) => {
      if(this.subs[signalName] == undefined || this.subs[signalName][id] == undefined) return;
      this.subs[signalName][id](data);
    });
  }
}
```

That's it. That's the pattern. And it saves a lot of coupling and dependency tree complexity.

In practice it means App.tsx can listen for changes to the state coming from anywhere below it, without passing down a function for every single operation possible. Components emit a signal carrying the data that describes what happened, and props go back to carrying data only, which is what they were good at in the first place.

![Screenshot of how App.tsx subscribes to listen for intent to edit state](/img/blog/react-observer-pattern/03.png)![Screenshot of a diff of how code used to call a drilled function vs emitting a signal now](/img/blog/react-observer-pattern/04.png)And no, I didn't sit there doing the refactor by hand. I decided on the architecture, then handed the AI descriptive instructions on exactly what to change and where, and it did the mechanical work in a fraction of the time it would have taken me. That's the balance I think we should be aiming for. Make the analysis and the decisions yourself, hand off the typing when appropiate.

## The tradeoffs of this refactor

Emitting is fire and forget, so a signal can't hand anything back. One of the old props created a category *and returned its id* so the editor could attach it to the note in the same breath. That one made me stop and think for a bit. It became a single event instead, "create this category for this note", with the subscriber doing both halves. Intent goes out, nothing comes back.

I also didn't convert everything, and I don't think you should. Opening a sheet, or tracking which row is pending deletion, stayed as plain props, because that's local UI state rather than something the rest of the app needs to know about. Not every problem is a nail to hammer.

A cost that comes from this refactor is that wiring moves from compile time to runtime. Nothing stops you from emitting a name that nobody listens for, which is a fun bug to chase at 11pm. So I keep one module of signal name constants and a payload type per signal, which holds both ends of every event in one place.

The app behaves exactly like it did before. It's just a lot nicer to work on now.
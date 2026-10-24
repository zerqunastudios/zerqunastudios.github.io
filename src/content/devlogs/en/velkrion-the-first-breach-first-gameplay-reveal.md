---
title: 'VELKRION: THE FIRST BREACH — First Gameplay Reveal'
description: 'A first look at the Chapter 1 demo: the Main Camp, the generator, the five-minute gate defence, zombies, weapons and the problems we solved along the way.'
date: 2026-10-25
game: velkrion-the-first-breach
cover: ../../../assets/games/velkrion-the-first-breach/menu-backdrop.webp
coverAlt: 'Top-down pixel-art view of the Main Camp streets in VELKRION: THE FIRST BREACH'
coverPixelated: true
---

The first chapter of VELKRION: THE FIRST BREACH is now playable as a free demo on itch.io. Here is what is in it, how it came together, and where the game is going next.

## The idea

VELKRION is a top-down, 2D pixel-art zombie survival shooter set at the very start of an outbreak. Not years later in a ruined world, but in the first hours, when things are only beginning to fall apart. You play a soldier at a military outpost as communications fail and the camp’s defences start to give way.

We wanted the first chapter to be about survival more than body count. You explore, solve problems with what the camp gives you, and hold out. You never have to kill every zombie; you have to make it out.

## The Main Camp

Chapter 1 takes place at the Main Camp, an outpost with barracks, an armory, a medical wing, a generator room and a security office, connected by roads and service lanes.

At the start the power is out and the camp is dark. Your flashlight is often the only light: a narrow cone that does not see through walls, so rooms and corners stay hidden until you look into them. It works both ways, too. A zombie caught in your beam can notice you from much farther away than one standing in the dark.

## Power and the generator

The first goal is to bring the power back. You find a fuse, fit it into the electrical panel and start the generator. When the power returns, the camp lights come on one after another along the roads, at the building entrances and on the floodlights, 34 lights in total. This is also where the chapter saves a checkpoint.

## Opening the security gate

Restoring power starts the security gate, and the gate takes five minutes to open. That is 300 seconds of active play: the timer stops while the game is paused or while you read a document, and the gate cannot be rushed or squeezed through early.

While it opens, the camp comes under attack. Reinforcements arrive from several directions, and the pressure rises every minute: mostly Walkers at first, then Runners, Armored and Crawlers, then Spitters and Brutes, and in the last minute at most one Alpha. When the gate is fully open, the reinforcements stop.

## Seven zombie types

- **Walker**: the standard infected that wanders, investigates noises and chases.
- **Runner**: thin, fast and relentless on a path.
- **Armored**: takes reduced damage from bullets and shotgun pellets.
- **Brute**: huge and slow, with a heavy hit after a short wind-up.
- **Spitter**: keeps its distance and spits acid you can dodge.
- **Crawler**: closes in with short, sudden lunges.
- **Alpha**: calls nearby zombies to your last known position.

## Six weapons

You start with a **Pistol** that never runs out of reserve ammunition, although you still have to reload. Around the camp you can find an **SMG**, an **Assault Rifle**, a **Shotgun** that fires twelve pellets per shot, an **LMG** whose spread grows during long bursts, and a **Minigun** that has to spin up before it fires and slows you down while it spins.

Each weapon has its own muzzle flash, and bullets react to what they hit: sparks on metal, dust on concrete, splinters on wood.

## Problems we had to solve

### Zombie navigation

Moving a crowd of zombies through a camp full of buildings, doors and furniture was the hardest part of this chapter. Zombies got stuck in door frames and corners. When we went through the pathfinding, we found routes that cut through obstacles near a cabinet and a wall corner, waypoints being skipped too early, and zombies being pushed into door frames while keeping their distance from each other.

The fixes were step by step: a finer navigation grid (from 32 to 16 pixels), path checks that take each zombie’s body size into account, and a small local pathfinding fallback for tight spots, without ever teleporting a zombie. Zombies now steer softly around each other instead of colliding fully, so in very tight crowds their sprites can briefly overlap. We checked the routes through all seven doors in both directions and for both body sizes, but crowd behaviour is still something we keep testing in real play.

### Putting the weapons in the soldier’s hands

The pistol was originally drawn into the soldier’s sprite frames. When the other five weapons arrived, they ended up on top of a character who was already holding a gun.

We removed the old grip from the soldier frames, drew a new arm and hand in Pixelorama, and gave every weapon its own grip point and support-hand point. The pistol uses a two-handed grip; the others use a forward support hand. Muzzle flash, recoil, the muzzle light and the bullet itself all use the same transform as the weapon, so shots now leave from the barrel where you see it.

## What comes next

Everything below is **planned**. None of it is in the demo yet, and plans can change during development:

- a long story told across connected chapters, with a long-term goal of 250 chapters,
- new regions beyond the military outpost,
- a wider variety of puzzles,
- a four-person squad, with switching between characters and AI-controlled teammates.

## Play the demo

The Chapter 1 demo (v0.1.0, Windows) is free on itch.io. If you would like to support development, you can choose to pay what you want. It is an early build and may contain bugs, balance issues and unfinished parts, so feedback is very welcome, either in the itch.io comments or by email at zerquna.studios@gmail.com.

Get the demo on itch.io: [zerqunastudios.itch.io/velkrion-the-first-breach](https://zerqunastudios.itch.io/velkrion-the-first-breach)

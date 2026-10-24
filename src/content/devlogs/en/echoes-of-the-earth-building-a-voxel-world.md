---
title: 'Echoes of the Earth — Building a Voxel World'
description: 'How the voxel world of Echoes of the Earth is built: chunks, world generation, streaming, saving, and the performance work behind the current demo.'
date: 2026-10-25
game: echoes-of-the-earth
---

Echoes of the Earth is still in active development, and a free demo is now on itch.io. This post is about the part of the game you never look at directly but walk on all the time: the voxel world.

![The explorer, the main character of Echoes of the Earth](../../../assets/games/echoes-of-the-earth/explorer-final.webp)

## Why voxels

We wanted a world you can change anywhere: dig into a hill, cut a tree down block by block, build a house where there was a field. A voxel world, made of blocks stored in a grid, makes that possible. It also suits exploration, because the world can be generated as you move through it.

## Blocks, chunks and meshes

The world is divided into chunks, 16 blocks across. The block data is the single source of truth: what you see, what you collide with and what you are aiming at all come from the same data, never from separate copies that could drift apart.

Each chunk builds its visible mesh only from block faces that touch air. Faces buried inside the ground are skipped. Collision works the same way. Instead of a collider for every block, each chunk gets one collision mesh built from its solid surfaces, kept separate from the visual mesh, and a chunk with nothing to show gets no collider at all.

When you break or place a block, only that chunk and the neighbours sharing the changed face are rebuilt, not the whole world. Rebuilds go through a queue with a per-frame budget (four chunks per frame by default), so a burst of changes does not freeze the game.

Aiming walks a ray through the voxel grid itself, so the block you target is exactly the block in the data.

## Generating the world

The first prototype was a small 64 × 64 × 64 test world. Today the world is generated from a seed into different landscapes, such as plains, forests, deserts and rocky highlands, and it is streamed: chunks load and unload around you instead of the whole world staying in memory.

Streaming raised a question: what happens to the blocks you changed in a chunk that has been unloaded? The answer is to keep two layers. The generated baseline can always be rebuilt from the seed, and your own changes are stored separately as a sparse list of differences. When a chunk loads again, it is regenerated and your changes are applied on top.

Each world lives in its own save slot. Saves are written through temporary files and keep backups, so an interrupted save does not destroy the previous one.

## Performance work

Much of the recent work has not been new features but making the existing ones behave better:

- fixing chunk work queues so cancelled or outdated jobs are skipped instead of being processed twice,
- not rebuilding neighbouring meshes during streaming when their visible faces cannot have changed,
- reusing scratch meshes for empty chunks instead of creating and destroying them every time,
- putting a limit on notification queues so they can never grow without end,
- updating villagers and animals on fixed time budgets instead of all at once.

The game has Low, Medium and High graphics presets. One release candidate opened to a black screen on start-up. The log files pointed to an unused ambient occlusion feature in the renderer settings, so we removed it for the next build.

We have not yet measured performance across a wide range of PCs, and it will differ from system to system. That is one of the main things we hope to learn from the demo.

## The demo

The current demo is a Windows build. You can download it for free on itch.io, and if you would like to support development you can choose to pay what you want. Its interface is currently in Turkish.

In the demo you can explore, gather resources, craft and build, meet wildlife and visit villages with traders, with a day–night cycle running in the background. It is a work-in-progress build, so expect bugs and unfinished features.

## What comes next, and how you can help

Development continues. Before we add much more, we want to know how the world feels and runs on your PC. If you try the demo, please tell us what happened, the steps to reproduce it and your system specs (Windows version, processor, graphics card and RAM). You can comment on the itch.io page or email zerquna.studios@gmail.com.

Download the demo on itch.io: [zerqunastudios.itch.io/echoes-of-the-earth](https://zerqunastudios.itch.io/echoes-of-the-earth)

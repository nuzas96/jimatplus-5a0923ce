# JiMAT+

JiMAT+ is a student food security decision engine that helps students decide whether their remaining budget and pantry items can realistically last until the next allowance.

It focuses on a short-term food security problem: the final few days before the next allowance, when students still have some pantry items but do not know whether their food and budget will realistically last.

## What The Prototype Does

- calculates **Estimated Days Covered**
- assigns a **Survival Score**
- assigns a **Confidence Level**
- warns what may happen if the user does nothing
- recommends the **Best Next Purchase**
- generates a short survival plan and shopping summary
- keeps a curated internal pricing preset for deterministic demo outputs
- surfaces **support options** when the situation becomes critical
- shows compact trust signals to explain why the recommendation is defensible

## Project Overview

Instead of acting like a generic recipe app or budgeting tracker, JiMAT+ combines:

- remaining budget
- days left until the next allowance
- pantry items already at home

It then returns a practical, explainable next-step decision.

## Technical Overview

- React + TypeScript frontend for the guided assessment flow
- structured finals data layer for meals, purchase candidates, support resources, and pricing contexts
- deterministic recommendation engine with an internal pricing preset layer
- local assessment logging for internal demo analytics and proof packaging

Current decision flow:

`Inputs -> pantry match -> coverage estimate -> lowest-cost next move -> survival plan -> shopping summary`

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query
- rule-based scoring engine for deterministic outputs
- Lovable for prototype generation and UI iteration

## AI Disclosure

- Lovable: prototype generation and UI iteration
- Codex/OpenAI tools: implementation support, logic refinement, UI polish, and documentation support

## Example Scenario

- Remaining Budget: `RM20`
- Days Left Until Next Allowance: `3`
- Pantry Items: `rice, eggs, onion, instant noodles`

Typical output:

- `Estimated Days Covered: 2.8 days`
- `Survival Score: Tight`
- `Confidence Level: Medium`
- `Best Next Purchase: Tofu`
- `Tofu price: RM4.50`
- coverage improves to `3+ days`

## Run Locally

Requirements:

- Node.js `20+` recommended
- npm

```bash
npm install
npm run dev
```

If `npm install` fails because of peer dependency resolution, use:

```bash
npm install --legacy-peer-deps
```

Then open the local Vite URL shown in the terminal.

## Installation / Setup Guide

1. Clone the repository.
2. Open the project folder.
3. Install dependencies with `npm install`.
4. If needed, retry with `npm install --legacy-peer-deps`.
5. Start the local development server with `npm run dev`.
6. Build a production bundle with `npm run build`.

## Checks

```bash
npm test
npm run build
npm run lint
```

## Roadmap

Later versions can expand into:

- pilot deployment with one campus welfare or student affairs unit
- annual campus-license model after pilot validation
- optional food-support partnerships for critical cases
- admin-managed datasets and reporting
- deeper campus-specific support integrations
- stronger local meal recommendations
- a backend service for shared data and multi-campus scaling

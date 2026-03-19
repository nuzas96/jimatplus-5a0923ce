# JiMAT+

JiMAT+ is a student food budget survival planner built for PutraHack 2026 under the Food Security theme.

The app helps students answer one urgent question: can their remaining budget and pantry items realistically last until the next allowance?

## What It Does

- estimates how many days the current food situation can cover
- classifies the situation as `Safe`, `Tight`, or `Critical`
- explains what happens if the user does nothing
- recommends the cheapest next purchase that improves the plan
- generates a short survival plan and shopping summary

## Canonical Demo Scenario

- budget: `RM20`
- days left: `3`
- pantry: `rice, eggs, onion, instant noodles`
- expected story:
  - `Survival Score: Tight`
  - `Confidence Level: Medium`
  - `Estimated Days Covered: 2.8 days`
  - best next purchase: `Tofu`

## Tech Notes

- Vite + React + TypeScript
- rule-based scoring engine for reproducible outputs
- Lovable used for prototype generation and UI acceleration

## AI Disclosure

- Lovable: prototype generation and interface scaffolding
- Codex/OpenAI tools: implementation support, logic refinement, UI polish, and documentation updates

## Run Locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm test
npm run build
npm run lint
```

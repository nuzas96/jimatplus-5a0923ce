# JiMAT+

JiMAT+ is a student food security decision engine built for the PutraHack 2026 preliminary round and refined for the grand finale.

It helps students answer one urgent question:

**Can my remaining budget and pantry items realistically last until my next allowance?**

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

## Locked Demo Scenario

Use this same scenario across the app, deck, and video:

- Remaining Budget: `RM20`
- Days Left Until Next Allowance: `3`
- Pantry Items: `rice, eggs, onion, instant noodles`

Expected result story:

- `Estimated Days Covered: 2.8 days`
- `Survival Score: Tight`
- `Confidence Level: Medium`
- warning that the current plan may not last without adjustment
- `Best Next Purchase: Tofu`
- `Tofu price: RM4.50`
- coverage improves to `3+ days`

## Why This Qualifies Now

JiMAT+ fits the Food Security theme because it addresses a real short-term food security problem for students: unstable access to meals near the end of an allowance cycle. The prototype focuses on affordability, pantry reuse, practical next-step decisions, and support escalation rather than generic meal browsing.

## Finals Architecture

- React + TypeScript frontend for the guided assessment flow
- structured finals data layer for meals, purchase candidates, support resources, and pricing contexts
- deterministic recommendation engine with an internal pricing preset layer
- local assessment logging for internal demo analytics and proof packaging

## Finals Proof Notes

- `Student-Area Budget Preset` is a manually maintained finals-demo pricing preset calibrated around student-accessible shops near the UniKL MIIT area
- validation, pricing proof, comparison, and commercial viability should be presented in the finals deck rather than in the public app UI
- the public demo flow does not expose pricing-context controls
- user-facing claims should stay modest and exact: small-sample early validation, not large-scale market validation

## Early Validation Snapshot

- total early student responses: `16`
- `93.8%` said they have faced food and budget uncertainty near allowance day
- `68.8%` rated the recommendation as very clear
- `87.5%` said JiMAT+ felt more useful than a normal recipe app for this exact problem
- `87.5%` said the support options made the app feel more responsible in critical cases
- `81.3%` said they would use something like this if their campus offered it

Current quote used in finals packaging:

`i highly recommend this to others because our country is currently facing inflation, so this can help ensure that no one is negatively affected.`

## Pricing Proof Wording

- safe current wording: `JiMAT+ uses a curated Student-Area Budget Preset for the finals demo.`
- stronger wording only after manual checks: `Sampled nearby student-market prices were used to calibrate the Student-Area Budget Preset.`
- do not claim official campus prices, real-time pricing, or verified institutional price feeds

## Stack

- Vite
- React
- TypeScript
- rule-based scoring engine for deterministic outputs
- Lovable for prototype generation and UI iteration

## AI Disclosure

- Lovable: prototype generation and UI iteration
- Codex/OpenAI tools: implementation support, logic refinement, UI polish, and documentation support

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

## Roadmap

Later versions can expand into:

- admin-managed datasets and reporting
- deeper campus-specific support integrations
- stronger local meal recommendations
- a backend service for shared data and multi-campus scaling

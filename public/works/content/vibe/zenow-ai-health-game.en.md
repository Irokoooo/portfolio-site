## Motivation

Zenow was created for **Coding Lady**, a women-focused AI creator hackathon built around five interpretations of time. Our team chose **flow time** and asked a simple question: could healthy routines feel less like a checklist and more like a world people genuinely want to enter?

Zenow is an AI health companion game. Completing real-life wellbeing tasks moves the player through a small town, where dice rolls, encounters, rewards, and visible growth turn everyday action into an exploratory loop.

## Pain Points

- The hackathon timeline required product mechanics, visual experience, data flows, and a playable build to ship in parallel.
- A health product can easily become another compliance tracker; the experience needed to preserve curiosity and flow.
- Parallel development streams had to remain isolated enough to avoid overwriting work or destabilising the playable build.
- The final result had to be a genuinely deployed product, not a conceptual prototype.

## Implementation

I owned **all technical implementation** of Zenow. Under a compressed schedule, I coordinated Codex and Claude Code through a multi-agent workflow: one agent acted as the orchestration hub, breaking work into bounded tracks and integrating results, while multiple agents implemented independent modules in parallel without colliding.

The core loop connects tasks, dice rolls, town movement, encounters, rewards, and progression. The experience later expanded with an AI cottage, daily fortune, growth petals, skill cards, and a memory galaxy. The shipped stack includes an interactive map, 3D dice, task and reward systems, Supabase-backed data, and mobile adaptation.

## Outcome

- Shipped a playable production build at [zen0w.me](https://zen0w.me/?ui=20260725-2)
- Built a trial community of **50+ people** for real-world feedback
- Won the hackathon's **Creativity Award**
- Completed the full loop from on-site coding and engineering delivery to an in-person team demo

## Iteration Notes

This project reinforced that parallel agents are not valuable merely because they produce code faster. Their real leverage comes from explicit ownership, an orchestration layer, and continuous integration: every track must know what it owns, what it must not touch, and when it returns to the main flow for verification.

The next iteration will refine the rhythm between real health behaviours and in-game feedback, making growth feel like a personal journey rather than a collection of numbers.

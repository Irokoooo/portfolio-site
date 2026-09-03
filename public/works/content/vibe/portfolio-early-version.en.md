## Project Overview

The first version of this portfolio was born during the summer of 2025, when I was applying for a front-end product internship at FuncCat. At the time, my knowledge of the React ecosystem was at the "heard of it" stage. I relied entirely on AI Prompts to build my first personal website prototype from scratch — a very typical early Vibe Coding style: functionality-driven, visually rough, but it ran.

---

## Motivation

The time pressure was real: the internship application window was only two weeks, and my resume was full of experience descriptions but had nothing you could actually "click and see." My judgment was that front-end product roles care most about whether you can actually ship things — a live, working page was far more direct than a PDF full of text.

So in July 2025, I used Claude + Cursor to build the first version in 3 days. The goal was very modest: stuff in my experiences, projects, and contact information, and have a domain name that opens — that was good enough.

---

## Pain Points

### What made the first version "ugly"

- **Color scheme was an accident scene**: The whole page in deep blue and bright orange — a high-contrast "tech" color scheme that was completely out of place on light-content pages
- **No typographic hierarchy**: Headings, body text, and labels all used the same font size and weight, making the page feel like reading a user manual
- **Information density out of control**: I tried to cram every experience into the homepage, making every section crowded together with almost no white space
- **Zero component reuse**: Every card was independently stacked HTML with no abstraction — changing one color meant manually updating it in a dozen places
- **No responsive design**: On mobile it was chaos — text overflowing containers, layout completely broken

### Limitations of Vibe Coding

As a business student jumping into front-end, the biggest blind spot was "not knowing what I didn't know." AI generated a lot of code that looked like it "worked," but the code was stacked, not designed:
- Components had no responsibility boundaries; a single file had seven or eight unrelated features stuffed into it
- CSS was a massive block of inline styles, with no concept of design tokens whatsoever
- State management relied on prop drilling passed three or four levels deep — tracing one linked change took forever

---

## Implementation

### The version delivered to FuncCat

The page went live two days before the application deadline, containing:
- About page: photo, short self-introduction, skill tags
- Projects page: 4 cards, each with a cover image and short description
- Contact: email + GitHub + LinkedIn icon row

Deployed on Vercel with a custom domain, linked directly on my resume under "Personal Website."

After the FuncCat interviewer looked at it, they said one thing I remember vividly: **"The page runs, but I can't evaluate the code quality."**

That line was the direct reason I later decided to completely rewrite the portfolio.

---

## Iteration Notes

### The core gap: Before → After

| Dimension | First Version (FuncCat) | Current Version |
|------|---------|---------| 
| Tech stack | React + Vite + heavy inline styles | Next.js 14 App Router + TypeScript + Tailwind |
| Design system | None, all improvised | Tailwind custom tokens (seed-shadow / cream-pour, etc.) |
| Typography | System default | Instrument Serif + Geist Sans (serif/sans-serif layering) |
| Color scheme | Randomly stacked | Botanical warm-toned parchment system (low-saturation, theory-backed) |
| Component quality | No reuse, no types | TypeScript interfaces, components with clear Props |
| Content management | Hard-coded in JSX | MDX + index.ts registry, content separated from presentation |
| Interactions | No animations | Framer Motion global system (entry / hover / page transitions) |
| Deployment | Bare Vercel deploy | Same Vercel, but with CI scripts and type checking |

### What this experience taught me

The core value of Vibe Coding is not "writing good code" — it's **"rapidly turning an idea into something visible."** The value of the first version was precisely that it ran. It got me an interview, and through the interviewer's remark, I had my first real, visceral sense of the distance between "works" and "works well."

This early version is the starting point of my Vibe Coding learning curve. It was ugly, but it was real.

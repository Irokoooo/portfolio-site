## Motivation

Drawing on my habit of following international economic news and the real pain points I was experiencing while self-studying French and advancing my English, I noticed that existing language learning apps either use hopelessly outdated content or are expensive and bloated. When I tried reading fresh, real-time foreign press directly, I constantly hit vocabulary walls. And when I wanted to have a deep conversation with an AI about a news article, the constant copy-pasting between the news page and the AI chat window severely disrupted my flow state. So I decided to build a tool grounded in the concept of "dynamic leveling and contextual immersion": the app would fetch real-time news, automatically adjust vocabulary difficulty up or down based on the user's current language level, and support seamless, in-context speaking practice on the same page — eliminating the friction of switching between apps entirely.

## Pain Points

In developing this multi-modal application, the news source and speech (TTS/STT) interfaces connected smoothly thanks to Google AI Studio's mature ecosystem. The real logical bottleneck appeared at the UI polish and deployment stages.

First, when adapting for multi-device compatibility, the AI would often accidentally break — or completely destroy — the existing desktop layout while optimizing the mobile UI, because there was no global planning in place. Second, after the project took shape in the Google AI Studio sandbox, moving it to GitHub for independent deployment immediately surfaced the reality of very low official API quotas and high call costs. This meant I had to leave the sandbox environment, rewrite the backend logic in a local code editor, and replace the underlying model service with a more cost-effective private token interface.

## Implementation

To overcome these obstacles, I developed a "dual-engine" workflow:

1. **Requirements translation and Plan Mode orchestration:**
I stopped bringing feature requests directly to the code-writing AI. Instead, I first fed my plain-language pain points to a logically strong AI (such as Claude) and had it "translate" the requirements into front-end and back-end development instructions with proper technical terminology. Once I had the structured specification, I entered the code Agent's Plan Mode, locked the overall architecture first, then filled in each component one by one.

2. **Physical isolation to resolve multi-device conflicts:**
To address the recurring errors from multi-device adaptation, I added a hard requirement in the project's core `skill.md` (system instructions) that the AI must physically separate the CSS and logic for PC and mobile from the very beginning. This defined the boundaries of the AI's modifications and prevented the "change one thing, break everything" cascade.

3. **Version rollback and API substitution:**
When reconstructing the interface in local VS Code to connect a low-cost API, I strictly required the AI to create a version snapshot after every single component change. Through this extremely granular version control, I successfully stripped out and replaced the underlying communication interfaces without breaking the original "listen, speak, read, memorize" business flow.

## Iteration Notes

From the stumbling early stages to the full-pipeline completion of Luma-Flow, my Vibe Coding workflow has matured considerably. I've come to deeply understand that as the barrier to code generation approaches zero, the "moat" for a product architect is no longer technical execution — it's the shift in mindset. You must define yourself as a "consumer" of Vibe Coding, not merely a "producer." Only by fully inhabiting the real user's pain points, and constantly asking "what kind of product would I actually pay for?", can you transform a self-indulgent demo into a product with tight logic and genuine commercial value.

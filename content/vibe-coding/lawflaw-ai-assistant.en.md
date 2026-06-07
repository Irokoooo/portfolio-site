## Motivation

Influenced by my family background and my deep personal interest in law, I have long followed developments in legal practice. While studying Contract Law as part of my International Economics and Trade degree, I identified a clear business pain point: companies involved in cross-border trade face extremely high costs and compliance risks when reviewing international contracts. The underlying logic of this project is that, although cross-border compliance is highly dependent on specialized legal expertise, large language models possess powerful text-extraction and rule-matching capabilities that can automate the tedious preliminary review process. When a senior student invited me to participate in the national "ZhiFa Cup" AI-Empowered Legal Innovation Competition, I seized the opportunity to develop an AI-powered cross-border legal compliance platform — to validate the commercial feasibility of this logic and gain hands-on experience with AI Agents in a real business context.

## Pain Points

As a business student without a computer science background, I encountered two core technical bottlenecks during full-stack development:

1. **Barriers to Agent integration and backend deployment.** My prior Vibe Coding experience was limited to generating static web pages; I had never attempted to integrate an enterprise-level LLM Agent (such as Tencent Cloud's) into a custom system. Facing opaque official deployment documentation, API authentication rules, and backend configuration on the Render server, I spent a long time in technical trial-and-error early on.
2. **Crude front-end interface layout.** Web pages generated purely through Prompts in the early stages were flat and lacked visual hierarchy, failing to meet the UI standards expected of a "professional legal compliance platform."

## Implementation

1. **Copilot Plan Mode for framework control.** I changed my approach from asking the AI to output an entire codebase at once, and instead used VS Code Copilot's Plan Mode. I first used natural language to define the platform's overall architecture and core functional logic (e.g., overall structure, targeted revision logic, change logging), then generated and optimized each component one by one only after the foundational framework was locked in.
2. **Prototype design guiding front-end code.** To solve the front-end layout problem, I systematically studied web design fundamentals and Figma. By creating high-fidelity prototypes, learning professional design language, and combining this with structured AI-assisted front-end Prompts, I gained precise control over the dimensions, colors, and typography of AI-generated components.
3. **Building a lightweight backend to handle the API.** When integrating the Tencent Cloud Agent, by studying forum posts and advice from experienced developers, I recognized the importance of API key security and maintaining session context. I used AI assistance to write a lightweight backend proxy service that handles identity authentication, Session ID management, and parses the complex JSON data returned by the Agent — mapping it precisely to the corresponding display panels on the front end.

## Iteration Notes

After independently completing this system — with its own 3D IP character and full business workflow — my biggest takeaway about Vibe Coding is this: AI has not eliminated the barriers to writing code. Left unguided, AI very easily produces redundant, repetitive content that accumulates into an unmaintainable "code landfill." Therefore, as the person leading the project, a human's core value lies in the ability to articulate requirements clearly and to judge basic code logic. The developer must be able to pinpoint the logical gaps in the code and guide the AI in making targeted improvements.

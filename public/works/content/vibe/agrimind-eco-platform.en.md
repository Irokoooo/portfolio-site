## Motivation

The original endpoint of this research was just a Word document sitting in a folder. But during fieldwork in Jingpoluo Village, Miyun District, a passing remark from a villager stopped me cold: "You young people keep talking about AI empowerment — but how exactly can AI empower us farmers?" The vast chasm between grand tech narratives and the real, muddy texture of rural life made me realize that simply pointing to "information asymmetry" and "missing brands" was not enough. I wanted to build a realistic "agriculture-support integrated" web scenario — cutting out the layers of middlemen, making the flow of produce visible, and using real code to answer that villager's question.

## Pain Points

When I actually tried to use Vibe Coding to turn my fieldwork into a working web app, the gap between ideal and reality was immediately exposed:

1. **The "quantification dilemma" of unstructured agricultural data.** AI is exceptionally good at handling formatted JSON data, but real agriculture is too "heavy." Soil moisture, the sweetness of a tomato, the planting wisdom passed down through generations of farmers — none of this place-specific knowledge can be directly converted into code parameters.
2. **A "castle in the air" without hardware support.** I had designed traceability and real-time monitoring features for the web app, but I immediately hit the wall of the physical world: without IoT sensors and field hardware in place, all the data displayed on the front end would be meaningless fabrications.
3. **"Render crashes" from overreaching.** As a newcomer, I once tried to ask AI to generate in one go a complete system featuring a panoramic Miyun map and interactive 3D farm. The result was layer upon layer of nested code logic, continuous browser errors, and AI-generated outputs that fell into circular conflicts.

## Implementation

Faced with the double blow of reality and bugs, I adjusted my human-machine collaboration strategy and recalibrated my understanding of my own knowledge boundaries:

1. **Breaking requirements into atomic Prompts.** I abandoned the fantasy of "one-click 3D farm generation." I decomposed the massive requirement into a Minimum Viable Product (MVP): first complete the basic product text-and-image feed, then gradually layer in lightweight interactive effects. I also read open-source project code to reverse-guide the AI in fine-tuning CSS and JS details.
2. **Interdisciplinary catch-up to bridge software and hardware logic.** Since the code was blocked at the hardware integration point, I went to the computer science department to study IoT and hardware fundamentals — understanding how sensor data flows through an API into a backend. Even without soldering circuit boards myself, I needed to first grasp the underlying data pipeline for the AI-generated interfaces to have any chance of real-world applicability.

## Iteration Notes

From trudging through Miyun's mud to do interviews, to eventually bringing home a national third-place prize, this project reshaped my understanding of "technology for agriculture" and Vibe Coding. I realized that a keyboard and a few elegant Prompts are nowhere near enough. AI does lower the barrier to writing code, but it also makes it easier to fall into the trap of feature accumulation — leaving behind a pile of modules that look complete but have no real business value. Genuine technology for social good isn't about flashy tech demos; it's about getting your hands dirty, and building targeted solutions based on real pain points uncovered in the field. The significance of Vibe Coding lies not only in "ordinary people can write code now," but more importantly in giving us the ability — after we've seen a real problem — to create something small but genuinely effective.

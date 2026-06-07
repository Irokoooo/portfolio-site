## Motivation

To compete in the 2024 "Challenge Cup" National College Student Entrepreneurship Competition, our team set our sights on helping Luochuan County, Shaanxi Province, expand overseas. Luochuan apples are exceptional in quality, but local farmers face enormous language and communication barriers when trying to connect directly with overseas markets. The underlying logic of this project was clear: leverage large language model APIs and digital avatar technology to build a cross-border business sales platform. By using AI to achieve precise translation and product recommendations, we could remove the information barriers faced by overseas buyers and meaningfully help Luochuan apple growers broaden their export channels.

## Pain Points

Upgrading the project from a basic web showcase to a platform with AI digital avatar interactions presented two core technical bottlenecks:

1. **Precision requirements for the AI knowledge base:** If we simply connected a general-purpose LLM API, the AI could only give vague, generic answers. We needed to seamlessly embed Luochuan-apple-specific data (flavor profile: sweet/crisp, varietal differences, storage methods, etc.) into the conversation context for the AI to provide effective, precise recommendations.
2. **Implementing proactive digital avatar interaction:** We needed to transform the team's "Pingxiaoyou" character illustration set into an interactive entity on the web page. This required not only front-end code capable of switching static images based on conversation state to simulate lip movements and expressions, but also a system that could monitor user browsing behavior and trigger the digital avatar to proactively initiate a sales conversation at the right moment — involving complex front-end state management.

## Implementation

1. **Structured Prompt + local knowledge base:** I abandoned the general conversation mode and instead used structured Prompts to constrain the LLM's response boundaries. I fed the specific selling points and parameters of Luochuan apples as pre-loaded knowledge to the AI Agent, ensuring that when overseas buyers asked questions, the API could draw on this business data and deliver recommendations as precise as those from a professional sales representative.
2. **State-driven 2.5D digital avatar:** For the digital avatar implementation, I used AI assistance to write a front-end script that organized the "Pingxiaoyou" image assets into a state library (e.g., idle, greeting, introducing a product). By listening to the text responses returned by the AI API, I triggered the front-end JS script to switch images, achieving low-cost interactive visualization in the browser.
3. **Behavior-based proactive dialogue trigger:** To give the digital avatar the ability to proactively sell, I had the AI supplement front-end user behavior monitoring code. When the system detected that a user had stayed on a particular apple variety page beyond a set time threshold, it automatically triggered the digital avatar to send a specific opening line (e.g., proactively introducing that variety's flavor and texture), guiding the user into a sales dialogue.

## Iteration Notes

This project ultimately won a national second-place prize at the Challenge Cup — my first project to achieve genuine commercial deployment. It gave me enormous encouragement. It not only validated the feasibility of combining Vibe Coding with a concrete business scenario, but also gave me the opportunity to take the front-end interaction design knowledge I had been self-studying and accumulating (such as state management, behavior monitoring, and animation triggers) and put it into practice in an actual product, completing the full loop from concept to usable product.

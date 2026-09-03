## Motivation

OpenClaw offers powerful local-agent capabilities, but terminal-first interaction creates friction for non-technical users. SpellBook turns those capabilities into a visual workspace where local agents can be managed through familiar web chat.

## Solution

SpellBook uses a dual Web + local Agent architecture. The web layer handles conversation, task management, and visible state; the local layer performs execution. Offline queues and streaming output keep both sides coordinated.

- Replaces most CLI interaction with a conversational interface
- Makes agent status, tasks, and output observable
- Supports offline task queues and resumable execution
- Provides a Windows-ready local experience

## Implementation

The project connects Next.js, Supabase Realtime, and Python FastAPI across the web and local runtimes, with an agent architecture for dispatch, state synchronization, streaming messages, and failure recovery.

## Iteration Notes

This project reinforced that the barrier to an AI product is not only model capability. Interaction and runtime complexity matter just as much. Making a powerful system understandable, observable, and recoverable is a core product-design problem.

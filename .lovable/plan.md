# Live AI Workspaces for Guides

## Goal
Turn every guide into a working AI experience instead of a static catalog. Learners will enter a prompt, run the guide’s best-fit tool, and receive a real generated result.

## What will change

### Guide catalog
- Keep the existing guide cards, progress, categories, and learning pathways.
- Add a clear **Try AI** action to every guide.
- Stop unsupported guide slugs from silently opening Claude lessons.

### Guide workspace
Create one consistent workspace that adapts to the selected guide:
- **Claude, Gemini, ChatGPT, Perplexity:** conversational assistant and research-style responses.
- **Jasper AI, Copy.ai:** marketing and writing generation with useful presets.
- **Notion AI:** summaries, action items, meeting notes, and document drafting.
- **AI for Business:** structured plans, workflows, and strategy output.
- **Stable Diffusion, Midjourney, DALL·E, Canva AI:** real image generation with prompt, style, and aspect-ratio controls.

Each workspace will include:
- Platform identity and a task-specific prompt area.
- Relevant presets instead of a generic chat box.
- Loading, empty, completed, and actionable error states.
- Markdown rendering for text results.
- Download support for generated images and copy support for text results.
- A short disclosure that results are powered by Indian Dreams AI, not the external platform’s official API.

### Real AI connection
- Add authenticated backend functions so model credentials never reach the browser.
- Use `openai/gpt-6-astra` with streamed reasoning and answers for text generation.
- Use the Lovable AI image model for image-focused guides.
- Keep platform instructions in a strict server-side allowlist; the browser may select a supported guide but cannot inject system prompts or model IDs.
- Preserve full text conversation context for follow-up prompts.
- Surface the gateway’s real error message and follow its retry rules; only rate limits and temporary server failures retry with bounded backoff.

## Safety and access
- Require a signed-in learner for every generation request.
- Validate prompt length and guide IDs on the server.
- Add explicit function configuration and CORS handling.
- Do not add public database tables or persist conversations; results remain in the current session unless the learner downloads or copies them.

## Verification
- Invoke both the text and image functions with real test requests and inspect their responses.
- Test text generation, a follow-up prompt, image generation, copying, downloading, invalid input, and visible error handling.
- Verify the guide catalog and workspace on desktop and mobile, then confirm the preview builds without errors.

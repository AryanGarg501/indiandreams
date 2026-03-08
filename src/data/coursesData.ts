export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  emoji: string;
  description: string;
  totalLessons: number;
  totalHours: number;
  modules: Module[];
}

export const coursesData: Record<string, Course> = {
  claude: {
    title: "Claude",
    emoji: "🤖",
    description: "Master Claude AI — from fundamentals to advanced prompt engineering and real-world applications.",
    totalLessons: 10,
    totalHours: 5,
    modules: [
      {
        id: "m1",
        title: "Getting Started with Claude",
        lessons: [
          {
            id: "l1",
            title: "Introduction to Claude AI",
            duration: "8 min",
            content: `## What is Claude?

Claude is an AI assistant created by **Anthropic**, designed to be helpful, harmless, and honest. It's one of the most capable AI models available today.

### Why Learn Claude?

- **Natural Conversations**: Claude excels at understanding context and nuance in conversations
- **Long Context**: Can process up to 200K tokens — entire books, codebases, or research papers
- **Safety First**: Built with constitutional AI principles for reliable outputs
- **Versatile**: Writing, analysis, coding, math, creative work, and more

### Key Capabilities

1. **Text Generation** — Write articles, emails, stories, and more
2. **Analysis** — Summarize documents, extract insights, compare data
3. **Coding** — Write, debug, and explain code in dozens of languages
4. **Reasoning** — Step-by-step problem solving and logical analysis
5. **Creative Work** — Brainstorming, ideation, and creative writing

### How Claude Differs from Other AIs

| Feature | Claude | Others |
|---------|--------|--------|
| Context Window | 200K tokens | Varies |
| Safety Focus | Constitutional AI | RLHF |
| Honesty | Admits uncertainty | May hallucinate |
| Artifacts | Visual outputs | Text only |

> 💡 **Pro Tip**: Claude works best when you provide clear, specific instructions with context about what you need.

In the next lesson, we'll set up your workspace and start having your first conversations with Claude.`,
          },
          {
            id: "l2",
            title: "Setting Up Your Workspace",
            duration: "12 min",
            content: `## Setting Up Your Claude Workspace

Before diving into using Claude, let's set up an efficient workspace.

### Accessing Claude

There are several ways to access Claude:

1. **Claude.ai** — The official web interface (free tier available)
2. **API Access** — For developers and power users
3. **Third-party integrations** — Through platforms that integrate Claude

### Creating Your Account

1. Visit [claude.ai](https://claude.ai)
2. Sign up with your email or Google account
3. Verify your email address
4. Complete the onboarding steps

### Understanding the Interface

The Claude interface is clean and straightforward:

- **Chat Area**: Where conversations happen
- **New Chat**: Start fresh conversations for different topics
- **Projects**: Organize related conversations together
- **Artifacts**: Visual outputs that Claude can create

### Best Practices for Your Workspace

- **Organize by Project**: Keep separate chats for different tasks
- **Use Descriptive Names**: Rename chats to find them easily later
- **Save Important Outputs**: Copy or download key results
- **Iterate**: Build on previous conversations rather than starting over

> 🎯 **Action Item**: Create your Claude account and explore the interface before moving to the next lesson.`,
          },
          {
            id: "l3",
            title: "Your First Conversation",
            duration: "15 min",
            content: `## Having Your First Conversation with Claude

Now that your workspace is set up, let's have your first meaningful conversation with Claude.

### The Art of the First Prompt

Your first message sets the tone. Here's a framework:

\`\`\`
I need help with [specific task].
Here's the context: [background info]
I'd like the output to be: [format/style]
\`\`\`

### Example Conversations

**Simple Request:**
> "Summarize the key benefits of remote work in 5 bullet points"

**Detailed Request:**
> "I'm writing a blog post about sustainable living for millennials. Can you help me outline 5 sections with catchy headers and 2-3 key points each? The tone should be casual and encouraging."

### Tips for Better Responses

1. **Be Specific** — "Write a 200-word product description" vs "Write about my product"
2. **Provide Context** — Share relevant background information
3. **Define Format** — Tell Claude how you want the output structured
4. **Iterate** — Ask follow-up questions to refine the response

### Practice Exercise

Try these prompts with Claude:

1. Ask Claude to explain a complex topic simply
2. Have Claude help you write a professional email
3. Ask Claude to analyze pros and cons of a decision

> 🚀 **Challenge**: Have 3 different conversations with Claude today using the techniques above.`,
          },
        ],
      },
      {
        id: "m2",
        title: "Prompt Engineering Basics",
        lessons: [
          {
            id: "l4",
            title: "Understanding Prompt Structure",
            duration: "20 min",
            content: `## Understanding Prompt Structure

A well-structured prompt is the key to getting great results from Claude.

### The CRISP Framework

- **C**ontext — Background information Claude needs
- **R**ole — Who should Claude act as?
- **I**nstructions — What specifically to do
- **S**pecifications — Format, length, tone requirements
- **P**urpose — Why you need this (helps Claude prioritize)

### Examples

**Before (vague):**
> "Help me with marketing"

**After (structured):**
> "Act as a digital marketing strategist. I run a small bakery in Austin, TX. Create a 1-month social media calendar for Instagram with 3 posts per week. Each post should include a caption (under 150 words), relevant hashtags, and a content type (photo, reel, story). Focus on increasing local foot traffic."

### Prompt Templates

Save these templates for common tasks:

1. **Analysis**: "Analyze [topic] considering [factors]. Present findings as [format]."
2. **Writing**: "Write a [type] about [topic] for [audience]. Tone: [style]. Length: [words]."
3. **Problem Solving**: "I'm facing [problem] in [context]. Suggest [number] solutions with pros/cons."

> 📝 **Exercise**: Rewrite 3 vague prompts using the CRISP framework.`,
          },
          {
            id: "l5",
            title: "Role-Based Prompting",
            duration: "18 min",
            content: `## Role-Based Prompting

Assigning Claude a role dramatically improves output quality and relevance.

### Why Roles Work

When you give Claude a role, it:
- Adopts domain-specific knowledge
- Uses appropriate terminology
- Provides insights a real expert would
- Maintains consistency throughout the conversation

### Effective Role Prompts

**Business:**
> "You are a seasoned business consultant with 20 years of experience helping startups scale."

**Technical:**
> "Act as a senior software engineer specializing in React and TypeScript."

**Creative:**
> "You are a bestselling copywriter known for compelling headlines and persuasive narratives."

### Advanced: Multi-Role Conversations

You can even have Claude switch roles:

> "First, as a product manager, identify the top 3 features to build. Then, as a UX designer, sketch the user flow for the top feature. Finally, as a developer, estimate the effort for each."

> 🎯 **Practice**: Try the same question with 3 different roles and compare the outputs.`,
          },
          {
            id: "l6",
            title: "Chain of Thought Techniques",
            duration: "22 min",
            content: `## Chain of Thought Techniques

Chain of Thought (CoT) prompting helps Claude work through complex problems step by step.

### What is Chain of Thought?

Instead of asking for a direct answer, you ask Claude to show its reasoning process.

### How to Use CoT

**Basic CoT:**
> "Think through this step by step: [problem]"

**Structured CoT:**
> "Solve this problem by:
> 1. First, identify the key variables
> 2. Then, analyze the relationships
> 3. Next, consider edge cases
> 4. Finally, provide your conclusion"

### When to Use CoT

- Math and logic problems
- Complex analysis tasks
- Decision-making scenarios
- Debugging code
- Strategic planning

### Example

**Without CoT:**
> "Should I launch my product in Q1 or Q2?"

**With CoT:**
> "I'm deciding whether to launch my product in Q1 or Q2. Think through this step by step considering: market seasonality, competitor launches, team readiness, and budget cycles. Show your reasoning for each factor before making a recommendation."

> 💡 **Key Insight**: CoT doesn't just improve accuracy — it also makes Claude's reasoning transparent so you can verify and adjust.`,
          },
        ],
      },
      {
        id: "m3",
        title: "Advanced Techniques",
        lessons: [
          {
            id: "l7",
            title: "System Prompts Mastery",
            duration: "25 min",
            content: `## System Prompts Mastery

System prompts define Claude's behavior for an entire conversation. Master them to create consistent, specialized AI experiences.

### What Are System Prompts?

System prompts are instructions given to Claude before the conversation starts. They set:
- **Personality** and communication style
- **Knowledge boundaries** and expertise areas
- **Output format** preferences
- **Rules and constraints**

### Crafting Effective System Prompts

A great system prompt includes:

1. **Identity**: Who is Claude in this context?
2. **Capabilities**: What can it do?
3. **Constraints**: What should it avoid?
4. **Style**: How should it communicate?
5. **Examples**: What does good output look like?

### Template

\`\`\`
You are [role] with expertise in [domains].

Your communication style is [tone/style].

When responding:
- Always [do this]
- Never [do this]
- Format responses as [format]

If asked about [topic], focus on [aspect].
\`\`\`

> 🔧 **Exercise**: Create 3 system prompts for different use cases (customer support, writing assistant, code reviewer).`,
          },
          {
            id: "l8",
            title: "Multi-Turn Conversations",
            duration: "20 min",
            content: `## Multi-Turn Conversations

Learn to build on previous messages for deeper, more productive conversations.

### The Power of Context

Claude remembers everything in the current conversation. Use this to:
- Build progressively complex outputs
- Refine and iterate on ideas
- Explore topics from multiple angles

### Strategies

1. **Layered Refinement**: Start broad, then narrow down
2. **Role Switching**: Change perspectives mid-conversation
3. **Building Blocks**: Create pieces, then combine them
4. **Feedback Loops**: Share what works and what doesn't

### Example Flow

\`\`\`
Turn 1: "Help me brainstorm 10 blog post ideas about AI in healthcare"
Turn 2: "Expand idea #3 into a detailed outline"
Turn 3: "Write the introduction paragraph with a compelling hook"
Turn 4: "Now make it more conversational and add a personal anecdote placeholder"
Turn 5: "Generate 5 headline options for this post"
\`\`\`

> 🎯 **Practice**: Have a 10-turn conversation where each message builds on the previous one.`,
          },
          {
            id: "l9",
            title: "Claude for Content Creation",
            duration: "30 min",
            content: `## Claude for Content Creation

Claude is a powerful content creation partner. Learn workflows for different content types.

### Blog Posts

**Workflow:**
1. Brainstorm topics with Claude
2. Generate an outline
3. Write section by section
4. Edit and refine together
5. Generate meta descriptions and social posts

### Social Media

**Batch Creation:**
> "Create a week's worth of LinkedIn posts about [topic]. Each post should: start with a hook, be under 200 words, end with a question, include relevant emoji."

### Email Marketing

**Sequence Creation:**
> "Design a 5-email welcome sequence for new subscribers to my [type] newsletter. Include subject lines, preview text, and body copy."

### Video Scripts

> "Write a 3-minute YouTube script about [topic]. Include: hook (15 sec), intro (30 sec), 3 main points (2 min), CTA (15 sec)."

### Tips for Quality Content

- Always specify your target audience
- Provide brand voice guidelines
- Share examples of content you like
- Ask Claude to vary sentence structure and length

> 📝 **Project**: Use Claude to create a complete content package (blog + 5 social posts + email) for a topic of your choice.`,
          },
          {
            id: "l10",
            title: "Building AI Workflows",
            duration: "35 min",
            content: `## Building AI Workflows

Combine everything you've learned to create powerful, repeatable AI workflows.

### What is an AI Workflow?

An AI workflow is a structured series of prompts that accomplish a complex task consistently.

### Workflow Design Framework

1. **Define the Goal** — What's the end result?
2. **Break Down Steps** — What are the individual tasks?
3. **Create Templates** — Standardize each prompt
4. **Build Checkpoints** — Where do you review/adjust?
5. **Document & Share** — Make it repeatable

### Example: Research Workflow

\`\`\`
Step 1: "Research [topic] and summarize the top 5 key findings"
Step 2: "For each finding, identify supporting evidence and counter-arguments"
Step 3: "Synthesize into a 500-word executive summary"
Step 4: "Generate 10 discussion questions based on the research"
Step 5: "Create an action plan with 3 recommendations"
\`\`\`

### Example: Product Launch Workflow

\`\`\`
Step 1: Market analysis and positioning
Step 2: Messaging and copy creation
Step 3: Launch timeline and checklist
Step 4: Social media campaign creation
Step 5: Email sequences for different segments
Step 6: FAQ and support documentation
\`\`\`

### Automation Tips

- Save your best prompts as templates
- Create a prompt library organized by task type
- Use Claude Projects for recurring workflows
- Build on what works, iterate what doesn't

> 🏆 **Final Project**: Design a complete workflow for a task in your professional life. Document each step with prompt templates and expected outputs.

**Congratulations!** You've completed the Claude Mastery course. You now have the skills to leverage Claude for virtually any task.`,
          },
        ],
      },
    ],
  },
  gemini: {
    title: "Gemini",
    emoji: "💎",
    description: "Unlock the power of Google's Gemini AI — multimodal capabilities, integrations, and advanced use cases.",
    totalLessons: 10,
    totalHours: 4,
    modules: [
      {
        id: "m1",
        title: "Gemini Fundamentals",
        lessons: [
          { id: "l1", title: "What is Gemini?", duration: "10 min", content: "## What is Gemini?\n\nGemini is Google's most capable AI model family, designed from the ground up to be multimodal — understanding text, images, audio, video, and code natively.\n\n### Key Features\n- **Multimodal Understanding**: Process different types of content simultaneously\n- **Google Integration**: Works seamlessly with Google Workspace\n- **Multiple Sizes**: Ultra, Pro, and Nano for different use cases\n- **Long Context**: Handle large amounts of information\n\nIn the next lesson, we'll compare Gemini with other AI models." },
          { id: "l2", title: "Gemini vs Other AI Models", duration: "12 min", content: "## Gemini vs Other AI Models\n\nUnderstand where Gemini excels compared to other AI assistants.\n\n### Strengths\n- Native multimodal capabilities\n- Deep Google ecosystem integration\n- Strong reasoning and coding abilities\n- Competitive pricing\n\n### Comparison\n| Feature | Gemini | Claude | ChatGPT |\n|---------|--------|--------|---------|\n| Multimodal | Native | Via vision | Via plugins |\n| Google Integration | Deep | None | Limited |\n| Context | 1M tokens | 200K | 128K |" },
          { id: "l3", title: "Multimodal Capabilities", duration: "18 min", content: "## Multimodal Capabilities\n\nExplore Gemini's ability to work with different types of content.\n\n### What Can Gemini Process?\n1. **Text** — Natural language understanding and generation\n2. **Images** — Analyze, describe, and reason about images\n3. **Code** — Write, debug, and explain code\n4. **Audio** — Transcribe and understand audio content\n5. **Video** — Analyze video content and extract insights\n\n### Practical Applications\n- Upload a photo and ask questions about it\n- Analyze charts and graphs\n- Debug code with screenshots of errors" },
        ],
      },
      {
        id: "m2",
        title: "Working with Gemini",
        lessons: [
          { id: "l4", title: "Text Generation Mastery", duration: "20 min", content: "## Text Generation with Gemini\n\nMaster text generation techniques specific to Gemini's strengths.\n\n### Tips\n- Leverage Google Search integration for factual content\n- Use structured prompts for consistent outputs\n- Take advantage of Gemini's reasoning capabilities" },
          { id: "l5", title: "Image Analysis with Gemini", duration: "22 min", content: "## Image Analysis with Gemini\n\nLearn to use Gemini's native image understanding capabilities.\n\n### What You Can Do\n- Describe images in detail\n- Extract text from photos (OCR)\n- Analyze charts and infographics\n- Compare multiple images\n- Generate creative descriptions" },
          { id: "l6", title: "Code Generation", duration: "25 min", content: "## Code Generation with Gemini\n\nUse Gemini as your coding companion.\n\n### Supported Languages\nPython, JavaScript, TypeScript, Java, C++, Go, Rust, and many more.\n\n### Best Practices\n- Provide clear specifications\n- Include example inputs/outputs\n- Ask for explanations alongside code\n- Request tests and documentation" },
        ],
      },
      {
        id: "m3",
        title: "Gemini Pro Tips",
        lessons: [
          { id: "l7", title: "Google Workspace Integration", duration: "15 min", content: "## Google Workspace Integration\n\nGemini integrates deeply with Google's productivity suite.\n\n### Available Integrations\n- **Gmail** — Draft, summarize, and reply to emails\n- **Docs** — Write, edit, and format documents\n- **Sheets** — Analyze data and create formulas\n- **Slides** — Generate presentations\n- **Meet** — Real-time meeting notes and summaries" },
          { id: "l8", title: "API Access & Automation", duration: "30 min", content: "## API Access & Automation\n\nLearn to use the Gemini API for building AI-powered applications.\n\n### Getting Started\n1. Get an API key from Google AI Studio\n2. Choose your model (Pro, Flash, etc.)\n3. Make your first API call\n4. Handle responses and streaming" },
          { id: "l9", title: "Building with Gemini API", duration: "28 min", content: "## Building with Gemini API\n\nCreate real applications powered by Gemini.\n\n### Project Ideas\n- Content analysis dashboard\n- Image description service\n- Automated report generator\n- Multimodal chatbot" },
          { id: "l10", title: "Real-World Projects", duration: "35 min", content: "## Real-World Projects\n\nApply everything you've learned in practical scenarios.\n\n### Final Projects\n1. Build a content analysis pipeline\n2. Create an automated research assistant\n3. Design a multimodal application\n\nCongratulations on completing the Gemini course! 🎉" },
        ],
      },
    ],
  },
  chatgpt: {
    title: "ChatGPT",
    emoji: "🧠",
    description: "Become a ChatGPT power user — from basics to GPTs, plugins, and professional workflows.",
    totalLessons: 13,
    totalHours: 6,
    modules: [
      {
        id: "m1",
        title: "ChatGPT Essentials",
        lessons: [
          { id: "l1", title: "Getting Started with ChatGPT", duration: "8 min", content: "## Getting Started with ChatGPT\n\nChatGPT by OpenAI is the world's most popular AI assistant. Let's get you set up.\n\n### Creating Your Account\n1. Visit chat.openai.com\n2. Sign up with email or Google/Microsoft\n3. Explore the interface\n4. Try your first prompt" },
          { id: "l2", title: "Understanding GPT Models", duration: "15 min", content: "## Understanding GPT Models\n\nLearn the differences between GPT model versions.\n\n### Model Comparison\n- **GPT-3.5** — Fast, good for simple tasks\n- **GPT-4** — More capable, better reasoning\n- **GPT-4 Turbo** — Faster GPT-4 with larger context\n- **GPT-4o** — Multimodal, fastest premium model" },
          { id: "l3", title: "Effective Prompting", duration: "20 min", content: "## Effective Prompting for ChatGPT\n\nLearn the fundamentals of getting great results.\n\n### Core Principles\n1. Be specific and clear\n2. Provide context\n3. Define the output format\n4. Iterate and refine" },
        ],
      },
      {
        id: "m2",
        title: "Intermediate Skills",
        lessons: [
          { id: "l4", title: "Custom Instructions", duration: "18 min", content: "## Custom Instructions\n\nSet persistent preferences that apply to all conversations.\n\n### How to Set Up\nGo to Settings → Custom Instructions and define:\n- What you want ChatGPT to know about you\n- How you want responses formatted" },
          { id: "l5", title: "Using GPT-4 Vision", duration: "22 min", content: "## Using GPT-4 Vision\n\nAnalyze images directly in ChatGPT.\n\n### Capabilities\n- Describe images\n- Read text from photos\n- Analyze charts\n- Debug UI screenshots" },
          { id: "l6", title: "Data Analysis with ChatGPT", duration: "25 min", content: "## Data Analysis with ChatGPT\n\nUpload files and analyze data directly.\n\n### Supported Formats\n- CSV, Excel files\n- PDF documents\n- Code files\n- Images and charts" },
          { id: "l7", title: "Writing & Editing", duration: "20 min", content: "## Writing & Editing\n\nUse ChatGPT as your writing partner.\n\n### Writing Workflows\n- Brainstorm → Outline → Draft → Edit\n- Style matching and tone adjustment\n- Grammar and clarity improvements" },
        ],
      },
      {
        id: "m3",
        title: "Advanced & Custom GPTs",
        lessons: [
          { id: "l8", title: "Building Custom GPTs", duration: "30 min", content: "## Building Custom GPTs\n\nCreate specialized AI assistants tailored to your needs.\n\n### Steps\n1. Go to GPT Builder\n2. Define the purpose\n3. Add instructions and knowledge\n4. Configure capabilities\n5. Publish and share" },
          { id: "l9", title: "API Integration", duration: "28 min", content: "## API Integration\n\nConnect ChatGPT to your applications via the OpenAI API.\n\n### Getting Started\n- Create an API key\n- Choose your model\n- Make completions requests\n- Handle streaming responses" },
          { id: "l10", title: "Plugins & Extensions", duration: "22 min", content: "## Plugins & Extensions\n\nExtend ChatGPT's capabilities with plugins.\n\n### Popular Plugins\n- Web browsing\n- Code interpreter\n- DALL-E image generation\n- Third-party integrations" },
          { id: "l11", title: "ChatGPT for Business", duration: "25 min", content: "## ChatGPT for Business\n\nLeverage ChatGPT in professional settings.\n\n### Use Cases\n- Customer support automation\n- Content creation at scale\n- Data analysis and reporting\n- Team productivity" },
          { id: "l12", title: "Automation Workflows", duration: "30 min", content: "## Automation Workflows\n\nBuild automated workflows using ChatGPT.\n\n### Tools\n- Zapier + ChatGPT\n- Make.com integrations\n- API-based automations\n- Custom scripts" },
          { id: "l13", title: "Final Project", duration: "45 min", content: "## Final Project\n\nPut everything together in a comprehensive project.\n\n### Your Challenge\nBuild a complete AI-powered workflow that:\n1. Takes input from a real source\n2. Processes it with ChatGPT\n3. Produces actionable output\n4. Can be repeated consistently\n\nCongratulations on completing the ChatGPT course! 🎉" },
        ],
      },
    ],
  },
  "jasper-ai": {
    title: "Jasper AI",
    emoji: "✍️",
    description: "Learn Jasper AI for content marketing — copywriting, brand voice, and campaign management.",
    totalLessons: 10,
    totalHours: 5,
    modules: [
      {
        id: "m1",
        title: "Jasper Basics",
        lessons: [
          { id: "l1", title: "Introduction to Jasper", duration: "10 min", content: "## Introduction to Jasper\n\nJasper is an AI content platform built for marketing teams and creators.\n\n### What Makes Jasper Different\n- Brand voice consistency\n- Marketing-focused templates\n- Team collaboration\n- Campaign management" },
          { id: "l2", title: "Setting Up Brand Voice", duration: "15 min", content: "## Setting Up Brand Voice\n\nTeach Jasper to write in your brand's unique voice.\n\n### Steps\n1. Define your brand personality\n2. Upload example content\n3. Set tone and style preferences\n4. Test and refine" },
          { id: "l3", title: "Templates Overview", duration: "12 min", content: "## Templates Overview\n\nExplore Jasper's library of content templates.\n\n### Categories\n- Blog posts\n- Social media\n- Ad copy\n- Email marketing\n- Product descriptions" },
        ],
      },
      {
        id: "m2",
        title: "Content Creation",
        lessons: [
          { id: "l4", title: "Blog Post Writing", duration: "25 min", content: "## Blog Post Writing with Jasper\n\nCreate full blog posts using Jasper's long-form editor.\n\n### Workflow\n1. Start with a brief\n2. Generate an outline\n3. Write section by section\n4. Edit and refine\n5. Optimize for SEO" },
          { id: "l5", title: "Social Media Content", duration: "20 min", content: "## Social Media Content\n\nGenerate engaging social media posts at scale.\n\n### Platforms\n- LinkedIn\n- Twitter/X\n- Instagram\n- Facebook\n- TikTok scripts" },
          { id: "l6", title: "Ad Copy Generation", duration: "18 min", content: "## Ad Copy Generation\n\nCreate high-converting ad copy with Jasper.\n\n### Frameworks\n- AIDA (Attention, Interest, Desire, Action)\n- PAS (Problem, Agitate, Solution)\n- Before-After-Bridge" },
          { id: "l7", title: "Email Marketing", duration: "22 min", content: "## Email Marketing\n\nCraft compelling email sequences with Jasper.\n\n### Types\n- Welcome sequences\n- Promotional campaigns\n- Newsletter content\n- Re-engagement emails" },
        ],
      },
      {
        id: "m3",
        title: "Advanced Jasper",
        lessons: [
          { id: "l8", title: "Jasper Chat & Commands", duration: "20 min", content: "## Jasper Chat & Commands\n\nUse Jasper's conversational interface for complex tasks.\n\n### Commands\n- /write — Generate content\n- /improve — Enhance existing text\n- /shorten — Make content concise\n- /expand — Add more detail" },
          { id: "l9", title: "Team Collaboration", duration: "15 min", content: "## Team Collaboration\n\nWork with your team in Jasper.\n\n### Features\n- Shared brand voice\n- Content approval workflows\n- Team templates\n- Usage analytics" },
          { id: "l10", title: "Campaign Workflows", duration: "30 min", content: "## Campaign Workflows\n\nBuild end-to-end marketing campaigns.\n\n### Complete Campaign\n1. Strategy and messaging\n2. Landing page copy\n3. Email sequence\n4. Social media content\n5. Ad variations\n\nCongratulations on completing the Jasper AI course! 🎉" },
        ],
      },
    ],
  },
  "stable-diffusion": {
    title: "Stable Diffusion",
    emoji: "🎨",
    description: "Create stunning AI art with Stable Diffusion — prompting, models, and creative workflows.",
    totalLessons: 10,
    totalHours: 4,
    modules: [
      {
        id: "m1",
        title: "AI Art Fundamentals",
        lessons: [
          { id: "l1", title: "What is Stable Diffusion?", duration: "10 min", content: "## What is Stable Diffusion?\n\nStable Diffusion is an open-source AI image generation model.\n\n### Why Stable Diffusion?\n- Free and open-source\n- Run locally on your computer\n- Highly customizable\n- Massive community and model library" },
          { id: "l2", title: "Installation & Setup", duration: "20 min", content: "## Installation & Setup\n\nGet Stable Diffusion running on your machine.\n\n### Options\n1. **Automatic1111** — Most popular web UI\n2. **ComfyUI** — Node-based workflow\n3. **Cloud Services** — Run in the browser\n\n### System Requirements\n- GPU with 6GB+ VRAM (recommended)\n- 16GB RAM minimum\n- 50GB free disk space" },
          { id: "l3", title: "Your First Image", duration: "15 min", content: "## Your First Image\n\nGenerate your first AI image.\n\n### Quick Start\n1. Open the web UI\n2. Enter a prompt\n3. Set basic parameters\n4. Click Generate\n5. Iterate and improve" },
        ],
      },
      {
        id: "m2",
        title: "Prompt Crafting",
        lessons: [
          { id: "l4", title: "Positive & Negative Prompts", duration: "22 min", content: "## Positive & Negative Prompts\n\nMaster the art of describing what you want — and don't want.\n\n### Positive Prompts\nDescribe the image you want to create.\n\n### Negative Prompts\nDescribe what to avoid: blurry, low quality, distorted, etc." },
          { id: "l5", title: "Style Keywords & Modifiers", duration: "18 min", content: "## Style Keywords & Modifiers\n\nUse keywords to control artistic style.\n\n### Categories\n- Art styles: oil painting, watercolor, digital art\n- Photography: DSLR, 35mm, bokeh\n- Lighting: dramatic, soft, golden hour\n- Quality: masterpiece, highly detailed, 8K" },
          { id: "l6", title: "Aspect Ratios & Resolution", duration: "15 min", content: "## Aspect Ratios & Resolution\n\nChoose the right dimensions for your output.\n\n### Common Ratios\n- 1:1 (512x512) — Social media\n- 16:9 — Wallpapers and banners\n- 2:3 — Portraits\n- 3:2 — Landscapes" },
        ],
      },
      {
        id: "m3",
        title: "Advanced Generation",
        lessons: [
          { id: "l7", title: "ControlNet & img2img", duration: "30 min", content: "## ControlNet & img2img\n\nGuide image generation with reference images.\n\n### ControlNet\n- Edge detection\n- Pose estimation\n- Depth maps\n- Segmentation\n\n### img2img\n- Transform existing images\n- Style transfer\n- Variations of images" },
          { id: "l8", title: "LoRA & Model Fine-Tuning", duration: "35 min", content: "## LoRA & Model Fine-Tuning\n\nCustomize models for specific styles or subjects.\n\n### What is LoRA?\nLow-Rank Adaptation — small files that modify the base model.\n\n### Finding LoRAs\n- Civitai.com\n- Hugging Face\n- Community forums" },
          { id: "l9", title: "Inpainting & Outpainting", duration: "25 min", content: "## Inpainting & Outpainting\n\nEdit specific parts of images or expand them.\n\n### Inpainting\nReplace or modify selected areas of an image.\n\n### Outpainting\nExtend an image beyond its original borders." },
          { id: "l10", title: "Creative Portfolio Project", duration: "40 min", content: "## Creative Portfolio Project\n\nCreate a cohesive portfolio showcasing your AI art skills.\n\n### Project Requirements\n1. 5 images in a consistent style\n2. Use at least 3 advanced techniques\n3. Document your prompts and settings\n4. Present your creative process\n\nCongratulations on completing the Stable Diffusion course! 🎉" },
        ],
      },
    ],
  },
};

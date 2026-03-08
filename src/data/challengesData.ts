export interface ChallengeDay {
  day: number;
  title: string;
  description: string;
  content: string;
  task: string;
  duration: string;
}

export interface ChallengeData {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  participants: string;
  emoji: string;
  tags: string[];
  days: ChallengeDay[];
}

export const challengesData: Record<string, ChallengeData> = {
  "28-day-ai": {
    id: "28-day-ai",
    title: "2026 28-Day AI Challenge",
    description: "Master essential AI tools and techniques over 28 days. Perfect for beginners looking to build a strong foundation.",
    duration: "28 days",
    level: "Beginner",
    participants: "12.4K",
    emoji: "🚀",
    tags: ["AI Skills", "Business Growth", "Boost Productivity", "Save Time", "Advance Career"],
    days: [
      {
        day: 1, title: "Introduction to AI", description: "Understand what AI is and why it matters today.",
        duration: "15 min",
        task: "Write down 3 ways AI could improve your daily workflow.",
        content: `# Day 1: Introduction to AI\n\nWelcome to the 28-Day AI Challenge! 🚀\n\n## What is AI?\n\nArtificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence — such as understanding language, recognizing images, making decisions, and generating content.\n\n## Why Does AI Matter Now?\n\n- **Accessibility**: Tools like ChatGPT, Claude, and Gemini have made AI available to everyone\n- **Productivity**: AI can automate repetitive tasks, saving hours per week\n- **Creativity**: AI assists in brainstorming, writing, design, and more\n- **Career Growth**: AI literacy is becoming essential in every field\n\n## Types of AI You'll Encounter\n\n| Type | Examples | Use Case |\n|------|----------|----------|\n| Text Generation | ChatGPT, Claude | Writing, analysis, coding |\n| Image Generation | DALL-E, Midjourney | Design, marketing |\n| Audio AI | ElevenLabs, Whisper | Voice, transcription |\n| Video AI | Runway, Sora | Video editing, creation |\n\n## Key Takeaway\n\nAI is not here to replace you — it's here to **amplify** your abilities. The people who learn to work with AI effectively will have a massive advantage.\n\n> "The real risk isn't that AI will replace humans. It's that humans using AI will replace humans who don't." — Unknown`
      },
      {
        day: 2, title: "Setting Up Your AI Toolkit", description: "Create accounts and get familiar with top AI tools.",
        duration: "20 min",
        task: "Sign up for at least 2 AI tools and send your first prompt to each.",
        content: `# Day 2: Setting Up Your AI Toolkit\n\n## Your Essential AI Toolkit\n\nToday we'll set up the core tools you'll use throughout this challenge.\n\n### 🔤 Text AI (Pick at least one)\n1. **ChatGPT** (chat.openai.com) — The most popular AI assistant\n2. **Claude** (claude.ai) — Great for long documents and nuanced tasks\n3. **Gemini** (gemini.google.com) — Google's AI, great for research\n\n### 🎨 Image AI\n1. **DALL-E** (Built into ChatGPT Plus)\n2. **Ideogram** (ideogram.ai) — Free, great with text in images\n\n### 📝 Writing AI\n1. **Grammarly** — AI-powered writing assistant\n2. **Notion AI** — AI integrated into your notes\n\n## Your First Prompt\n\nTry this in any text AI:\n\n\`\`\`\nI'm starting a 28-day AI challenge. I work as a [your job]. \nSuggest 5 specific ways AI could help me in my role, \nranked from easiest to implement to most advanced.\n\`\`\`\n\n## Tips for Getting Started\n- Start with free tiers — they're powerful enough\n- Don't worry about perfect prompts yet (we'll cover that!)\n- Experiment freely — you can't break anything\n\n> 💡 **Pro tip**: Bookmark your AI tools for quick access. You'll be using them daily!`
      },
      {
        day: 3, title: "The Art of Prompting", description: "Learn how to write effective prompts that get great results.",
        duration: "20 min",
        task: "Rewrite a basic prompt using the CRAFT framework and compare the results.",
        content: `# Day 3: The Art of Prompting\n\n## Why Prompts Matter\n\nThe quality of AI output is directly tied to the quality of your input. A vague prompt gives vague results. A specific prompt gives specific, useful results.\n\n## The CRAFT Framework\n\n| Letter | Meaning | Example |\n|--------|---------|----------|\n| **C** | Context | "I'm a marketing manager at a SaaS startup" |\n| **R** | Role | "Act as an expert copywriter" |\n| **A** | Action | "Write 5 email subject lines" |\n| **F** | Format | "Present as a numbered list with emoji" |\n| **T** | Tone | "Professional but friendly" |\n\n## Example: Before & After\n\n### ❌ Bad Prompt\n> "Write an email"\n\n### ✅ Good Prompt (Using CRAFT)\n> "I'm a marketing manager at a SaaS startup (Context). Act as an expert email copywriter (Role). Write 5 subject lines for a product launch email (Action). Present them as a numbered list with predicted open rates (Format). Keep the tone exciting but professional (Tone)."\n\n## Practice Exercise\n\nTake this basic prompt and improve it using CRAFT:\n> "Help me with my resume"\n\nTry your improved version in an AI tool and see the difference!\n\n> 🎯 **Remember**: You don't need all 5 elements every time. Even adding 2-3 dramatically improves results.`
      },
      {
        day: 4, title: "AI for Writing & Content", description: "Use AI to draft, edit, and improve written content.",
        duration: "20 min",
        task: "Use AI to write and refine a LinkedIn post or blog introduction.",
        content: `# Day 4: AI for Writing & Content\n\n## AI as Your Writing Partner\n\nAI excels at helping with every stage of writing:\n- **Brainstorming** — Generate ideas and angles\n- **Drafting** — Create first drafts quickly\n- **Editing** — Improve clarity, grammar, tone\n- **Repurposing** — Transform content across formats\n\n## Writing Workflows\n\n### 1. The Brainstorm → Draft → Refine Loop\n\`\`\`\nStep 1: "Give me 10 angles for a blog post about [topic]"\nStep 2: "Write a draft using angle #3, targeting [audience]"\nStep 3: "Make it more conversational and add a compelling hook"\n\`\`\`\n\n### 2. The Repurposing Chain\n\`\`\`\nBlog post → LinkedIn post → Twitter thread → Email newsletter\n\`\`\`\n\n## Prompt Templates for Writers\n\n**For blog intros:**\n> "Write a compelling introduction for a blog post about [topic]. Hook the reader with a surprising statistic or question. Target audience: [audience]. Tone: [tone]. Keep it under 100 words."\n\n**For editing:**\n> "Review this text for clarity, grammar, and engagement. Suggest improvements but keep my voice: [paste text]"\n\n## Important: The Human Touch\n\n- Always review and edit AI output\n- Add your personal experiences and opinions\n- Fact-check any statistics or claims\n- Make it sound like YOU, not a robot`
      },
      {
        day: 5, title: "AI for Email Mastery", description: "Write better emails faster with AI assistance.",
        duration: "15 min",
        task: "Draft 3 different professional emails using AI (cold outreach, follow-up, thank you).",
        content: `# Day 5: AI for Email Mastery\n\n## Transform Your Email Game\n\nThe average professional spends **2.5 hours per day** on email. AI can cut that in half.\n\n## Email Prompt Templates\n\n### Cold Outreach\n\`\`\`\nWrite a cold outreach email to [person/company] about [purpose].\nKeep it under 150 words. Include a specific compliment about \ntheir recent [work/achievement]. End with a clear, low-commitment \ncall to action.\n\`\`\`\n\n### Follow-Up\n\`\`\`\nWrite a polite follow-up email. Context: I sent [original email \npurpose] [time ago] and haven't heard back. Keep it brief, \nadd new value, and suggest a specific next step.\n\`\`\`\n\n### Difficult Conversations\n\`\`\`\nHelp me write a professional email addressing [situation]. \nI need to be firm but diplomatic. The goal is [desired outcome]. \nAvoid being passive-aggressive.\n\`\`\`\n\n## Pro Tips\n- Always personalize AI-drafted emails\n- Read them aloud before sending\n- Adjust formality based on your relationship\n- Use AI to handle the first draft, then add your personality`
      },
      {
        day: 6, title: "AI Image Generation Basics", description: "Create stunning visuals using AI image generators.",
        duration: "20 min",
        task: "Generate 5 images with different styles and compare prompt techniques.",
        content: `# Day 6: AI Image Generation Basics\n\n## Creating Images with AI\n\nAI image generation has revolutionized visual content creation. You don't need design skills to create professional visuals.\n\n## Key Tools\n- **DALL-E 3** (via ChatGPT) — Great for illustrations and concepts\n- **Midjourney** — Stunning artistic quality\n- **Ideogram** — Best for text-in-images\n- **Leonardo AI** — Versatile, good free tier\n\n## Anatomy of a Good Image Prompt\n\n\`\`\`\n[Subject] + [Style] + [Mood/Lighting] + [Composition] + [Details]\n\`\`\`\n\n### Example:\n> "A cozy coffee shop interior, watercolor illustration style, warm golden lighting, wide angle view, with plants on the windowsill and steam rising from a cup"\n\n## Style Keywords That Work\n\n| Category | Keywords |\n|----------|----------|\n| Photography | cinematic, editorial, portrait, macro |\n| Art | watercolor, oil painting, digital art, minimalist |\n| Design | flat design, isometric, 3D render, infographic |\n| Mood | dramatic, ethereal, vibrant, moody, peaceful |\n\n## Common Mistakes\n- ❌ Too vague: "a nice picture"\n- ❌ Too many subjects: cramming everything in\n- ✅ Specific but focused: one clear subject with style details`
      },
      {
        day: 7, title: "Week 1 Review & Practice", description: "Consolidate your learning and practice what you've learned.",
        duration: "25 min",
        task: "Complete the Week 1 mini-project: Create a complete LinkedIn post with AI-generated text AND image.",
        content: `# Day 7: Week 1 Review & Mini-Project 🎉\n\nCongratulations on completing your first week! Let's review and put it all together.\n\n## Week 1 Recap\n\n✅ **Day 1**: What AI is and why it matters\n✅ **Day 2**: Set up your AI toolkit\n✅ **Day 3**: The CRAFT prompting framework\n✅ **Day 4**: AI for writing and content\n✅ **Day 5**: AI for email mastery\n✅ **Day 6**: AI image generation\n\n## 🏆 Mini-Project: Create a LinkedIn Post\n\nCombine everything you've learned:\n\n1. **Brainstorm**: Ask AI for 5 post ideas about AI in your industry\n2. **Draft**: Use CRAFT to write a compelling post\n3. **Visual**: Generate a matching image\n4. **Edit**: Refine with your personal voice\n5. **Polish**: Use AI to check grammar and impact\n\n## Reflection Questions\n- Which AI tool has been most useful so far?\n- What surprised you about AI capabilities?\n- Where do you see the biggest opportunity for AI in your work?\n\n> 🔥 **Challenge bonus**: Actually post your creation on LinkedIn and tag it #28DayAIChallenge!`
      },
      {
        day: 8, title: "AI for Research & Analysis", description: "Use AI to accelerate research and analyze information.",
        duration: "20 min",
        task: "Use AI to research a topic and create a summary brief.",
        content: `# Day 8: AI for Research & Analysis\n\n## Supercharge Your Research\n\nAI can help you gather, synthesize, and understand information faster than ever.\n\n## Research Techniques\n\n### 1. Deep Dive Prompting\n\`\`\`\nGive me a comprehensive overview of [topic]. Include:\n- Key concepts and definitions\n- Current trends (2025-2026)\n- Major players/companies\n- Pros and cons\n- Future predictions\nCite specific examples where possible.\n\`\`\`\n\n### 2. Comparative Analysis\n\`\`\`\nCompare [Option A] vs [Option B] for [use case].\nCreate a comparison table with these criteria:\n- Price, Ease of use, Features, Best for\nInclude a final recommendation with reasoning.\n\`\`\`\n\n### 3. Summarizing Long Documents\n\`\`\`\nSummarize this [article/report] in:\n1. A one-sentence TL;DR\n2. 5 key bullet points\n3. Action items I should take based on this\n[Paste content]\n\`\`\`\n\n## Important Caveats\n- AI can have outdated information\n- Always verify critical facts from primary sources\n- Use AI as a starting point, not the final word\n- Cross-reference with multiple sources`
      },
      {
        day: 9, title: "AI for Data & Spreadsheets", description: "Let AI help you work with data, formulas, and analysis.",
        duration: "20 min",
        task: "Use AI to create a spreadsheet formula or analyze a dataset.",
        content: `# Day 9: AI for Data & Spreadsheets\n\n## AI Meets Your Spreadsheets\n\nNever struggle with Excel formulas again. AI can write formulas, analyze data, and create insights.\n\n## Formula Generation\n\n### Ask AI for Formulas\n\`\`\`\nWrite an Excel formula that:\n- Looks up a value in column A\n- Returns the corresponding value from column C\n- If not found, returns "N/A"\nExplain how the formula works step by step.\n\`\`\`\n\n## Data Analysis Prompts\n\n### Quick Analysis\n\`\`\`\nHere is my sales data: [paste data]\n\nAnalyze this data and tell me:\n1. Top 3 trends\n2. Anomalies or concerning patterns\n3. Recommendations for improvement\nPresent findings with specific numbers.\n\`\`\`\n\n### Creating Charts\n\`\`\`\nBased on this data, recommend:\n- The best chart type to visualize the trend\n- What to put on each axis\n- Key insights to highlight\n- A title that tells the story\n\`\`\`\n\n## Tools That Help\n- **ChatGPT Code Interpreter** — Upload CSVs directly\n- **Google Sheets AI** — Built-in AI features\n- **Julius AI** — Specialized data analysis AI\n\n> 💡 **Tip**: When sharing data with AI, remove any sensitive or personal information first!`
      },
      {
        day: 10, title: "AI for Presentations", description: "Create compelling presentations with AI assistance.",
        duration: "20 min",
        task: "Create a 5-slide presentation outline using AI, then build one slide.",
        content: `# Day 10: AI for Presentations\n\n## Build Better Decks, Faster\n\n## AI Presentation Workflow\n\n### Step 1: Structure\n\`\`\`\nCreate an outline for a [X]-slide presentation about [topic].\nAudience: [who]\nGoal: [inform/persuade/inspire]\nTime limit: [X] minutes\nInclude speaker notes for each slide.\n\`\`\`\n\n### Step 2: Content\n\`\`\`\nFor slide [N] about [topic], write:\n- A compelling headline (max 8 words)\n- 3-4 bullet points (max 10 words each)\n- Speaker notes (2-3 sentences)\n- Suggestion for a visual element\n\`\`\`\n\n### Step 3: Visuals\nUse AI image generation for:\n- Custom illustrations\n- Background images\n- Icons and diagrams\n\n## Presentation AI Tools\n- **Gamma.app** — AI generates full presentations\n- **Beautiful.ai** — Smart design assistance\n- **Canva AI** — Templates with AI features\n- **SlidesAI** — Google Slides plugin\n\n## Design Tips from AI\n- One idea per slide\n- Less text, more visuals\n- Use contrast for emphasis\n- Consistent style throughout`
      },
      {
        day: 11, title: "AI for Social Media", description: "Create engaging social media content with AI.",
        duration: "20 min",
        task: "Create a week's worth of social media posts for one platform.",
        content: `# Day 11: AI for Social Media\n\n## Content Creation at Scale\n\n## Platform-Specific Prompts\n\n### LinkedIn\n\`\`\`\nWrite a LinkedIn post about [topic] that:\n- Starts with a hook (first line is crucial)\n- Shares a personal insight or story\n- Provides actionable value\n- Ends with a question for engagement\n- Uses line breaks for readability\n- Under 200 words\n\`\`\`\n\n### Twitter/X\n\`\`\`\nWrite a thread (5-7 tweets) about [topic].\nTweet 1: Hook that stops the scroll\nTweets 2-6: One insight per tweet, with examples\nFinal tweet: Summary + CTA\nKeep each under 280 characters.\n\`\`\`\n\n### Instagram\n\`\`\`\nWrite an Instagram caption for a [type of post] about [topic].\nInclude:\n- Attention-grabbing first line\n- Value-packed body\n- Call to action\n- 5-10 relevant hashtags\n\`\`\`\n\n## Content Calendar Hack\n\`\`\`\nCreate a 7-day social media content calendar for [platform].\nTheme: [your niche/industry]\nMix of: educational, entertaining, personal, promotional\nInclude post type, topic, and caption for each day.\n\`\`\`\n\n## Remember\n- Authenticity > perfection\n- Edit AI content to match your voice\n- Engage with comments personally`
      },
      {
        day: 12, title: "AI for Meeting Productivity", description: "Use AI to prepare for, run, and follow up on meetings.",
        duration: "15 min",
        task: "Use AI to prepare an agenda and follow-up email for your next meeting.",
        content: `# Day 12: AI for Meeting Productivity\n\n## Before, During & After Meetings\n\n### Before: Preparation\n\`\`\`\nI have a meeting about [topic] with [who].\nHelp me prepare:\n1. Key talking points (5 max)\n2. Questions I should ask\n3. Potential objections and responses\n4. Desired outcomes\n5. A concise agenda\n\`\`\`\n\n### During: Note-Taking\nUse AI transcription tools:\n- **Otter.ai** — Real-time transcription\n- **Fireflies.ai** — Meeting recorder\n- **tl;dv** — AI meeting notes\n\n### After: Follow-Up\n\`\`\`\nBased on these meeting notes, create:\n1. A summary (3-5 bullet points)\n2. Action items with owners and deadlines\n3. A professional follow-up email to attendees\n4. Key decisions that were made\n[Paste notes]\n\`\`\`\n\n## Meeting Reduction Prompt\n\`\`\`\nReview my calendar for this week: [describe meetings]\nWhich meetings could be:\n- Replaced by an async update?\n- Combined with another meeting?\n- Shortened from 60 to 30 minutes?\nSuggest a more efficient schedule.\n\`\`\`\n\n> 💡 **Goal**: Use AI to spend less TIME in meetings while getting MORE out of them.`
      },
      {
        day: 13, title: "AI for Learning & Skill Building", description: "Use AI as your personal tutor for any subject.",
        duration: "20 min",
        task: "Ask AI to teach you a new concept using the Feynman technique.",
        content: `# Day 13: AI for Learning & Skill Building\n\n## Your Personal AI Tutor\n\nAI is the most patient, available, and knowledgeable tutor you'll ever have.\n\n## Learning Techniques\n\n### The Feynman Technique with AI\n\`\`\`\nExplain [complex topic] as if I'm a 12-year-old.\nUse simple analogies and examples.\nThen give me 3 questions to test my understanding.\n\`\`\`\n\n### Socratic Learning\n\`\`\`\nI want to learn about [topic]. Instead of explaining directly,\nask me guiding questions that help me discover the answers myself.\nStart with the basics and increase difficulty.\nCorrect my misunderstandings gently.\n\`\`\`\n\n### Structured Learning Path\n\`\`\`\nCreate a 2-week learning plan for [skill].\nI can dedicate [X] hours per day.\nI'm currently at [beginner/intermediate] level.\nInclude:\n- Daily topics and resources\n- Practice exercises\n- Milestones to track progress\n\`\`\`\n\n### Practice & Testing\n\`\`\`\nQuiz me on [topic] with 10 questions.\nMix of:\n- Multiple choice (easy)\n- Short answer (medium)\n- Scenario-based (hard)\nGive feedback after each answer.\n\`\`\`\n\n> 🧠 **Key insight**: The best way to learn with AI is **interactive**. Don't just read — ask questions, test yourself, and explain back.`
      },
      {
        day: 14, title: "Week 2 Review: AI Productivity Audit", description: "Assess your AI usage and identify your biggest wins.",
        duration: "25 min",
        task: "Complete the AI Productivity Audit and create your personal AI workflow map.",
        content: `# Day 14: Week 2 Review — AI Productivity Audit 📊\n\nHalfway there! Let's measure your progress and optimize.\n\n## Your AI Productivity Audit\n\nRate yourself (1-5) on using AI for:\n\n| Area | Before Challenge | Now |\n|------|:---:|:---:|\n| Writing & Content | ? | ? |\n| Email | ? | ? |\n| Research | ? | ? |\n| Data & Spreadsheets | ? | ? |\n| Presentations | ? | ? |\n| Social Media | ? | ? |\n| Meetings | ? | ? |\n| Learning | ? | ? |\n\n## 🏆 Mini-Project: Personal AI Workflow\n\nCreate your custom AI workflow:\n\n\`\`\`\nHelp me map out my ideal AI-assisted workflow.\nMy role: [your job]\nMy daily tasks: [list main tasks]\nTools I'm using: [list AI tools]\n\nCreate a daily schedule showing where and how to \nintegrate AI into each task for maximum efficiency.\n\`\`\`\n\n## Reflection\n- What's been your biggest AI time-saver?\n- Which technique do you use most?\n- Where are you still struggling?\n\n## Week 3 Preview\nNext week we go deeper: coding, automation, business strategy, and advanced techniques! 🚀`
      },
      {
        day: 15, title: "AI for Coding (No Experience Needed)", description: "Use AI to write, understand, and debug code.",
        duration: "20 min",
        task: "Ask AI to create a simple script that automates something in your workflow.",
        content: `# Day 15: AI for Coding\n\n## Code Without Being a Coder\n\nYou don't need a CS degree. AI can write, explain, and debug code for you.\n\n## Getting Started\n\n### Generate Code\n\`\`\`\nWrite a Python script that:\n- Reads a CSV file of contacts\n- Filters for contacts in [city]\n- Creates a new CSV with just those contacts\nInclude comments explaining each step.\nAssume I'm a complete beginner.\n\`\`\`\n\n### Understand Code\n\`\`\`\nExplain this code line by line as if I'm a beginner:\n[paste code]\nWhat does it do? How could it be improved?\n\`\`\`\n\n### Debug Code\n\`\`\`\nThis code gives me an error: [paste error]\nHere's the code: [paste code]\nExplain what's wrong and how to fix it.\n\`\`\`\n\n## Practical Non-Coder Projects\n- Rename bulk files automatically\n- Create a simple web scraper\n- Build a personal budget tracker\n- Automate email sorting rules\n\n## Best AI Coding Tools\n- **ChatGPT / Claude** — General coding help\n- **GitHub Copilot** — In-editor AI assistant\n- **Replit AI** — Code + run in browser\n- **Cursor** — AI-first code editor`
      },
      {
        day: 16, title: "AI Automation Basics", description: "Connect AI tools to automate repetitive tasks.",
        duration: "20 min",
        task: "Set up one simple automation using AI (e.g., auto-summarize emails).",
        content: `# Day 16: AI Automation Basics\n\n## Work Smarter with Automation\n\n## The Automation Stack\n\n### No-Code Automation Tools\n- **Zapier** — Connect 5000+ apps with AI\n- **Make.com** — Visual automation builder\n- **n8n** — Open-source alternative\n- **IFTTT** — Simple if-this-then-that\n\n## Starter Automations\n\n### 1. Email → Summary\n\`\`\`\nTrigger: New email received\nAction: AI summarizes key points\nResult: Summary sent to Slack/Notes\n\`\`\`\n\n### 2. Meeting → Notes\n\`\`\`\nTrigger: Meeting recording saved\nAction: AI transcribes and extracts action items\nResult: Notes sent to all attendees\n\`\`\`\n\n### 3. Content → Multi-Platform\n\`\`\`\nTrigger: New blog post published\nAction: AI creates LinkedIn, Twitter, newsletter versions\nResult: Drafts saved for review\n\`\`\`\n\n## How to Think About Automation\n\nAsk yourself:\n1. Do I do this task more than 3x/week?\n2. Does it follow a predictable pattern?\n3. Could someone else do it with clear instructions?\n\nIf yes to all three → **automate it!**\n\n> ⏰ **Time investment**: 30 min setup → hours saved per week`
      },
      {
        day: 17, title: "AI for Business Strategy", description: "Use AI as your strategic thinking partner.",
        duration: "20 min",
        task: "Run a SWOT analysis on your business or career using AI.",
        content: `# Day 17: AI for Business Strategy\n\n## Your AI Strategy Consultant\n\n## Strategic Frameworks with AI\n\n### SWOT Analysis\n\`\`\`\nAct as a business strategist. Run a SWOT analysis for:\nBusiness/Role: [describe]\nIndustry: [industry]\nGoal: [what you're trying to achieve]\n\nBe specific and actionable. Prioritize items by impact.\n\`\`\`\n\n### Competitive Analysis\n\`\`\`\nAnalyze the competitive landscape for [industry/product].\nIdentify:\n- Top 5 competitors and their positioning\n- Market gaps and opportunities\n- Emerging trends that could disrupt the market\n- Recommended differentiation strategy\n\`\`\`\n\n### Business Model Canvas\n\`\`\`\nHelp me fill out a Business Model Canvas for [idea].\nFor each section, provide:\n- Current state\n- Opportunities for improvement\n- AI-powered enhancements\n\`\`\`\n\n### Decision Making\n\`\`\`\nI need to decide between [Option A] and [Option B].\nContext: [situation]\nCriteria that matter most: [list]\n\nAnalyze both options using a weighted decision matrix.\nInclude risks and second-order effects.\n\`\`\`\n\n> 🎯 **Remember**: AI gives you frameworks and analysis. The final strategic decisions are always yours.`
      },
      {
        day: 18, title: "AI for Customer Service", description: "Use AI to improve customer interactions and support.",
        duration: "15 min",
        task: "Create 5 customer service response templates using AI.",
        content: `# Day 18: AI for Customer Service\n\n## Elevate Your Customer Experience\n\n## Response Templates\n\n### Happy Customer\n\`\`\`\nWrite a response to a positive review that:\n- Thanks them specifically for what they mentioned\n- Reinforces the positive experience\n- Subtly encourages referrals\n- Feels personal, not corporate\n\`\`\`\n\n### Complaint Handling\n\`\`\`\nA customer is upset about [issue]. Write a response that:\n- Acknowledges their frustration without being defensive\n- Takes responsibility\n- Offers a specific solution\n- Goes above and beyond expectations\nTone: empathetic, professional, solution-oriented\n\`\`\`\n\n### FAQ Generation\n\`\`\`\nBased on these common questions from our customers:\n[list questions]\n\nCreate comprehensive FAQ answers that:\n- Are clear and jargon-free\n- Include step-by-step instructions where needed\n- Anticipate follow-up questions\n- Link to relevant resources\n\`\`\`\n\n## AI Customer Service Tools\n- **Intercom Fin** — AI customer support agent\n- **Zendesk AI** — Smart ticket routing\n- **Freshdesk AI** — Automated responses\n- **Tidio** — AI chatbot builder`
      },
      {
        day: 19, title: "AI for Personal Branding", description: "Build and grow your personal brand with AI assistance.",
        duration: "20 min",
        task: "Create your personal brand statement and content pillars with AI.",
        content: `# Day 19: AI for Personal Branding\n\n## Build Your Brand with AI\n\n## Define Your Brand\n\n\`\`\`\nHelp me define my personal brand:\n- Current role: [job]\n- Industry: [industry]\n- Unique skills: [list]\n- Passions: [list]\n- Target audience: [who I want to reach]\n\nCreate:\n1. A one-sentence brand statement\n2. 3-4 content pillars (topics I should be known for)\n3. A unique angle that differentiates me\n4. Recommended platforms to focus on\n\`\`\`\n\n## Content Pillar Development\n\n\`\`\`\nFor my content pillar "[pillar topic]", generate:\n- 10 post ideas for LinkedIn\n- 5 long-form content ideas (blog/video)\n- 3 controversial/hot takes to spark discussion\n- 2 personal story angles\n\`\`\`\n\n## Bio Generator\n\`\`\`\nWrite 3 versions of my professional bio:\n1. Short (1 sentence, for Twitter/X)\n2. Medium (3 sentences, for LinkedIn)\n3. Long (1 paragraph, for speaking/about page)\n\nBased on: [your background and achievements]\nTone: confident but approachable\n\`\`\`\n\n> 🌟 **Key**: Your brand is built on consistency. Use AI to maintain a regular content schedule.`
      },
      {
        day: 20, title: "AI for Project Management", description: "Manage projects more effectively with AI assistance.",
        duration: "15 min",
        task: "Use AI to break down a current project into tasks with timeline.",
        content: `# Day 20: AI for Project Management\n\n## Manage Projects Like a Pro\n\n## Project Planning\n\n### Break Down a Project\n\`\`\`\nI need to [project goal] by [deadline].\nTeam size: [number]\nBudget: [amount]\n\nCreate a project plan with:\n1. Major milestones and dates\n2. Task breakdown with estimated hours\n3. Dependencies between tasks\n4. Risk factors and mitigation plans\n5. Weekly checkpoints\n\`\`\`\n\n### Status Updates\n\`\`\`\nBased on these project updates:\n[paste notes/status]\n\nCreate a concise status report with:\n- Progress summary (1-2 sentences)\n- Completed this week\n- In progress\n- Blockers/risks\n- Next week priorities\nFormat for [audience: team/management/client]\n\`\`\`\n\n### Retrospective\n\`\`\`\nFacilitate a project retrospective:\nProject: [name]\nOutcome: [success/partial/failure]\n\nGuide me through:\n- What went well\n- What didn't go well\n- What we'd do differently\n- Action items for next project\n\`\`\`\n\n## AI PM Tools\n- **ClickUp AI** — Built-in project AI\n- **Notion AI** — Smart project docs\n- **Monday.com AI** — Workflow automation\n- **Linear** — AI-powered issue tracking`
      },
      {
        day: 21, title: "Week 3 Review: Advanced Skills", description: "Review advanced AI techniques and build a complex workflow.",
        duration: "25 min",
        task: "Create a multi-step AI workflow that combines at least 3 techniques from this week.",
        content: `# Day 21: Week 3 Review — Advanced Skills 💪\n\nThree weeks done! You're now an intermediate AI user.\n\n## Week 3 Recap\n\n✅ **Day 15**: AI for coding\n✅ **Day 16**: Automation basics\n✅ **Day 17**: Business strategy\n✅ **Day 18**: Customer service\n✅ **Day 19**: Personal branding\n✅ **Day 20**: Project management\n\n## 🏆 Mini-Project: Multi-Step AI Workflow\n\nCombine at least 3 skills:\n\n**Example workflow: Product Launch**\n1. **Strategy** (Day 17): AI SWOT analysis for launch\n2. **Content** (Day 11): AI-generated launch content\n3. **Email** (Day 5): AI-crafted launch emails\n4. **Automation** (Day 16): Auto-distribute across channels\n5. **PM** (Day 20): AI project timeline\n\n## Your Skills Assessment\n\n| Skill | Confidence (1-5) |\n|-------|:-:|\n| Prompting | ? |\n| Content Creation | ? |\n| Research & Analysis | ? |\n| Coding/Automation | ? |\n| Strategic Thinking | ? |\n| Communication | ? |\n\n## Week 4 Preview\nThe final week: AI ethics, future trends, building AI businesses, and your capstone project! 🎓`
      },
      {
        day: 22, title: "AI Ethics & Responsible Use", description: "Understand the ethical implications of AI usage.",
        duration: "20 min",
        task: "Write a personal AI ethics checklist for your work.",
        content: `# Day 22: AI Ethics & Responsible Use\n\n## Using AI Responsibly\n\nWith great power comes great responsibility. Let's discuss ethical AI usage.\n\n## Key Ethical Considerations\n\n### 1. Transparency\n- Disclose when content is AI-generated (when appropriate)\n- Don't pass off AI work as entirely your own in academic/professional settings where it matters\n- Be honest about your use of AI tools\n\n### 2. Bias Awareness\n- AI models can reflect biases in training data\n- Always review AI output for bias (gender, race, cultural)\n- Use diverse perspectives to check AI recommendations\n\n### 3. Privacy & Data\n- Don't share sensitive personal data with AI\n- Understand data retention policies of AI tools\n- Be cautious with client/company confidential information\n\n### 4. Accuracy\n- AI can "hallucinate" — generating false information confidently\n- Always verify facts, statistics, and claims\n- Don't rely on AI for medical, legal, or financial advice\n\n### 5. Copyright & Ownership\n- Understand copyright implications of AI-generated content\n- Check terms of service for each tool\n- When in doubt, use AI as a starting point, not the final product\n\n## Your AI Ethics Checklist\n\nCreate your personal guidelines:\n\`\`\`\nHelp me create a personal AI ethics checklist for my role as [job].\nConsider: transparency, accuracy, privacy, bias, and fair use.\nMake it practical and actionable (10 items max).\n\`\`\``
      },
      {
        day: 23, title: "AI Trends & Future Skills", description: "Understand where AI is heading and prepare for the future.",
        duration: "20 min",
        task: "Research one emerging AI trend and write a brief analysis of its impact.",
        content: `# Day 23: AI Trends & Future Skills\n\n## What's Coming Next\n\n## Top AI Trends for 2026+\n\n### 1. AI Agents\nAI that can **take actions**, not just generate text:\n- Browse the web, book flights, manage calendars\n- Execute multi-step workflows autonomously\n- Make decisions within defined parameters\n\n### 2. Multimodal AI\nAI that works across all media types simultaneously:\n- Understand images, audio, video, and text together\n- Generate any format from any input\n- Real-time translation across modalities\n\n### 3. Personalized AI\n- AI that learns your preferences and style\n- Custom-trained models for specific industries\n- AI that adapts to your workflow over time\n\n### 4. AI in Physical World\n- Robotics powered by AI reasoning\n- AI-designed products and materials\n- Smart environments that respond to needs\n\n## Future-Proof Skills\n\n1. **Prompt Engineering** → AI Orchestration\n2. **Tool Usage** → Workflow Architecture\n3. **Content Creation** → AI Creative Direction\n4. **Data Analysis** → AI Strategy\n5. **Coding with AI** → AI Product Building\n\n## Your Action Item\n\nResearch one trend deeply and consider:\n- How will this affect my industry?\n- What skills should I develop now?\n- What opportunities does this create?`
      },
      {
        day: 24, title: "Building an AI Side Business", description: "Explore how to monetize your AI skills.",
        duration: "20 min",
        task: "Identify 3 AI-powered service ideas you could offer based on your skills.",
        content: `# Day 24: Building an AI Side Business\n\n## Monetize Your AI Skills\n\nYou now have skills that most people don't. Here's how to turn them into income.\n\n## AI Service Ideas\n\n### Low Barrier (Start This Week)\n- **AI-Enhanced Freelance Writing** — Premium content creation\n- **Social Media Management** — AI-powered content calendars\n- **Email Marketing** — AI-crafted sequences\n- **Virtual Assistant** — AI-augmented VA services\n\n### Medium Barrier (Start This Month)\n- **AI Consulting** — Help businesses adopt AI tools\n- **Course Creation** — Teach AI skills to others\n- **Prompt Library** — Sell curated prompt collections\n- **AI Automation Setup** — Configure workflows for clients\n\n### Higher Barrier (Start This Quarter)\n- **AI SaaS Product** — Build a niche AI tool\n- **AI Agency** — Full-service AI implementation\n- **AI Training** — Corporate workshops\n\n## Business Planning Prompt\n\`\`\`\nI want to start an AI side business.\nMy skills: [list from challenge]\nAvailable time: [hours/week]\nBudget: [amount]\nTarget market: [who]\n\nCreate a 90-day launch plan with:\n- Weeks 1-4: Setup and positioning\n- Weeks 5-8: First clients\n- Weeks 9-12: Scale and optimize\nInclude pricing strategy and marketing channels.\n\`\`\`\n\n> 💰 **Real opportunity**: AI consulting rates range from $100-500/hour. Your skills are valuable!`
      },
      {
        day: 25, title: "Advanced Prompt Engineering", description: "Master advanced prompting techniques for expert results.",
        duration: "20 min",
        task: "Create a chain-of-thought prompt and a few-shot prompt, then compare results.",
        content: `# Day 25: Advanced Prompt Engineering\n\n## Level Up Your Prompts\n\n## Advanced Techniques\n\n### 1. Chain-of-Thought (CoT)\nAsk AI to think step by step:\n\`\`\`\nSolve this problem step by step, showing your reasoning:\n[complex problem]\nThink through each step before giving your final answer.\n\`\`\`\n\n### 2. Few-Shot Prompting\nGive examples of what you want:\n\`\`\`\nConvert these customer reviews into structured feedback:\n\nExample 1:\nReview: "Love the app but it's slow"\nCategory: Performance\nSentiment: Mixed\nPriority: High\n\nExample 2:\nReview: "Best purchase I've made this year!"\nCategory: General\nSentiment: Positive\nPriority: Low\n\nNow do the same for:\n[new reviews]\n\`\`\`\n\n### 3. Role Stacking\n\`\`\`\nYou are simultaneously:\n1. A marketing expert who thinks about messaging\n2. A data analyst who wants evidence\n3. A skeptical customer who needs convincing\n\nEvaluate this product pitch from all three perspectives:\n[pitch]\n\`\`\`\n\n### 4. Iterative Refinement\n\`\`\`\nRate your last response 1-10 on [criteria].\nNow improve it to a 10/10.\nExplain what you changed and why.\n\`\`\`\n\n> 🏆 **Pro tip**: Combine techniques for even better results. CoT + Role + Few-Shot = incredible output.`
      },
      {
        day: 26, title: "AI for Team Collaboration", description: "Introduce AI workflows to your team effectively.",
        duration: "15 min",
        task: "Create an AI adoption proposal for your team or organization.",
        content: `# Day 26: AI for Team Collaboration\n\n## Bringing AI to Your Team\n\n## Building an AI Culture\n\n### Start Small\n1. Share one AI win per week with your team\n2. Create a shared prompt library\n3. Run a lunch-and-learn session\n4. Start with low-stakes use cases\n\n### Team AI Policy\n\`\`\`\nHelp me draft an AI usage policy for my team:\n- Team size: [number]\n- Industry: [industry]\n- Main concern: [data privacy/quality/etc.]\n\nInclude:\n1. Approved use cases\n2. Off-limits scenarios\n3. Quality control process\n4. Data handling guidelines\n5. Disclosure requirements\n\`\`\`\n\n### Shared Prompt Library\nCreate a team resource:\n\`\`\`\nOrganize these prompt templates by department:\n- Marketing: [list prompts]\n- Sales: [list prompts]\n- Customer Service: [list prompts]\n- Operations: [list prompts]\n\nFormat each with: Name, Purpose, Prompt Template, Example Output\n\`\`\`\n\n## Overcoming Resistance\n\n| Objection | Response |\n|-----------|----------|\n| "AI will replace us" | "AI augments our work — we do more, not less" |\n| "It's not accurate" | "That's why we review everything. It's a first draft tool" |\n| "I don't have time to learn" | "15 minutes to save hours. Let me show you" |\n| "It's just a fad" | "Companies using AI are outperforming those that don't" |`
      },
      {
        day: 27, title: "Your AI Action Plan", description: "Create a personalized plan for continued AI growth.",
        duration: "20 min",
        task: "Build your 90-day AI growth plan with specific goals and milestones.",
        content: `# Day 27: Your AI Action Plan\n\n## What Comes After Day 28?\n\n## Build Your 90-Day Plan\n\n\`\`\`\nHelp me create a 90-day AI growth plan.\n\nCurrent level: Intermediate (completed 28-day challenge)\nRole: [your job]\nGoals: [what you want to achieve with AI]\nTime available: [hours/week for AI learning]\n\nCreate a plan with:\nMonth 1: Deepen core skills + build daily habits\nMonth 2: Specialize in [area] + start sharing knowledge\nMonth 3: Advanced projects + potential monetization\n\nInclude:\n- Weekly objectives\n- Specific tools to master\n- Projects to complete\n- Metrics to track progress\n\`\`\`\n\n## Key Habits to Maintain\n\n1. **Daily**: Use AI for at least one work task\n2. **Weekly**: Learn one new AI technique or tool\n3. **Monthly**: Complete an AI project\n4. **Quarterly**: Review and update your AI strategy\n\n## Resources for Continued Learning\n\n- **Communities**: r/ChatGPT, AI Twitter, Discord groups\n- **Newsletters**: Ben's Bites, The Neuron, TLDR AI\n- **Courses**: DeepLearning.AI, Coursera AI specializations\n- **Practice**: Build projects, share learnings, teach others\n\n> 📈 **Compound effect**: Small daily AI improvements lead to massive advantages over time.`
      },
      {
        day: 28, title: "Graduation Day! 🎓", description: "Celebrate your achievement and plan your AI-powered future.",
        duration: "25 min",
        task: "Complete the final capstone project and share your AI journey.",
        content: `# Day 28: Graduation Day! 🎓🎉\n\nYou did it! 28 days of consistent AI learning. That puts you ahead of 95% of professionals.\n\n## Your Journey Recap\n\n### Week 1: Foundations\nYou learned to communicate with AI effectively using the CRAFT framework, set up your toolkit, and created your first AI-assisted content.\n\n### Week 2: Productivity\nYou applied AI to real work: emails, research, data, presentations, social media, meetings, and learning.\n\n### Week 3: Advanced Skills\nYou explored coding, automation, strategy, customer service, personal branding, and project management.\n\n### Week 4: Mastery\nYou understood ethics, future trends, business opportunities, advanced techniques, team leadership, and created your growth plan.\n\n## 🏆 Capstone Project\n\nCreate a comprehensive "AI Transformation" document:\n\n\`\`\`\nHelp me create my AI Transformation Summary:\n\n1. Top 5 AI techniques I've mastered\n2. Time saved per week (estimated)\n3. Quality improvements in my work\n4. New capabilities I've gained\n5. My 3-month plan going forward\n6. How I'll share these skills with others\n\`\`\`\n\n## What You've Earned\n- 🎓 A completion certificate (check your profile!)\n- 🧠 Skills that 95% of professionals don't have\n- 🚀 A framework for continuous AI learning\n- 💪 Confidence to tackle any AI challenge\n\n## Final Words\n\nAI is evolving rapidly. What you've learned in 28 days is a foundation, not a ceiling. Keep experimenting, keep learning, keep building.\n\nThe future belongs to those who embrace AI as a partner.\n\n**Congratulations, AI Champion!** 🏆`
      },
    ],
  },
  "junior-ai": {
    id: "junior-ai",
    title: "Junior AI Challenge",
    description: "A structured challenge designed for junior professionals to level up their AI skills with daily hands-on tasks.",
    duration: "28 days",
    level: "Beginner",
    participants: "8.2K",
    emoji: "🎯",
    tags: ["Career Growth", "AI Basics", "Hands-On Learning"],
    days: Array.from({ length: 28 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Coming Soon`,
      description: "This challenge is being prepared. Stay tuned!",
      duration: "15 min",
      task: "Check back soon for this day's challenge.",
      content: `# Day ${i + 1}: Coming Soon\n\nThis challenge day is being prepared. Stay tuned for exciting AI content!`,
    })),
  },
  "14-day-side-gigs": {
    id: "14-day-side-gigs",
    title: "14-Day AI Side Gigs Challenge",
    description: "Discover how to use AI to start profitable side gigs.",
    duration: "14 days",
    level: "Beginner",
    participants: "5.7K",
    emoji: "💰",
    tags: ["Side Income", "AI Tools", "Freelancing", "Monetization"],
    days: Array.from({ length: 14 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Coming Soon`,
      description: "This challenge is being prepared. Stay tuned!",
      duration: "15 min",
      task: "Check back soon for this day's challenge.",
      content: `# Day ${i + 1}: Coming Soon\n\nThis challenge day is being prepared. Stay tuned for exciting content!`,
    })),
  },
};

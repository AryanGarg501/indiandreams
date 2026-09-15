import type { Course } from "./courseTypes";

type LessonSpec = {
  title: string;
  duration: string;
  outcome: string;
  steps: string[];
  prompt: string;
  practice: string;
};

type ModuleSpec = { title: string; lessons: LessonSpec[] };

const lesson = (
  title: string,
  outcome: string,
  steps: string[],
  prompt: string,
  practice: string,
  duration = "20 min",
): LessonSpec => ({ title, duration, outcome, steps, prompt, practice });

const createCourse = (
  title: string,
  emoji: string,
  description: string,
  totalHours: number,
  modules: ModuleSpec[],
): Course => ({
  title,
  emoji,
  description,
  totalHours,
  totalLessons: modules.reduce((total, module) => total + module.lessons.length, 0),
  modules: modules.map((module, moduleIndex) => ({
    id: `m${moduleIndex + 1}`,
    title: module.title,
    lessons: module.lessons.map((item, lessonIndex) => ({
      id: `l${modules.slice(0, moduleIndex).reduce((total, current) => total + current.lessons.length, 0) + lessonIndex + 1}`,
      title: item.title,
      duration: item.duration,
      content: `## ${item.title}\n\n### Learning outcome\n${item.outcome}\n\n### Practical workflow\n${item.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}\n\n### Prompt to try\n> ${item.prompt}\n\n### Practice task\n${item.practice}\n\n> **Quality check:** Review the result for accuracy, originality, brand fit, and any sensitive or copyrighted material before publishing.`,
    })),
  })),
});

export const additionalCourses: Record<string, Course> = {
  midjourney: createCourse("Midjourney", "🖼️", "Master visual prompting, composition, style control, iteration, and production workflows in Midjourney.", 5, [
    { title: "Midjourney Foundations", lessons: [
      lesson("Getting Started with Midjourney", "Understand the creation flow from prompt to saved image.", ["Open the Create experience and locate prompt history", "Write one clear subject-first prompt", "Generate a set and inspect each variation"], "A welcoming reading corner in a modern Indian home, morning light, editorial photography", "Generate one simple scene and note which words changed the result."),
      lesson("Anatomy of a Strong Image Prompt", "Build prompts with subject, environment, composition, light, and mood.", ["Name the main subject and action", "Add setting and camera viewpoint", "Finish with lighting, palette, and mood"], "Handcrafted ceramic tea set on linen, overhead composition, soft window light, calm earth palette", "Rewrite one vague idea using all five prompt layers."),
      lesson("Parameters and Aspect Ratios", "Choose useful ratios and generation settings for the final channel.", ["Match the aspect ratio to the destination", "Change one parameter at a time", "Record settings beside approved images"], "Minimal skincare campaign, botanical ingredients, studio lighting --ar 4:5", "Create square, portrait, and landscape versions of one idea."),
      lesson("Variations, Upscaling, and Remix", "Iterate without losing the strongest parts of a concept.", ["Select the composition with the best hierarchy", "Create subtle variations", "Upscale only after checking hands, text, and edges"], "Keep the composition; change the season to monsoon and use cooler light", "Take one generation through variation, remix, and final upscale."),
    ]},
    { title: "Creative Direction", lessons: [
      lesson("Composition and Camera Language", "Control framing with photographic and cinematic vocabulary.", ["Choose shot size and camera angle", "Define focal depth and lens character", "Reserve negative space for layout needs"], "Streetwear portrait, low angle, 50mm lens, shallow depth, subject on right, negative space left", "Produce three framings of the same subject."),
      lesson("Style References and Consistency", "Create a coherent visual family without copying an artist.", ["Describe visual attributes instead of living artists", "Reuse palette, lighting, and material language", "Compare outputs as a set"], "Geometric editorial illustration, cobalt and saffron palette, crisp paper texture, bold shadows", "Build a three-image mini-series with consistent direction."),
      lesson("Character and Product Consistency", "Reduce drift across repeated subjects and campaign assets.", ["Define fixed identity or product attributes", "Keep a reusable prompt block", "Change only scene variables between runs"], "Same matte-green travel bottle with brass cap, centered product photography, airport lounge setting", "Create two scenes featuring the same clearly defined product."),
      lesson("Typography-Safe Visuals", "Design image backgrounds that leave reliable space for real typography.", ["Avoid asking the model for important body text", "Generate clean copy space", "Add final wording in a design tool"], "Premium workshop poster background, abstract paper forms, clean central copy space, no letters", "Generate a poster background and add readable text outside Midjourney."),
    ]},
    { title: "Production Workflows", lessons: [
      lesson("Campaign Storyboards", "Turn a campaign idea into a sequence of connected frames.", ["Write a beginning, middle, and payoff", "Define continuity rules", "Generate and arrange frames before polishing"], "Storyboard frame: founder packing the first customer order, warm documentary photography", "Create a four-frame launch story."),
      lesson("Responsible Image Creation", "Recognize consent, likeness, bias, and disclosure risks.", ["Avoid deceptive impersonation", "Check representation and stereotypes", "Disclose AI use when context requires it"], "Inclusive team collaboration in a bright design studio, candid documentary style", "Audit one image for bias and misleading details."),
      lesson("Building a Reusable Prompt Library", "Save tested structures by business objective.", ["Group prompts by channel and format", "Store variable fields in brackets", "Keep examples of successful outputs"], "[subject], [setting], [composition], [lighting], [palette], [mood], [aspect ratio]", "Create templates for a product shot, portrait, and social visual."),
      lesson("Final Project: Visual Campaign", "Deliver a coherent multi-asset campaign from one brief.", ["Write the audience, message, and style brief", "Generate a hero, social portrait, and banner", "Select, refine, and document final prompts"], "Create a launch campaign for a sustainable Indian stationery brand, modern craft direction", "Deliver three coordinated assets plus a one-page prompt record.", "35 min"),
    ]},
  ]),

  "dall-e": createCourse("DALL·E", "🎭", "Learn natural-language image creation, editing, art direction, and safe production workflows.", 3, [
    { title: "Image Generation Essentials", lessons: [
      lesson("How DALL·E Interprets Prompts", "Translate a visual idea into direct natural-language instructions.", ["State the subject and action", "Describe the environment", "Add medium, composition, and light"], "A friendly editorial illustration of a student learning AI at a desk, clean shapes, bright daylight", "Generate one concept in photographic and illustrated styles."),
      lesson("Writing Precise Visual Briefs", "Reduce ambiguity by defining must-have and must-avoid details.", ["List essential objects", "Explain spatial relationships", "State what should not appear"], "A blue ceramic mug to the left of a closed notebook, top-down view, plain desk, no text", "Turn a client request into a six-line visual brief."),
      lesson("Composition, Lighting, and Style", "Direct visual hierarchy using familiar art and camera terms.", ["Choose foreground, subject, and background", "Specify light source and contrast", "Describe style through attributes"], "Close-up food photograph of masala dosa, side light, crisp texture, dark neutral background", "Create three lighting variations of one scene."),
    ]},
    { title: "Editing and Iteration", lessons: [
      lesson("Editing Existing Images", "Give localized edit instructions while preserving the rest.", ["Identify exactly what changes", "State what must remain unchanged", "Inspect edges and lighting after the edit"], "Replace only the tabletop with pale marble; keep the product, shadows, and framing unchanged", "Write two precise edit instructions for the same image."),
      lesson("Creating Useful Variations", "Explore alternatives systematically instead of restarting randomly.", ["Lock the main concept", "Change one variable per round", "Compare against a clear selection criterion"], "Keep the character and pose; explore three warmer background palettes", "Run a controlled variation round and pick a winner."),
      lesson("Designing for Social and Presentations", "Generate backgrounds and visuals suited to final layouts.", ["Choose the final aspect ratio", "Reserve readable copy space", "Export and add accurate text in a layout tool"], "Clean technology presentation cover, subtle circuit pattern, open space in upper left, no text", "Create one social post visual and one slide cover."),
    ]},
    { title: "Applied Creation", lessons: [
      lesson("Accuracy, Rights, and Disclosure", "Review generated images before public or commercial use.", ["Check factual and physical errors", "Avoid unauthorized likenesses and protected marks", "Label synthetic media when it may mislead"], "Original fictional athlete in a generic stadium, no logos or real-person resemblance", "Create a pre-publish checklist for AI images."),
      lesson("Final Project: Brand Image Set", "Produce a small, consistent set of usable brand visuals.", ["Define audience and art direction", "Create hero, detail, and lifestyle images", "Refine, review, and document prompts"], "Three-image campaign for a reusable lunchbox brand, optimistic editorial photography", "Deliver three coordinated images with final prompts and usage notes.", "35 min"),
    ]},
  ]),

  "notion-ai": createCourse("Notion AI", "📝", "Use Notion AI to organize knowledge, improve writing, summarize work, and build dependable team workflows.", 4, [
    { title: "Notion AI Foundations", lessons: [
      lesson("AI Inside Your Workspace", "Understand where AI assists within pages, databases, and search.", ["Identify a repeatable information task", "Select only the relevant source content", "Ask for a clearly formatted output"], "Summarize this page in five bullets for a teammate joining today", "Use a sample project page to create an executive summary."),
      lesson("Writing and Rewriting", "Draft and transform text while preserving meaning and voice.", ["State audience and purpose", "Request the exact transformation", "Compare the revision with source facts"], "Rewrite this update for senior leaders: concise, confident, and under 120 words", "Rewrite one paragraph for three different audiences."),
      lesson("Summaries and Key Insights", "Compress long notes into decisions, risks, and next steps.", ["Provide complete source notes", "Define summary categories", "Verify names, dates, and numbers"], "Summarize into Decisions, Open Questions, Risks, and Next Steps", "Summarize a meeting note and verify every action item."),
    ]},
    { title: "Productivity Workflows", lessons: [
      lesson("Meeting Notes to Action Items", "Convert discussion into owned, trackable work.", ["Separate decisions from suggestions", "Extract owner and due date only when stated", "Mark missing owners as unassigned"], "Create a table with action, owner, due date, and dependency; do not invent missing details", "Turn messy meeting notes into an action table."),
      lesson("Project Briefs and Plans", "Build structured project documents from rough inputs.", ["Define the objective and success measure", "List scope and constraints", "Generate milestones, risks, and open questions"], "Turn these notes into a project brief with Goal, Audience, Scope, Milestones, Risks, and Metrics", "Create a one-page brief for a real upcoming task."),
      lesson("Database Autofill and Classification", "Use AI-assisted properties consistently and review edge cases.", ["Define a small set of labels", "Give examples for each label", "Review low-confidence or unusual records"], "Classify each feedback item as Bug, Request, Praise, or Question and explain uncertain cases", "Design a classification rule for a feedback database."),
    ]},
    { title: "Knowledge Systems", lessons: [
      lesson("Workspace Search and Q&A", "Ask grounded questions across approved workspace knowledge.", ["Ask a question with a clear scope", "Request source references", "Open the source before acting on an answer"], "According to our onboarding pages, what must happen before a new hire's first day? Cite page names", "Answer one policy question and verify it against the source."),
      lesson("Reliable Team AI Templates", "Create reusable prompts that make team output consistent.", ["Define inputs using placeholders", "Specify a stable output format", "Include a verification step"], "Using [source], create [deliverable] for [audience] in [format]. Flag missing information", "Build templates for weekly updates and meeting summaries."),
      lesson("Final Project: Team Knowledge Hub", "Combine pages, databases, and AI prompts into a practical workflow.", ["Choose one recurring team process", "Create source, output, and review pages", "Test the workflow with realistic information"], "Design a knowledge workflow for customer research: intake, themes, summary, and decisions", "Build and document a reusable knowledge hub workflow.", "35 min"),
    ]},
  ]),

  "canva-ai": createCourse("Canva AI", "🎯", "Create on-brand graphics, presentations, images, and campaign variations with Canva's AI-assisted tools.", 3, [
    { title: "Canva AI Essentials", lessons: [
      lesson("Exploring Canva's AI Tools", "Choose the right AI-assisted feature for writing, images, layouts, or edits.", ["Start from the required deliverable", "Choose a suitable format and template", "Use AI for a defined step rather than the whole decision"], "Create a modern workshop announcement for first-time AI learners", "Map three design tasks to the most useful Canva workflow."),
      lesson("From Brief to First Design", "Turn audience, message, and channel into a focused design brief.", ["Define one communication goal", "Set audience and mandatory copy", "Choose format, mood, and visual hierarchy"], "Instagram portrait for an AI basics workshop, friendly, high contrast, clear title area", "Write and use a brief for an upcoming post."),
      lesson("Generating and Editing Images", "Create supporting imagery and refine it for layout use.", ["Describe the visual role in the design", "Generate with useful copy space", "Remove distractions and check edges"], "Young Indian entrepreneur using a laptop in a bright studio, authentic editorial photography, copy space right", "Generate and edit one banner-ready image."),
    ]},
    { title: "Brand and Content Systems", lessons: [
      lesson("Brand Voice and Brand Kit", "Keep AI-assisted designs aligned with approved identity.", ["Define colors, type, logo rules, and tone", "Apply the kit before generating variants", "Reject outputs that dilute brand recognition"], "Rewrite this headline in an optimistic, practical, jargon-free brand voice", "Create a five-point brand consistency checklist."),
      lesson("Presentations with AI", "Build a clear slide narrative before polishing individual slides.", ["Define audience and decision", "Create a beginning, evidence, and recommendation", "Reduce each slide to one main idea"], "Create an eight-slide outline explaining an AI adoption plan to a small business owner", "Turn a one-page note into an eight-slide deck outline."),
      lesson("Resizing and Content Variations", "Adapt one approved idea across channels without losing hierarchy.", ["Identify each channel's safe area", "Shorten copy for smaller formats", "Inspect every resized layout manually"], "Adapt this campaign into a story, square post, and presentation cover", "Create three channel versions from one master design."),
    ]},
    { title: "Publishing Workflow", lessons: [
      lesson("Accessibility and Responsible Design", "Improve readability, representation, and disclosure in generated designs.", ["Check contrast and text size", "Add meaningful alternative text", "Review generated people and claims for bias"], "Write concise alt text describing the purpose and essential information in this graphic", "Audit one design for contrast, reading order, and alt text."),
      lesson("Final Project: Multi-Format Campaign", "Deliver a coherent campaign ready for practical review.", ["Create a brief and master direction", "Produce post, story, and slide assets", "Run brand, accuracy, and accessibility checks"], "Campaign for a free digital-skills community event, energetic and trustworthy", "Deliver three coordinated formats plus a review checklist.", "35 min"),
    ]},
  ]),

  "copy-ai": createCourse("Copy.ai", "📋", "Build repeatable sales and marketing copy workflows with clear briefs, voice control, and human review.", 3, [
    { title: "Copy Foundations", lessons: [
      lesson("Building a Useful Copy Brief", "Give the AI enough audience, offer, proof, and tone context.", ["Define the target reader and their problem", "State the offer and credible proof", "Choose one action and tone"], "Write for [audience] who struggle with [problem]. Offer [solution], use [proof], and end with [action]", "Create a copy brief for a real product or service."),
      lesson("Headlines and Value Propositions", "Generate specific benefits instead of generic claims.", ["Translate features into customer outcomes", "Create several angle families", "Remove hype that cannot be proven"], "Generate 12 homepage headlines: clarity, speed, savings, and confidence angles; no unverifiable superlatives", "Select and improve three headlines from different angles."),
      lesson("Brand Voice Control", "Keep generated copy recognizable across formats.", ["Define voice with do and don't examples", "Provide a short approved sample", "Review rhythm, vocabulary, and claim strength"], "Rewrite in a warm expert voice: short sentences, practical language, no slang or exaggerated claims", "Build a one-page voice prompt for your brand."),
    ]},
    { title: "Revenue Copy", lessons: [
      lesson("Sales Emails", "Write relevant outreach with a clear reason to respond.", ["Open with a specific observation", "Connect the problem to one outcome", "Use a low-friction call to action"], "Write a 100-word sales email to [role] about [problem], using [proof], ending with one simple question", "Draft and edit a three-email outreach sequence."),
      lesson("Landing Pages and Ads", "Align promise, proof, objections, and action across a campaign.", ["Lead with the strongest customer outcome", "Support it with evidence", "Address top objections before the CTA"], "Draft a landing page with hero, three benefits, proof, FAQ, and CTA for [offer]", "Create one landing page outline and five matching ad variants."),
    ]},
    { title: "Workflow and Review", lessons: [
      lesson("Content Repurposing", "Convert a strong source into channel-appropriate copy.", ["Extract the source's core argument", "Match format to channel behavior", "Keep facts and brand voice consistent"], "Turn this article into a LinkedIn post, email intro, and five short social hooks", "Repurpose one source into three formats."),
      lesson("Final Project: Launch Copy System", "Build a reusable set of copy assets around one launch.", ["Complete the campaign brief", "Create landing, email, and social copy", "Fact-check, edit, and save reusable prompts"], "Create a launch copy package for [product] aimed at [audience] with [goal and proof]", "Deliver a landing page, three emails, six posts, and a review checklist.", "35 min"),
    ]},
  ]),

  perplexity: createCourse("Perplexity AI", "🔍", "Research efficiently with focused questions, source evaluation, citations, and synthesis workflows.", 3, [
    { title: "Research Foundations", lessons: [
      lesson("How AI Research Answers Work", "Understand answer synthesis, citations, and why source verification matters.", ["Separate the generated summary from source evidence", "Open citations supporting important claims", "Check publication date and source authority"], "Explain the current market for electric two-wheelers in India and cite recent primary sources", "Ask one factual question and verify three cited claims."),
      lesson("Writing Better Research Questions", "Turn broad topics into scoped, answerable investigations.", ["Define geography and time period", "Name comparison dimensions", "Specify desired source types and output"], "Compare India's top three digital payment trends from 2024 onward using regulator and industry sources", "Rewrite three broad questions into research-ready prompts."),
      lesson("Follow-Ups and Research Threads", "Build depth without losing the original research objective.", ["Start with an overview", "Probe assumptions and missing viewpoints", "End with a synthesis request"], "What evidence challenges the strongest conclusion above?", "Run a five-question thread and summarize what changed."),
    ]},
    { title: "Evidence and Synthesis", lessons: [
      lesson("Evaluating Sources and Citations", "Judge authority, recency, independence, and directness.", ["Prefer primary evidence for core claims", "Distinguish reporting from commentary", "Look for corroboration and conflicts"], "Create a source table with author, date, source type, claim supported, and limitations", "Score five sources using a simple evidence rubric."),
      lesson("Comparative Research", "Compare options using the same criteria and transparent evidence.", ["Define criteria before searching", "Collect evidence for every option", "Mark unknowns instead of filling gaps"], "Compare three CRM tools for a 20-person Indian startup by price, integrations, support, and data controls", "Build a comparison brief with an evidence column."),
      lesson("From Sources to a Decision Brief", "Synthesize research into conclusions, risks, and next steps.", ["Separate findings from interpretation", "State confidence and limitations", "Connect recommendations to evidence"], "Write an executive brief with Finding, Evidence, Implication, Risk, and Recommendation sections", "Turn a research thread into a one-page decision brief."),
    ]},
    { title: "Responsible Research", lessons: [
      lesson("Fact-Checking and Research Ethics", "Avoid citation laundering, confirmation bias, and overconfident claims.", ["Search for disconfirming evidence", "Trace important claims to originals", "Do not cite a source you have not inspected"], "List the strongest evidence for and against this claim, then identify what remains uncertain", "Audit an AI answer for unsupported or overstated claims."),
      lesson("Final Project: Cited Research Report", "Complete a concise, defensible research report for a real decision.", ["Define the decision and evidence standard", "Gather diverse current sources", "Write findings, limitations, and recommendations with citations"], "Research whether [organization] should adopt [solution] in the next 12 months", "Deliver a cited report, source table, and three recommended next actions.", "35 min"),
    ]},
  ]),

  "ai-business": createCourse("AI for Business", "💼", "Identify valuable AI opportunities, design safe workflows, measure results, and lead responsible adoption.", 8, [
    { title: "Strategy and Opportunity", lessons: [
      lesson("AI Business Fundamentals", "Distinguish automation, prediction, and generative AI opportunities.", ["Start with a business outcome", "Map the current process and pain", "Choose AI only where it improves the workflow"], "Explain three ways AI could improve [business process], with assumptions and risks", "Classify five tasks as automate, assist, analyze, or avoid."),
      lesson("Finding High-Value Use Cases", "Prioritize opportunities by value, feasibility, risk, and adoption effort.", ["List repetitive or information-heavy tasks", "Estimate volume and cost of errors", "Score impact, data readiness, and risk"], "Create a use-case scorecard for these processes using value, feasibility, risk, and time-to-impact", "Score five opportunities and shortlist two."),
      lesson("Process and Workflow Mapping", "Design where humans, systems, and AI interact.", ["Document trigger, inputs, decisions, and outputs", "Place human review at high-impact decisions", "Define exception and escalation paths"], "Map an AI-assisted customer inquiry workflow with human review and escalation", "Draw the current and proposed flow for one process."),
      lesson("Building the Business Case", "Connect an AI initiative to measurable operational or customer value.", ["Set a baseline", "Estimate benefit, implementation cost, and adoption cost", "State assumptions and sensitivity"], "Build a simple business case for [use case] with baseline, expected benefit, cost, risks, and payback", "Write a one-page case with conservative assumptions."),
    ]},
    { title: "Design and Governance", lessons: [
      lesson("Data Readiness and Privacy", "Assess whether information is usable, permitted, and sufficiently protected.", ["Inventory required data and ownership", "Remove unnecessary personal or confidential fields", "Define retention and access controls"], "Create a data-readiness checklist for an AI support assistant", "Audit one use case for data quality and privacy gaps."),
      lesson("Choosing Tools and Vendors", "Evaluate solutions beyond a feature demonstration.", ["Define mandatory requirements", "Assess security, integration, reliability, and exit options", "Run a task-based pilot with your data"], "Create an AI vendor evaluation matrix covering capability, security, data use, integration, support, and cost", "Compare two tools using a weighted scorecard."),
      lesson("Human Review and Quality Controls", "Design checks proportionate to consequence and uncertainty.", ["Define acceptable and unacceptable errors", "Set review samples and escalation triggers", "Log corrections to improve the process"], "Design a quality-control plan for AI-drafted customer responses", "Create a review rubric with pass, revise, and escalate outcomes."),
      lesson("Responsible AI Governance", "Establish ownership, policies, and risk controls for workplace AI.", ["Assign business and risk owners", "Publish approved-use and prohibited-use rules", "Create incident reporting and review cycles"], "Draft a practical responsible AI policy outline for a 50-person company", "Write ten plain-language employee rules."),
    ]},
    { title: "Pilot and Scale", lessons: [
      lesson("Designing a 30-Day Pilot", "Test value safely before scaling.", ["Choose a narrow workflow and user group", "Set baseline and success measures", "Plan training, monitoring, and stop conditions"], "Create a 30-day pilot plan for [use case] with scope, owners, metrics, risks, and weekly checkpoints", "Build a four-week pilot calendar."),
      lesson("Change Management and Training", "Help teams adopt AI without losing judgment or accountability.", ["Explain the reason and boundaries", "Train with real role-based tasks", "Create office hours and feedback channels"], "Create a role-based AI training plan for operations, sales, and managers", "Plan one practical workshop and follow-up support."),
      lesson("Measuring ROI and Quality", "Track adoption, efficiency, output quality, risk, and business outcomes together.", ["Select leading and lagging measures", "Compare against the baseline", "Review unintended effects and correction time"], "Build an AI pilot scorecard with adoption, time saved, quality, customer impact, errors, and cost", "Define six metrics with owners and review frequency."),
      lesson("Scaling Across Teams", "Expand proven workflows with reusable standards and local ownership.", ["Document the successful operating model", "Standardize controls and templates", "Adapt training and integrations by team"], "Create a scale plan from one successful pilot to three departments", "Draft readiness gates for each rollout stage."),
    ]},
    { title: "Applied Leadership", lessons: [
      lesson("AI Operating Model", "Define decision rights, ownership, funding, and review rhythms.", ["Assign executive, product, technical, and risk roles", "Create intake and prioritization processes", "Set quarterly portfolio reviews"], "Design a lightweight AI operating model for a growing company", "Create a RACI for AI initiatives."),
      lesson("Final Project: AI Adoption Roadmap", "Produce an actionable roadmap grounded in business value and responsible controls.", ["Prioritize three use cases", "Sequence foundations, pilots, and scale phases", "Attach owners, measures, risks, and decision gates"], "Create a 90-day AI adoption roadmap for [company], including use cases, governance, pilots, training, metrics, and budget assumptions", "Deliver a leadership-ready roadmap and five-slide summary.", "45 min"),
    ]},
  ]),
};

# Indian Dreams

**Practical AI learning through guided lessons, hands-on workspaces, challenges, and educational games.**

Indian Dreams helps learners explore AI tools for writing, research, productivity, design, and business. The website combines platform-specific courses with saved learning progress, course-completion certificates, and a paid enrollment flow.

- **Website:** [indiandreams.app](https://indiandreams.app)
- **Alternate published address:** [indiandreams.lovable.app](https://indiandreams.lovable.app)
- **Instagram:** [@indiandreams.app](https://www.instagram.com/indiandreams.app)

> This README describes the current source code. Features requiring payments, authentication, email delivery, or AI generation also depend on the hosted service configuration. Known limitations are listed below rather than treated as completed features.

## Contents

- [Website overview](#website-overview)
- [Learning catalog](#learning-catalog)
- [Enrollment and payments](#enrollment-and-payments)
- [Pages and navigation](#pages-and-navigation)
- [Technology stack](#technology-stack)
- [Local development](#local-development)
- [Configuration and secrets](#configuration-and-secrets)
- [Project structure](#project-structure)
- [Backend responsibilities](#backend-responsibilities)
- [Maintaining the website](#maintaining-the-website)
- [Testing and deployment](#testing-and-deployment)
- [Known limitations](#known-limitations)
- [Contributing and usage](#contributing-and-usage)

## Website overview

### Public website

The home page introduces Indian Dreams and links visitors to enrollment and login. Supporting sections present learning paths, challenges, certificates, frequently asked questions, and learner reviews. The About Us page explains the platform's purpose, mission, values, and audience.

### Learner dashboard and profile

- A dashboard brings together courses, challenges, learning activity, and shortcuts.
- My Profile displays account information, completed-versus-total lesson progress, a percentage bar, and earned-certificate totals.
- Saved lesson progress drives sequential unlocking and course continuation.
- Weekly learning activity uses real-time updates to reflect recorded progress.

### Lessons and challenges

- Searchable, filterable guides lead to platform-specific course pathways.
- Courses contain modules and Markdown lessons with practical examples and exercises.
- The lesson viewer supports sequential completion and advancement.
- Audio playback uses the browser's Speech Synthesis API; voice availability depends on the device and browser.
- Challenge tracks provide daily tasks and progress grids, including 14-day and 28-day curricula.

### AI workspaces

Each guide includes a **Try AI** action alongside its lessons. Workspaces offer task-specific prompt presets, loading and error states, and generated results:

- **Text:** conversational assistance, writing, research-style briefs, summaries, and business plans.
- **Images:** prompt-based generation with style and composition-format options.
- **Result actions:** copy generated text or download a generated image.

These are Indian Dreams learning workspaces inspired by the named platforms—not integrations with each platform's official service. A Perplexity-style workspace does not imply live web search or verified citations. Conversations and generated results are not saved as persistent chat history by this application.

### Certificates, reviews, and games

- The Certificates page lists earned course certificates.
- Individual certificates include the learner's name, completion details, a verified stamp, and the platform's signature artwork.
- Print-specific styling supports saving certificates as PDFs through the browser's print dialog.
- Shareable certificate links allow others to view completion details through a public certificate endpoint.
- Signed-in learners can submit or update their own reviews; platform statistics and review aggregates are fetched from the backend.
- Four mini-games provide additional practice: **AI Spotter**, **Prompt Challenge**, **AI Trivia**, and **Speed Classifier**.

## Learning catalog

The shared catalog contains **12 courses and 129 lessons**. Guide cards derive lesson counts and estimated learning time from the course data rather than separate hardcoded totals.

| Course | Course ID | Lessons | Workspace output |
| --- | --- | ---: | --- |
| Claude | `claude` | 10 | Text |
| Gemini | `gemini` | 10 | Text |
| ChatGPT | `chatgpt` | 13 | Text |
| Jasper AI | `jasper-ai` | 10 | Text |
| Stable Diffusion | `stable-diffusion` | 10 | Image |
| Midjourney | `midjourney` | 12 | Image |
| DALL·E | `dall-e` | 8 | Image |
| Notion AI | `notion-ai` | 9 | Text |
| Canva AI | `canva-ai` | 8 | Image |
| Copy.ai | `copy-ai` | 7 | Text |
| Perplexity AI | `perplexity` | 8 | Text |
| AI for Business | `ai-business` | 14 | Text |

Lesson content lives in local TypeScript files. The backend stores learner progress and certificate-eligibility metadata; it is not the source of the lesson Markdown. Course durations are estimates, not usage statistics.

## Enrollment and payments

The current Full Package checkout charges **₹149 INR** and displays **“Only for 14 days.”** The intended enrollment flow requires payment before account creation; no free tier or trial is offered.

1. A visitor opens the offer and payment pages.
2. Checkout collects a name and email address; no contact-number field is required.
3. The visitor selects **UPI**, **credit/debit card**, or **wallet**. UPI is selected by default.
4. A server-side function creates a Razorpay order using the authoritative price, ignoring any amount supplied by the browser.
5. After checkout success, the payment signature is verified.
6. Account creation checks that the recorded order belongs to the supplied email and has not already been redeemed.
7. For a new account, the function generates a password, confirms the email during creation, and the page signs the learner in automatically.

Existing-account and payment failures are surfaced in the checkout flow. Availability of individual payment methods depends on the Razorpay account and checkout configuration.

**Important:** the 14-day wording is an offer description, not evidence of an implemented access-expiry system. Automated renewal reminders are not currently implemented. General hosted signup/sign-in settings must be checked separately; the payment-account creation code explicitly confirms the new email without a confirmation-email step.

## Pages and navigation

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/about-us` | About Indian Dreams |
| `/offer` | Enrollment offer |
| `/payment` | Razorpay checkout |
| `/login` | Existing-account login |
| `/signup` | Registration page |
| `/forgot-password` | Password recovery |
| `/dashboard` | Learner dashboard |
| `/profile` | Account details and learning summary |
| `/guides` | Course directory |
| `/guide-pathway/:courseId` | Course modules and lesson pathway |
| `/lesson/:courseId/:moduleId/:lessonId` | Lesson viewer |
| `/guide-lab/:guideId` | Guide-specific AI workspace |
| `/ai-tools` | General AI chat assistant |
| `/challenges` | Challenge directory |
| `/challenge/:challengeId` | Daily challenge view |
| `/certificates` | Earned certificates |
| `/certificate/:certificateId` | Certificate viewer and sharing |
| `/mini-games` | Games hub |
| `/mini-games/ai-spotter` | AI Spotter |
| `/mini-games/prompt-challenge` | Prompt Challenge |
| `/mini-games/ai-trivia` | AI Trivia |
| `/mini-games/speed-classifier` | Speed Classifier |
| `/quiz` | Legacy company/self selection leading to the offer |
| `/quiz-steps` | Legacy URL that redirects to the offer |
| Any unmatched route | Not-found page |

Learner pages perform session checks. Public certificate sharing is handled separately from the signed-in certificate collection. Route declarations alone are not a substitute for backend authorization.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | React 18 and TypeScript |
| Development and bundling | Vite 5 with React SWC |
| Routing | React Router 6 |
| UI and styling | Tailwind CSS 3, shadcn/ui, Radix UI |
| Animation | Framer Motion **11.15.0** |
| Data fetching | TanStack React Query |
| Forms and validation | React Hook Form and Zod |
| Markdown | React Markdown |
| Icons and platform artwork | Lucide React and local AI-logo assets |
| Backend | Lovable Cloud: authentication, PostgreSQL, real-time updates, and edge functions |
| Payments | Razorpay |
| AI requests | Lovable AI Gateway through server-side functions |
| Tests | Vitest, Testing Library, and jsdom |

The current visual theme uses emerald and gold accents, Syne headings, and Plus Jakarta Sans body text. Shared colors and visual roles are defined in `src/index.css` and `tailwind.config.ts`.

## Local development

### Prerequisites

- Git and access to the project repository.
- A current Node.js LTS release compatible with Vite 5; Node.js 22 LTS is a suitable development choice.
- Bun for the commands below, or npm as an alternative.
- Access to the project's managed backend for authentication, saved progress, payments, and AI features.

### Start the application

Clone your repository using its actual URL, then open the project directory:

```bash
git clone <your-repository-url>
cd <your-repository-directory>
bun install
bun run dev
```

The configured development address is **http://localhost:8080**. If that port is occupied, check the address printed by Vite.

For npm, use `npm install` and `npm run dev` instead. Prefer one package manager consistently so unrelated lockfiles do not drift.

The same steps work in GitHub Codespaces: open the repository, choose **Code → Codespaces → Create codespace**, and run the installation and development commands in its terminal.

### Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Produce the production frontend in `dist/` |
| `bun run build:dev` | Build using development mode |
| `bun run preview` | Serve the generated frontend locally |
| `bun run lint` | Run ESLint |
| `bun run test` | Run Vitest once |
| `bun run test:watch` | Run Vitest in watch mode |

Starting Vite does **not** start a local payment gateway, database, or edge-function server.

## Configuration and secrets

### Frontend configuration

The managed project provisions these public frontend settings:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Managed backend base address |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public client key; authorization still depends on sessions and database policies |
| `VITE_SUPABASE_PROJECT_ID` | Managed project configuration identifier |

Use the project's provisioned values rather than copying values from another deployment. Managed `.env` settings and the generated integration files should not be edited manually in Lovable. A separate local checkout must obtain its authorized configuration through the project owner or supported project export process.

### Server-side secrets

| Secret | Purpose |
| --- | --- |
| `RAZORPAY_KEY_ID` | Creates Razorpay orders; the public checkout key is returned to the client as needed |
| `RAZORPAY_KEY_SECRET` | Authenticates order creation and verifies payment signatures |
| `LOVABLE_API_KEY` | Authorizes server-side AI Gateway requests |

Backend runtime credentials are supplied by Lovable Cloud. Private backend credentials and the database password are not available for manual retrieval on Lovable Cloud.

**Never put private keys in the README, frontend code, browser storage, screenshots, or committed configuration.** Values prefixed with `VITE_` are exposed to the frontend bundle and must not contain private secrets. Configure server secrets through the managed backend's secret controls.

## Project structure

```text
.
├── public/                     # Favicon and public static files
├── src/
│   ├── assets/                 # Brand images, signature artwork, and AI logos
│   ├── components/
│   │   ├── ui/                 # Shared shadcn/ui controls
│   │   ├── dashboard/          # Dashboard navigation and learning widgets
│   │   └── challenge/          # Challenge grids and daily content
│   ├── data/
│   │   ├── courseTypes.ts      # Course, module, and lesson interfaces
│   │   ├── coursesData.ts      # Shared course catalog
│   │   ├── additionalCourses.ts # Additional platform-specific courses
│   │   ├── challengesData.ts   # Challenge curricula
│   │   └── guideTools.ts       # AI workspace modes and presets
│   ├── hooks/                  # Audio, reviews, statistics, and UI hooks
│   ├── integrations/supabase/  # Generated managed-backend integration
│   ├── lib/                    # Shared helpers
│   ├── pages/                  # Website and learner screens
│   ├── test/                   # Test setup and example test
│   ├── App.tsx                 # Providers and route declarations
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles and design tokens
├── supabase/
│   ├── functions/              # Hosted edge-function source
│   ├── migrations/             # Database schema and policy changes
│   └── config.toml             # Managed backend configuration
├── index.html                  # Frontend HTML entry point
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Theme and styling configuration
├── vite.config.ts              # Development-server and bundler configuration
└── vitest.config.ts            # Test configuration
```

## Backend responsibilities

### Application data

| Table | Responsibility |
| --- | --- |
| `profiles` | Learner profile information synchronized during account creation |
| `lesson_progress` | Saved course and challenge lesson completions |
| `certificates` | Issued course-completion records |
| `courses` | Authoritative course titles and required lesson counts for certificate validation |
| `payment_orders` | Order ownership, selected plan, amount, and redemption tracking |
| `reviews` | Learner ratings and review content |

Database migrations define access policies and certificate validation. The certificate request uses `issue_certificate`; the backend must recognize the course and confirm sufficient recorded completions before issuing a certificate.

### Edge functions

| Function | Responsibility |
| --- | --- |
| `razorpay-create-order` | Validate checkout details, determine the price, create and record an order |
| `razorpay-verify-payment` | Verify the Razorpay payment signature |
| `payment-auto-signup` | Validate order ownership/redemption and create a paid learner account |
| `guide-text` | Authenticate the learner and stream guide-specific text generation |
| `guide-image` | Authenticate the learner and generate an image for an allowed guide |
| `chat` | Serve the separate general AI assistant |
| `platform-stats` | Return aggregate platform statistics |
| `public-certificate` | Return limited certificate information for public sharing |

The guide functions validate supported guide IDs and input lengths on the server. Text guides currently use `openai/gpt-6-astra`; image guides use `google/gemini-3-pro-image`. Their model choices are server-side, not browser-controlled. AI availability, supported model IDs, credit balance, and deployed function versions must be verified in the hosted environment.

## Maintaining the website

- **Course content:** edit the local course definitions and keep lesson/module IDs stable so saved progress still matches the content.
- **New courses:** update the shared catalog, guide/workspace entries where applicable, and the backend certificate registry. Matching only the frontend course data is not sufficient for certificates.
- **Challenges:** edit `src/data/challengesData.ts`; preserve IDs already referenced by saved progress.
- **Prices:** update the server-side `PLAN_PRICES` in `razorpay-create-order` and the matching offer/payment display text together. The server remains authoritative.
- **Branding:** use shared design tokens, local assets, and existing UI controls instead of hardcoding unrelated styles.
- **Routes:** add new pages to `src/App.tsx` before the catch-all route and update navigation where needed.
- **Generated files:** do not hand-edit the managed client, auth-storage helper, generated database types, or project-level managed backend settings.

## Testing and deployment

### Checks before release

Run the relevant tests and lint checks, then verify the affected flow in the website. The repository currently includes a basic example test; that does not provide comprehensive coverage of payments, authentication, or learning flows.

Recommended manual checks:

1. Open public pages and verify links and layouts on desktop and mobile.
2. Sign in and confirm courses, profile progress, and earned certificates load.
3. Complete a lesson and confirm the next lesson unlocks and progress updates after reloading.
4. Verify each course's backend certificate eligibility before promising completion certificates.
5. Test Razorpay in the appropriate test environment, including cancellation, failures, and existing-account handling; do not create real charges just to test a change.
6. Generate text and an image in signed-in AI workspaces; check copying, downloading, and failure messages.
7. Open a shared certificate link while signed out.
8. Check password-recovery behavior and actual hosted authentication/email settings.

### Publishing

Publish frontend changes through the project's Lovable publishing controls. Custom-domain configuration must point to the published app. Backend functions, secrets, and database changes require their own deployment/configuration; publishing frontend files alone does not prove those services are ready.

For another static hosting service, build the frontend and deploy `dist/`. Configure an SPA fallback to `index.html` so direct links such as `/guides` and `/profile` do not return a hosting-level 404. The hosted backend is still required.

## Known limitations

- The seven added course pathways are available in the frontend, but their backend certificate eligibility was previously identified as unfinished. Check and synchronize the hosted `courses` registry before advertising certificates for every platform.
- New AI guide functions have source implementations, but deployment and successful hosted text/image generation were not fully verified in the previous work. Treat live availability as unverified until tested.
- The separate `chat` function still references `google/gemini-3-flash-preview`, an earlier reported unsupported model ID. Its client also sends the public client key rather than a learner session token; it should not be assumed to have the guide functions' authentication guarantees.
- Some existing copy refers to longer challenges or lifetime updates, while checkout says “Only for 14 days.” Access expiry and automatic renewal-reminder emails are not established features.
- Mobile lesson-header spacing was previously identified as needing follow-up.
- Legacy onboarding URLs remain; `/quiz-steps` skips directly to the offer, while `/quiz` still contains a company/self selection.
- Hosted authentication settings, email delivery, and production payment behavior are not established by inspecting source code alone.

These are documentation notes, not fixes made by this README update.

## Contributing and usage

Keep changes focused, follow the existing TypeScript and UI conventions, and document any changed learner-facing behavior. Test changes to payments, account creation, certificate validation, and database permissions especially carefully. Never publish real credentials or personal learner data in issues or documentation.

No license file is currently included in this repository. Public access to the website or source does not automatically grant permission to reuse it; obtain permission from the project owner before redistribution or commercial reuse.

Third-party platform names and logos belong to their respective owners. Their inclusion identifies learning topics and does not imply endorsement, affiliation, or official access to those services.

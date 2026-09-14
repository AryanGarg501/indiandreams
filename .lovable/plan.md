# Profile details page

## Goal
Create a dedicated Profile page that opens when the learner clicks their profile in the dashboard sidebar.

## What will change
- Add a protected `/profile` page using the existing dashboard layout and styling.
- Make the profile area in the sidebar a real link and show its active state on the Profile page.
- Display the learner’s avatar or initials, full name, email address, account creation date, last sign-in date, and email status.
- Add a concise learning summary showing completed lessons and earned certificates using the learner’s existing records.
- Include clear loading, signed-out redirect, and unavailable-data states without exposing sensitive account information.
- Keep the page view-only, matching the request to see account details; no database changes are needed.

## Technical details
- Read identity details from the authenticated account and `profiles` record.
- Count only the signed-in learner’s `lesson_progress` and `certificates` rows under existing access rules.
- Reuse `DashboardSidebar`, `SidebarProvider`, semantic design tokens, and current dashboard breakpoints.
- Register the page in the existing route list and verify both desktop and mobile layouts.

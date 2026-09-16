# Live learning progress in My Profile

## Goal
Keep the learner’s My Profile summary in sync with lesson completions and earned certificates.

## What will change
- Add an overall learning progress bar to My Profile, showing completed lessons, total available lessons, and percentage complete.
- Count unique course lessons only, excluding challenge-day records from the lesson total.
- Refresh lesson progress and certificate count when either record changes, and whenever the learner returns to the page.
- Preserve the existing profile identity and account details layout.

## Technical details
- Calculate the available lesson total from the shared course catalog and completed lessons from the learner’s `lesson_progress` records.
- Subscribe to the signed-in learner’s lesson and certificate updates, then reload summary counts.
- Clamp progress to a valid percentage and handle empty or unavailable records safely.
- Verify the profile at desktop and mobile sizes and confirm the preview remains healthy.

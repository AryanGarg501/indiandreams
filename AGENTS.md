- Capacitor config ships bundled `dist` assets (no `server.url`); native icons/splash are generated from `resources/` via `npx capacitor-assets generate` — keeps store builds offline-capable and reproducible.

- Authentication emails use the managed scaffold and deployed `auth-email-hook`; do not add queue infrastructure because this project's delivery is platform-managed.

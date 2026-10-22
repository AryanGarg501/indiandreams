import type { CapacitorConfig } from '@capacitor/cli';

// Production config: the app loads bundled files from `dist` (no live preview URL).
const config: CapacitorConfig = {
  appId: 'app.lovable.bf6db18a78f04c37835f0dd7264afbf7',
  appName: 'Indian Dreams',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;

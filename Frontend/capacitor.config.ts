import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.starwiki.app",
  appName: "StarWiki",
  webDir: "dist",
  plugins: {
    splashscreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#094753",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launc_screen",
      useDialog: false,
    },
  },
};

export default config;

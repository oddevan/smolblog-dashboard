import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smolblog.dashboard',
  appName: 'Smolblog',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

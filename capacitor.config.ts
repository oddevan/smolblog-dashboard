import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'smolblog-dashboard',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.delivery.whitelabel',
  appName: 'Delivery App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

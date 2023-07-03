import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://bugsy.eba-rjbpkehi.us-east-2.elasticbeanstalk.com/',
        changeOrigin: true,
      },
    },
  },
});

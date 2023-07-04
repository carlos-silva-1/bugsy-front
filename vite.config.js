import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://bugsy-backend-7bwr0rmbu-carlos-silva-1.vercel.app/',
        changeOrigin: true,
      },
    },
  },
});

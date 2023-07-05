import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import SERVER_URL from './src/constants'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: SERVER_URL,
        changeOrigin: true,
      },
    },
  },
});

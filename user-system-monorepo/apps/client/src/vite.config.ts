// apps/client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // כתובת ופורט השרת שלך
        changeOrigin: true,
        secure: false,
        // optional rewrite, אם ה־Express שלך מאזין על /api/auth/register כמו שהוא, לא צריך rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

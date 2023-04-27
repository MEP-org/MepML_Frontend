import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc"; // or @vitejs/plugin-react
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['node_modules', 'dist', 'build', 'public'],
    })
  ],
  base: '/Prototype/'
})

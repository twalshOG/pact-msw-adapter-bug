import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  //'jsdom', // or 'node'
    setupFiles: ['./tests/setup.ts'],
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true,
    reporters: ['junit', 'verbose'],
    outputFile: {
      junit: './junit.xml'
    },
  }
})
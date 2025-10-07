import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // αγνοεί αλλαγές μέσα στο allure-results
      ignored: ['**/allure-results/**', '**/coverage/**', '**/logs/**']
    }
  }
})
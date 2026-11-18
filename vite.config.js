import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/react-demo-pokemon/' : '/',
  plugins: [react()],
}))
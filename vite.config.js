import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  server: {
    host: isDev ? '0.0.0.0' : 'localhost'
  },
  plugins: [svelte()],
})

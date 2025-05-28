import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// ⚠️ Edit: tell Vite the site’s sub-folder on GitHub Pages
const REPO_BASE = '/my-mvp-store/'          // <<— change only if you rename the repo

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    /** -------------- new line ---------------- */
    base: REPO_BASE,
    /** ---------------------------------------- */

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  }
})


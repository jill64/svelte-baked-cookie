import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      'svelte-baked-cookie/serde': './dist/serde.js',
      'svelte-baked-cookie': './dist/index.js'
    }
  }
}

export default config

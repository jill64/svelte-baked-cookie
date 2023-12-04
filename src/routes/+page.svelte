<script lang="ts">
  import { browser } from '$app/environment'
  import { Highlight, HighlightSvelte } from 'svelte-highlight'
  import { typescript } from 'svelte-highlight/languages'
  import { rebake } from './bakery.js'
  import bakerySource from './bakery.js?raw'
  import { sample } from './sample.js'
  import { serverSample } from './serverSample'

  export let data

  $: ({ pie } = data)

  $: cookies = rebake(pie)
  $: ({ key1, key2, key3 } = cookies)
</script>

<h2 class="my-2 font-semibold text-xl">
  Render by {browser ? 'browser' : 'server'}
</h2>

<main class="flex flex-col">
  <code>key1: <input bind:value={$key1} placeholder="key1" /></code>
  <code>key2: <input bind:value={$key2} type="number" /></code>
  <code>key3: {JSON.stringify($key3)}</code>
</main>

bakery.js
<Highlight
  code={bakerySource.replace('$lib/bakery', 'svelte-baked-cookie').trim()}
  language={typescript}
/>

+layout.server.js
<Highlight code={serverSample.trim()} language={typescript} />

+layout.svelte
<HighlightSvelte code={sample} />

<style lang="postcss">
  code {
    @apply m-2;
  }
</style>

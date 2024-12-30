<script lang="ts">
  import { browser } from '$app/environment'
  import { Highlight, HighlightSvelte } from '@jill64/npm-demo-layout/highlight'
  import { typescript } from '@jill64/npm-demo-layout/highlight/languages'
  import { Decimal } from '@jill64/svelte-input'
  import { rebake } from './bakery.js'
  import bakerySource from './bakery.js?raw'
  import { sample } from './sample.js'
  import { serverSample } from './serverSample'

  let { data } = $props()

  let pie = $derived(data.pie)

  let cookies = $derived(rebake(pie))
</script>

<h2 class="my-2 font-semibold text-xl">
  Render by {browser ? 'browser' : 'server'}
</h2>

<main class="flex flex-col my-4 gap-4">
  <code>
    key1:
    <input
      bind:value={cookies.key1}
      class="border-bottom py-1 border-gray-400 dark:border-gray-600 focus-under focus:border-purple-400 dark:focus:border-purple-900"
      placeholder="key1"
    />
  </code>
  <code>
    key2:
    <Decimal
      Class="border border-gray-400 dark:border-gray-600 p-1 rounded"
      buttonClass="border p-2 border-gray-400 dark:border-gray-600 p-1 rounded-full"
      bind:value={cookies.key2}
    />
  </code>
  <code>key3: {JSON.stringify(cookies.key3)}</code>
</main>

<Highlight code={bakerySource} language={typescript} />
<Highlight code={serverSample} language={typescript} />
<HighlightSvelte code={sample} />

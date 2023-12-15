export const sample = /* html */ `
<!-- +layout.svelte -->
<script>
  import { rebake } from 'bakery.js'

  export let data

  $: ({ pie } = data)

  $: cookies = rebake(pie)
  $: ({ key1, key2, key3 } = cookies)
</script>

<main>
  <code>key1: <input bind:value={$key1} /></code>
  <code>key2: <input bind:value={$key2} type="number" /></code>
  <code>key3: {JSON.stringify($key3)}</code>
</main>
`

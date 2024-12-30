export const sample = /* html */ `
<!-- +layout.svelte -->
<script>
  import { rebake } from 'bakery.js'

  let { data } = $props()

  let pie = $derived(data.pie)

  let c = $derived(rebake(pie))
</script>

<main>
  <code>key1: <input bind:value={c.key1} /></code>
  <code>key2: <input bind:value={c.key2} type="number" /></code>
  <code>key3: {JSON.stringify(c.key3)}</code>
</main>
`

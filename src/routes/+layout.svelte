<script lang="ts">
  import { Layout } from '@jill64/npm-demo-layout'
  import README from '../../README.md?raw'
  import packageJson from '../../package.json'
  import '../app.postcss'
</script>

<Layout {packageJson} {README}>
  <slot />
</Layout>

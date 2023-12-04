<script lang="ts">
  import { FlipButton, ThemeManager, theme } from '@jill64/svelte-dark-theme'
  import { HighlightSwitcher } from 'svelte-highlight-switcher'
  import '../app.postcss'
  import GitHubLogo from './GitHubLogo.svelte'
</script>

<ThemeManager />
<HighlightSwitcher name={$theme === 'dark' ? 'githubDark' : 'github'} />

<svelte:head>
  <title>svelte-baked-cookie</title>
  <meta
    name="description"
    content="🍪 Universal accessible hard-baked cookies for SvelteKit"
  />
</svelte:head>

<header class="flex items-center justify-between gap-4 p-4">
  <hgroup class="mr-auto">
    <h1 class="font-bold text-4xl my-2">svelte-baked-cookie</h1>
    <p class="leading-loose">
      🍪 Universal accessible hard-baked cookies for SvelteKit
    </p>
  </hgroup>
  <FlipButton />
  <a href="https://github.com/jill64/svelte-baked-cookie">
    <GitHubLogo />
  </a>
</header>

<slot />

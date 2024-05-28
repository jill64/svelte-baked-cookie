<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-baked-cookie


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/svelte-baked-cookie"><img src="https://img.shields.io/npm/v/svelte-baked-cookie" alt="npm-version" /></a> <a href="https://npmjs.com/package/svelte-baked-cookie"><img src="https://img.shields.io/npm/l/svelte-baked-cookie" alt="npm-license" /></a> <a href="https://npmjs.com/package/svelte-baked-cookie"><img src="https://img.shields.io/npm/dm/svelte-baked-cookie" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/svelte-baked-cookie"><img src="https://img.shields.io/bundlephobia/min/svelte-baked-cookie" alt="npm-min-size" /></a> <a href="https://github.com/jill64/svelte-baked-cookie/actions/workflows/ci.yml"><img src="https://github.com/jill64/svelte-baked-cookie/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a> <a href="https://svelte-baked-cookie.jill64.dev"><img src="https://img.shields.io/website?up_message=working&down_message=down&url=https%3A%2F%2Fsvelte-baked-cookie.jill64.dev" alt="website" /></a>
<!----- END GHOST DOCS BADGES ----->


🍪 Universal accessible hard-baked cookies for SvelteKit

## [Demo](https://svelte-baked-cookie.jill64.dev)

<!----- END GHOST DOCS HEADER ----->

From a single schema, type-defined cookies can be accessed in any environment.

## Installation

```bash
npm i svelte-baked-cookie
```

## Usage

1.  Use the `bakery` function to define the cookie type and get `bake` and `rebake`.

```ts
// bakery.js
import { bakery } from 'svelte-baked-cookie'
import { json, number, string } from 'svelte-baked-cookie/serde'

export const { bake, rebake } = bakery(
  {
    key1: string,
    key2: number,
    key3: json(
      (x): x is string[] =>
        Array.isArray(x) && x.every((y) => typeof y === 'string'),
      []
    )
  }
  // {
  //   CookieSetOptions: (optional)
  // }
)
```

2. In the server, you can get a typed accessor by passing a `cookies` object obtained from `load`, etc. to the `bake` function.

```ts
// +layout.server.js
import { bake } from './bakery.js'

export const load = ({ cookies }) => {
  const { bakedCookies } = bake(cookies)

  // string
  const str = bakedCookies.key1.get()

  // number
  const num = bakedCookies.key2.set()

  // string[]
  bakedCookies.key3.set(['value', 'set', 'by', 'server'])

  return {
    // ...
  }
}
```

3. On the client, the `rebake` function can be used directly to obtain a `writable` svelte-store of typed cookies.

```svelte
<!-- +page.svelte -->
<script>
  import { rebake } from './bakery.js'

  const cookies = rebake()

  // key1: Writable<string>
  // key2: Writable<number>
  // key3: Writable<string[]>
  const { key1, key2, key3 } = cookies

  // string
  $: console.log($key1)

  // string
  $: $key2 = 123
  // or
  $: key2.set(123)

  // string[]
  $: $key3 = ['value', 'set', 'by', 'client']
  // or
  $: key3.set(['value', 'set', 'by', 'client'])
</script>
```

4. (optional): When using SSRs, this may not be sufficient.  
   When rendering svelte components on the server, the server's cookie cannot be accessed directly, which may result in display flickering.  
   To solve this, you need to pass the cookie `pie` from +layout.server.js, etc. and make it the `dough` of `rebake` .

```ts
// +layout.server.ts
import { bake } from './bakery.js'

export const load = ({ cookies }) => {
  const { bakedCookies, pie } = bake(cookies)

  // ...

  return {
    pie
  }
}
```

```svelte
<!-- +layout.svelte -->
<script>
  import { rebake } from './bakery.js'

  export let data

  $: ({ pie } = data)

  $: cookies = rebake(pie)

  // key1: Writable<string>
  // key2: Writable<number>
  // key3: Writable<string[]>
  $: { key1, key2, key3 } = cookies
</script>
```

This is optional, but it provides full consistency and typed cookie access to the application.

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->

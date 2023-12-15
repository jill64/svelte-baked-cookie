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
  },
  {
    path: '/',
    secure: false
  }
)

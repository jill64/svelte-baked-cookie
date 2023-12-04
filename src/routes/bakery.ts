import { bakery } from '$lib/bakery'
import { json } from 'ts-serde/object'
import { number, string } from 'ts-serde/primitive'

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
    secure: false
  }
)

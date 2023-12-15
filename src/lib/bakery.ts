import { browser, dev } from '$app/environment'
import { transform } from '@jill64/transform'
import type { Cookies } from '@sveltejs/kit'
import cookie from 'cookie'
import { writable, type Writable } from 'svelte/store'
import type { Serde } from 'ts-serde'

type Pie = Record<string, string>
type RSerde<T> = T extends Serde<infer U> ? U : never
type BakedCookie<T> = {
  get: () => T
  set: (value: T) => void
}

export const bakery =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Schema extends Record<string, Serde<any>>>(
    schema: Schema,
    options?: Parameters<Cookies['set']>[2]
  ) => {
    const opts: Parameters<Cookies['set']>[2] = {
      secure: dev ? false : true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year,
      httpOnly: false,
      ...options
    }

    const bake = (cookies: Cookies) => {
      const bakedCookies = transform(
        schema,
        ([key, { deserialize, serialize }]) => {
          const bakedCookie: BakedCookie<unknown> = {
            get: () => deserialize(cookies.get(key) ?? ''),
            set: (value: unknown) => {
              cookies.set(key, serialize(value), opts)
            }
          }

          return [key, bakedCookie]
        }
      ) as {
        [Key in keyof Schema]: BakedCookie<RSerde<Schema[Key]>>
      }

      const pie: Pie = transform(schema, ([key]) => [
        key,
        cookies.get(key) ?? ''
      ])

      return {
        bakedCookies,
        pie
      }
    }

    const rebake = (pie?: Pie) => {
      const getCookie = (key: string) =>
        (pie ?? (browser ? cookie.parse(document.cookie) : {}))[key] || ''

      return transform(schema, ([key, { serialize, deserialize }]) => {
        const store = writable(deserialize(getCookie(key)))

        const set = (value: unknown) => {
          store.set(value)
          document.cookie = cookie.serialize(key, serialize(value), opts)
        }

        const cookieStore: Writable<unknown> = {
          subscribe: store.subscribe,
          set,
          update: (fn) => set(fn(getCookie(key)))
        }

        return [key, cookieStore]
      }) as {
        [Key in keyof Schema]: Writable<RSerde<Schema[Key]>>
      }
    }

    return {
      bake,
      rebake
    }
  }

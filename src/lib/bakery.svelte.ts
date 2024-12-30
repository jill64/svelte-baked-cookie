import { browser, dev } from '$app/environment'
import { transform } from '@jill64/transform'
import type { Cookies } from '@sveltejs/kit'
import cookie from 'cookie'
import type { Serde } from 'ts-serde'

type Pie = Record<string, string>
type RSerde<T> = T extends Serde<infer U> ? U : never

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
      const bakedCookies = {} as {
        [Key in keyof Schema]: RSerde<Schema[Key]>
      }

      const entries = Object.entries(schema)

      const descriptors = entries.reduce(
        (acc, [key, { serialize, deserialize }]) => {
          // @ts-expect-error Invalid property descriptor.
          acc[key] = {
            get() {
              return deserialize(cookies.get(key) ?? '')
            },
            set(value: unknown) {
              cookies.set(key, serialize(value), opts)
            },
            enumerable: true,
            configurable: true
          }
          return acc
        },
        {}
      )

      Object.defineProperties(bakedCookies, descriptors)

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

      const rebakedCookies = {} as {
        [Key in keyof Schema]: RSerde<Schema[Key]>
      }

      const entries = Object.entries(schema)

      const descriptors = entries.reduce(
        (acc, [key, { serialize, deserialize }]) => {
          let store = $state(deserialize(getCookie(key)))

          // @ts-expect-error Invalid property descriptor.
          acc[key] = {
            get() {
              return store
            },
            set(value: unknown) {
              store = value
              document.cookie = cookie.serialize(key, serialize(value), opts)
            },
            enumerable: true,
            configurable: true
          }
          return acc
        },
        {}
      )

      Object.defineProperties(rebakedCookies, descriptors)

      return rebakedCookies
    }

    return {
      bake,
      rebake
    }
  }

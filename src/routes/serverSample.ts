export const serverSample = `
// +layout.server.js
import { bake } from 'bakery.js'

export const load = ({ cookies }) => {
  const { bakedCookies, pie } = bake(cookies)

  bakedCookies.key3 = ['value', 'set', 'by', 'server']

  return {
    pie
  }
}`

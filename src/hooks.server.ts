import { init } from '@jill64/sentry-sveltekit-cloudflare/server'
import { onRender } from '@jill64/svelte-dark-theme'

const { onHandle, onError } = init(
  'https://8b835957bea71aaebb9c037d34259071@o4505814639312896.ingest.sentry.io/4506325513863168'
)

export const handle = onHandle(onRender())
export const handleError = onError()

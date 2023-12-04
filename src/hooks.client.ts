import { init } from '@jill64/sentry-sveltekit-cloudflare/client'

const onError = init(
  'https://8b835957bea71aaebb9c037d34259071@o4505814639312896.ingest.sentry.io/4506325513863168'
)

export const handleError = onError()

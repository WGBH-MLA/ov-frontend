import { replace } from '@remix-run/node'
import type { LoaderFunctionArgs, LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const query = url.searchParams

  console.log('redirecting to /search/ov', query)

  return replace('/search/ov', {
    params: url.searchParams,
  })
}

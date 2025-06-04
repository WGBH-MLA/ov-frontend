import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'

/*
On Ye Olde Opene Vaulte, this route used to handle catalog search requests.
There's no such thing as a catalog in Open Vault anymore, 
so we permanently kill the request, since their query is meaningless to us now.
*/
export const loader: LoaderFunction = async () => {
  throw new Response(null, { status: 418 })
}

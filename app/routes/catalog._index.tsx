import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'

/*
On Ye Olde Opene Vaulte, this route used to handle catalog search requests.
There's no such thing as a catalog in Open Vault anymore, 
so we permanently redirect to the AAPB search page with GBH material pre-selected,
since their query is meaningless to AAPB
*/
export const loader: LoaderFunction = async () => {
  let aapbHost = process.env.AAPB_HOST

  return redirect(
    `${aapbHost}/catalog?q=(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all`,
    301
  )
}

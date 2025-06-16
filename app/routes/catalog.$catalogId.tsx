import { useRouteError } from '@remix-run/react'
import { redirectDocument } from '@remix-run/node'
import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import type { Guid } from '~/types/pbcore'
export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let guid: Guid = await resolveCatalog(params.catalogId)
  console.log(
    `Redirecting old OV id: ${params.catalogId} to AAPB guid: ${guid}`
  )

  return redirectDocument(`https://americanarchive.org/catalog/${guid}`)
}

export async function resolveCatalog(id: string): Promise<Guid> {
  if (!id.startsWith('A_') && !id.startsWith('V_')) {
    throw new Response(`Invalid Open Vault Catalog ID: ${id}`, {
      status: 400,
      statusText: 'Open Vault Catalog IDs start with "A_" or "V_"',
    })
  }
  console.log('checking OV id', id)

  // Check Organ for a matching OV catalog ID
  const results = await fetch(`${process.env.ORGAN_URL}/ov/${id}`)
    .then(res => {
      if (res.status === 404) {
        throw new Response(`Catalog ID not found: ${id}`, {
          status: 404,
          statusText: 'No matching GUID found for Open Vault Catalog ID',
        })
      }
      if (res.status !== 200) {
        throw new Response(`Error fetching catalog ID`, {
          status: res.status,
          statusText: res.statusText,
        })
      }
      return res.json()
    })
    .catch(err => {
      if (err instanceof Response) throw err
      throw new Response(`Error fetching catalog ID`, {
        status: 500,
        statusText:
          'An error occured while resolving this old Open Vault catalog ID. Please try again later.',
      })
    })
  console.log('Resolved guid!', results)
  // It's an older code, sir, but it checks out. I was about to redirect them.
  return results.guid
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.log('cat error', error)
  return (
    <div className='page-body-container'>
      {error.status === 404 ? (
        <h1>Not found</h1>
      ) : (
        <h1>{error.status} Error</h1>
      )}
      <h3>{error.data}</h3>
      <div>{error.statusText}</div>
    </div>
  )
}

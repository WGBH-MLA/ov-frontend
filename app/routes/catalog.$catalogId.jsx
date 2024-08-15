import { useLoaderData, useRouteError } from '@remix-run/react'
// import { ErrorBoundary } from './exhibits.$exhibitPath'

export const loader = async ({ params }) => {
  return params.catalogId
}

export default function Catalog() {
  const id = useLoaderData()

  if (!id) {
    throw new Response('No ID provided', { status: 400 })
  }

  if (!id.startsWith('A_') && !id.startsWith('V_')) {
    throw new Response(`Invalid Open Vault Catalog ID: ${id}`, { status: 400, statusText: 'Open Vault Catalog IDs start with "A_" or "V_"' })
  }

  return id
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.log('cat error', error)
  return (
    <div className="page-body-container">
      <h1>Not found</h1>
      <h3>{error.data}</h3>
      <div>{error.statusText}</div>
    </div>
  )
}

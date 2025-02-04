import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData, useRouteError } from '@remix-run/react'

import { Search } from '~/classes/search-ui'
import 'instantsearch.css/themes/algolia-min.css'
import '~/styles/search.css'
import { Meta } from '~/classes/meta'

export const TABS = ['', '#gbh', '#aapb', '#help']

export const meta: MetaFunction = ({ location }) => {
  const query = new URLSearchParams(location.search).get('q')
  return [
    {
      title: `${query ? query + ' | ' : ''}Search GBH Open Vault`,
    },
    {
      name: 'description',
      content:
        'Search the GBH Open Vault catalog, Scholar Exhibits and Special Collections.',
    },
    ...Meta,
  ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const serverUrl = request.url
  const aapb_host = process.env.AAPB_HOST

  return {
    serverUrl,
    aapb_host,
  }
}

export type SearchProps = {
  serverUrl?: string
  aapb_host?: string
}

export default function SearchPage() {
  const { serverUrl, aapb_host }: SearchProps = useLoaderData()
  return (
    <>
      <div className='page-body-container'>
        <h1>Search Open Vault</h1>
        <Search serverUrl={serverUrl} aapb_host={aapb_host} />
      </div>
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.log('search error', error)
  return (
    <div className='page-body-container'>
      <h1>Search Error</h1>
      <h4>We're sorry! Search appears to be broken!</h4>
      <pre>{error.message}</pre>
    </div>
  )
}

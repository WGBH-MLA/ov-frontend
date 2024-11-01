import { RefinementList, InstantSearchServerState } from 'react-instantsearch'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useRouteError } from '@remix-run/react'
import { Panel } from '~/components/Panel'
import { Search } from '~/classes/search-ui'
import 'instantsearch.css/themes/algolia-min.css'
import '~/styles/search.css'
import { Meta } from '~/classes/meta'
import { useNavigation } from '@remix-run/react'

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

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url
  const aapb_host = process.env.AAPB_HOST

  return json({
    serverUrl,
    aapb_host,
  })
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  )
}

export type SearchProps = {
  serverUrl?: string
  aapb_host?: string
}

export default function SearchPage() {
  const { serverUrl, aapb_host }: SearchProps = useLoaderData()
  return (
    <>
      <div className="page-body-container">
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
    <div>
      <h1>Search Error</h1>
      <h4>We're sorry! Search appears to be broken!</h4>
      <pre>{error.message}</pre>
    </div>
  )
}

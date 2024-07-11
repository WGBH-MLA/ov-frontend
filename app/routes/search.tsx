import { renderToString } from 'react-dom/server'
import { RefinementList, getServerState } from 'react-instantsearch'
import { useInstantSearch } from 'react-instantsearch-core'
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Panel } from '../components/Panel'
import { Search } from '../classes/search-ui'
import 'instantsearch.css/themes/algolia-min.css'
import '../styles/search.css'

export const links: LinksFunction = () => []

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url
  const aapb_host = process.env.AAPB_HOST || 'https://demo.aapb.wgbh-mla.org'
  const serverState = await getServerState(
    <Search serverUrl={serverUrl} aapb_host={aapb_host} />,
    {
      renderToString,
    }
  )

  return json({
    serverState,
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
  serverState?: InstantSearchServerState
  serverUrl?: string
  aapb_host?: string
}
export default function SearchPage() {
  const { serverState, serverUrl, aapb_host }:SearchProps = useLoaderData()
  return (
    <Search
      serverState={serverState}
      serverUrl={serverUrl}
      aapb_host={aapb_host}
    />
  )
}

import { renderToString } from 'react-dom/server'
import {
  DynamicWidgets,
  Hits,
  InstantSearch,
  InstantSearchSSRProvider,
  Pagination,
  RefinementList,
  SearchBox,
  getServerState,
} from 'react-instantsearch'
import { useInstantSearch } from 'react-instantsearch-core'

import { history } from 'instantsearch.js/cjs/lib/routers/index.js'

import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Hit } from '../components/Hit'
import { Panel } from '../components/Panel'
import { ScrollTo } from '../components/ScrollTo'
import { NoResultsBoundary } from '../components/NoResultsBoundary'
import { SearchErrorToast } from '../components/SearchErrorToast'
import { searchClient, Search } from '../classes/search-ui'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: '../node_modules/instantsearch.css/themes/satellite-min.css',
  },
]

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url
  const serverState = await getServerState(<Search serverUrl={serverUrl} />, {
    renderToString,
  })
  const aapb_host = process.env.AAPB_HOST || 'https://demo.aapb.wgbh-mla.org'

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

function NoResults() {
  const { indexUiState } = useInstantSearch()

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  )
}

export default function SearchPage() {
  const { serverState, serverUrl, aapb_host } = useLoaderData()
  // console.log('serverState', serverState)
  return (
    <Search
      serverState={serverState}
      serverUrl={serverUrl}
      aapb_host={aapb_host}
    />
  )
}

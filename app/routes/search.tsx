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
import { useInstantSearch } from 'react-instantsearch-core';

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
  { rel: 'stylesheet', href: '../node_modules/instantsearch.css/themes/satellite-min.css' },
]

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url
  const serverState = await getServerState(<Search serverUrl={serverUrl} />, {
    renderToString,
  })

  return json({
    serverState,
    serverUrl,
  })
}

function SearchExample({ serverState, serverUrl }: SearchProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="wagtail__wagtailcore_page"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(serverUrl!) as unknown as Location
              }

              return window.location
            },
          }),
        }}
      >
        <SearchErrorToast />

        <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
          <div>
            <DynamicWidgets fallbackComponent={FallbackComponent} />
          </div>

          <div className="flex flex-col w-full gap-8">
            <SearchBox />
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
                  item: 'p-2 w-full',
                }}
              />
              <Pagination className="flex self-center" />
            </NoResultsBoundary>
          </div>
        </ScrollTo>
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
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
  const { serverState, serverUrl } = useLoaderData()
  console.log('serverState', serverState)
  return <Search serverState={serverState} serverUrl={serverUrl} />
}

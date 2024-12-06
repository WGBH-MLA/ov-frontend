import React, { useState, useRef } from 'react'
import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import searchkit_options from '~/data/searchkit'
import { InstantSearch, SearchBox, Index } from 'react-instantsearch'
import { Error } from '~/components/Error'
import { EmptyQueryBoundary, EmptyQueryMessage } from '~/components/EmptyQuery'
import { ScrollTo } from '~/components/ScrollTo'
import { OVResults } from '~/components/OVResults'
import { ResultsCount } from '~/components/Results'
import { SeriesResults } from '~/components/Series'
import { AAPBResults } from '~/components/AAPBResults'
import Help from '~/components/Help'
import { SearchProps, TABS } from '~/routes/search.$'
import { Router, stateToRoute, routeToState } from '~/components/Router'
import { Tabs, Tab } from '@mui/material'
import {
  useRouteLoaderData,
  useMatches,
  useNavigate,
  useSearchParams,
  useResolvedPath,
  useLoaderData,
} from '@remix-run/react'

const INDICES = ['wagtail__wagtailcore_page', 'gbh-series']

const sk = new Searchkit(searchkit_options)

export const searchClient = Client(sk, {
  getQuery: (query, search_attributes) => {
    console.log('search query', query, search_attributes)
    return [
      {
        simple_query_string: {
          query,
        },
      },
    ]
  },
})

export const Search = () => {
  const { serverUrl, aapb_host, initial_tab }: SearchProps = useLoaderData()

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(initial_tab)
  const stateRef = useRef()
  stateRef.current = activeTab
  let timerId: NodeJS.Timeout
  let timeout: number = 250
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    navigate({
      pathname: `/search/${TABS[newValue]}`,
      search: searchParams.toString(),
    })
    setActiveTab(newValue)
  }
  return (
    <InstantSearch
      searchClient={searchClient}
      routing={{
        router: Router(serverUrl),
        stateMapping: {
          stateToRoute,
          routeToState,
        },
      }}
      indexName='wagtail__wagtailcore_page'
      future={{
        preserveSharedStateOnUnmount: true,
      }}>
      <ScrollTo>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab
            label={
              <span>
                Open Vault <ResultsCount />
              </span>
            }
          />
          <Tab
            label={
              <span>
                <Index indexName='gbh-series'>
                  GBH Series <ResultsCount />
                </Index>
              </span>
            }
          />
          <Tab label='American Archive' />
          <Tab label='Help' />
        </Tabs>
      </ScrollTo>
      <SearchBox
        autoFocus
        placeholder={
          activeTab === 0
            ? 'Search GBH Open Vault'
            : activeTab === 1
            ? 'Search GBH Series'
            : activeTab === 2
            ? 'Search American Archive'
            : ''
        }
        queryHook={(query, search) => {
          // console.log('searchbox', search)
          // debounce the search input box

          clearTimeout(timerId)
          timerId = setTimeout(() => search(query), timeout)
        }}
      />

      <Error />
      {activeTab !== 3 && (
        <EmptyQueryBoundary fallback={<EmptyQueryMessage />}>
          {null}
        </EmptyQueryBoundary>
      )}
      {activeTab === 0 && <OVResults />}
      {activeTab === 1 && <SeriesResults aapb_host={aapb_host} />}
      {activeTab === 2 && <AAPBResults aapb_host={aapb_host} />}
      {activeTab === 3 && <Help setActiveTab={setActiveTab} />}
    </InstantSearch>
  )
}

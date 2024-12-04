import React, { useState } from 'react'
import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import searchkit_options from '~/data/searchkit.json'
import { InstantSearch, SearchBox } from 'react-instantsearch'
import { Error } from '~/components/Error'
import { EmptyQueryBoundary, EmptyQueryMessage } from '~/components/EmptyQuery'
import { ScrollTo } from '~/components/ScrollTo'
import { OVResults } from '~/components/Hit'
import { SeriesResults } from '~/components/Series'
import { NoResultsBoundary, NoResultsMessage } from '~/components/NoResults'
import { AAPBResults } from '~/components/AAPBResults'
import Help from '~/components/Help'
import { SearchProps } from '~/routes/search'
import { Router, stateToRoute, routeToState } from '~/components/Router'
import { Tabs, Tab } from '@mui/material'

import { useLoaderData } from '@remix-run/react'

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
  const { serverUrl, aapb_host }: SearchProps = useLoaderData()
  const [activeTab, setActiveTab] = useState(0)
  let timerId: NodeJS.Timeout
  let timeout: number = 250
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <InstantSearch
      searchClient={searchClient}
      routing={{
        router: Router(serverUrl),
        stateMapping: { stateToRoute, routeToState },
      }}
      indexName='wagtail__wagtailcore_page'
      future={{
        preserveSharedStateOnUnmount: true,
      }}>
      <ScrollTo>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='Open Vault' />
          <Tab label='GBH Series' />
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
      <EmptyQueryBoundary fallback={<EmptyQueryMessage />}>
        {null}
      </EmptyQueryBoundary>
      {activeTab === 0 && <OVResults />}
      {activeTab === 1 && <SeriesResults aapb_host={aapb_host} />}
      {activeTab === 2 && <AAPBResults aapb_host={aapb_host} />}
      {activeTab === 3 && <Help />}
    </InstantSearch>
  )
}

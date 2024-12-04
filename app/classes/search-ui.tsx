import React, { useState } from 'react'
import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import searchkit_options from '~/data/searchkit.json'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Index,
  Pagination,
  HitsPerPage,
} from 'react-instantsearch'
import { Error } from '~/components/Error'
import { EmptyQueryBoundary, EmptyQueryMessage } from '~/components/EmptyQuery'
import { ScrollTo } from '~/components/ScrollTo'
import { Hit } from '~/components/Hit'
import { Carousel } from '~/components/Carousel'
import { NoResultsBoundary, NoResultsMessage } from '~/components/NoResults'
import { AAPBResults } from '~/components/AAPBResults'
import { Refinements } from '~/components/Refinements'
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
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label='Open Vault' />
        <Tab label='GBH Series' />
        <Tab label='American Archive' />
        <Tab label='Help' />
      </Tabs>
      <ScrollTo className='max-w-6xl p-4 flex gap-4 m-auto'>
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
      </ScrollTo>

      <Error />
      <EmptyQueryBoundary fallback={<EmptyQueryMessage />}>
        {null}
      </EmptyQueryBoundary>
      {activeTab === 0 && (
        <Index indexName='wagtail__wagtailcore_page'>
          <NoResultsBoundary fallback={<NoResultsMessage />}>
            <Refinements />
            <Hits hitComponent={Hit} />
            <Pagination />
            Results per page
            <HitsPerPage
              items={[
                { value: 5, label: '5' },
                { value: 10, label: '10', default: true },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
            />
          </NoResultsBoundary>
        </Index>
      )}
      {activeTab === 1 && (
        <Index indexName='gbh-series'>
          <NoResultsBoundary fallback={<NoResultsMessage />}>
            <h3>GBH Series results</h3>
            <Carousel aapb_host={aapb_host} />
          </NoResultsBoundary>
        </Index>
      )}
      {activeTab === 2 && <AAPBResults aapb_host={aapb_host} />}
      {activeTab === 3 && <Help />}
    </InstantSearch>
  )
}

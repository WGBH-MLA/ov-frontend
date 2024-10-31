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
  Configure,
} from 'react-instantsearch'
import {
  Error,
  EmptyQueryBoundary,
  NoResultsBoundary,
  LoadingIndicator,
  EmptyQueryMessage,
} from './search-utils'
import { ScrollTo } from '~/components/ScrollTo'
import { Hit } from '~/components/Hit'
import { Carousel } from '~/components/Carousel'
import { NoResults } from '~/components/NoResults'
import { AAPBResults } from '~/components/AAPBResults'
import { Refinements } from '~/components/Refinements'
import { SearchProps } from '~/routes/search'
import { Router, stateToRoute, routeToState } from '~/components/Router'
import { Tabs, Tab } from '@mui/material'

import { useLoaderData, useRouteError } from '@remix-run/react'

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
  let timeout: number = 300
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
      insights={false}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
        <div className="search-results">
          <SearchBox
            autoFocus
            placeholder="Search exhibits, collections, and Series from GBH"
            // queryHook={(query, search) => {
            //   // console.log('searchbox', search)
            //   // debounce the search input box

            //   clearTimeout(timerId)
            //   timerId = setTimeout(() => search(query), timeout)
            // }}
            className="search-box"
          />
          <Error />
          <EmptyQueryBoundary fallback={<EmptyQueryMessage />}>
            <LoadingIndicator />
          </EmptyQueryBoundary>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Open Vault" />
            <Tab label="GBH Series" />
            <Tab label="American Archive" />
            <Tab label="Settings" />
          </Tabs>
          {activeTab === 0 && (
            <Index indexName="wagtail__wagtailcore_page">
              <NoResultsBoundary fallback={<NoResults />}>
                <h2>Open Vault results</h2>
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
            <Index indexName="gbh-series">
              <NoResultsBoundary fallback={null}>
                <h3>GBH Series results</h3>
                <Carousel aapb_host={aapb_host} />
              </NoResultsBoundary>
            </Index>
          )}
          {activeTab === 2 && <AAPBResults aapb_host={aapb_host} />}
          {activeTab === 3 && <div>Settings</div>}
        </div>
      </ScrollTo>
    </InstantSearch>
  )
}

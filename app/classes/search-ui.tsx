import React, { useState, useRef } from 'react'
import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import searchkit_options from '~/data/searchkit'
import { InstantSearch, SearchBox, Index } from 'react-instantsearch'

import { SearchProps } from '~/routes/search'
import {
  Error,
  ScrollTo,
  Tabs,
  Tab,
  Router,
  stateToRoute,
  routeToState,
  OVResults,
  ResultsCount,
  SeriesResults,
  AAPBResults,
  Help,
  EmptyQueryMessage,
  EmptyQueryBoundary,
} from '~/components'
import { useLoaderData } from '@remix-run/react'

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
  const { serverUrl, aapb_host }: SearchProps = useLoaderData()

  let timerId: NodeJS.Timeout
  let timeout: number = 250

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
        <SearchBox
          autoFocus
          placeholder='Search GBH Open Vault'
          queryHook={(query, search) => {
            // console.log('searchbox', search)
            // debounce the search input box

            clearTimeout(timerId)
            timerId = setTimeout(() => search(query), timeout)
          }}
        />
        <EmptyQueryBoundary fallback={<EmptyQueryMessage />}>
          {null}
        </EmptyQueryBoundary>
        <Tabs>
          <Tab
            title={
              <span>
                Open Vault <ResultsCount />
              </span>
            }>
            <OVResults />
          </Tab>
          <Tab
            title={
              <span>
                <Index indexName='gbh-series'>
                  GBH Series <ResultsCount />
                </Index>
              </span>
            }>
            <SeriesResults aapb_host={aapb_host} />
          </Tab>
          <Tab title='American Archive'>
            <AAPBResults aapb_host={aapb_host} />
          </Tab>
          <Tab title='Help'>
            <Help />
          </Tab>
        </Tabs>
      </ScrollTo>

      <Error />
    </InstantSearch>
  )
}

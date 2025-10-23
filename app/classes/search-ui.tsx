import { InstantSearch, SearchBox, Index, Configure } from 'react-instantsearch'
import { useState, useCallback } from 'react'

import { SearchProps } from '~/routes/search'
import {
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
  AAPBResultCount,
} from '~/components'

export const Search = ({
  serverUrl,
  aapbHost,
  searchClient,
  ovIndexName,
  gbhSeriesIndexName,
}: SearchProps) => {
  let timerId: NodeJS.Timeout
  let timeout: number = 250

  const [aapbResultCount, setAapbResultCount] = useState<number | null>(null)
  const handleResultCountChange = useCallback((count: number | null) => {
    setAapbResultCount(count)
  }, [])

  return (
    <InstantSearch
      searchClient={searchClient}
      routing={{
        router: Router(serverUrl),
        // stateMapping: {
        //   stateToRoute,
        //   routeToState,
        // },
      }}
      indexName={ovIndexName}
      future={{
        preserveSharedStateOnUnmount: true,
      }}>
      {/* <Configure filters='live:true AND id>3' /> */}
      <ScrollTo>
        <SearchBox
          autoFocus
          placeholder='Search GBH Open Vault'
          queryHook={(query, search) => {
            console.debug('searchbox', search)
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
            <OVResults indexName={ovIndexName} />
          </Tab>
          <Tab
            title={
              <span>
                <Index indexName='gbh-series'>
                  <Configure filters='' />
                  GBH Series <ResultsCount />
                </Index>
              </span>
            }>
            <SeriesResults
              aapbHost={aapbHost}
              gbhSeriesIndexName={gbhSeriesIndexName}
            />
          </Tab>
          <Tab
            title={
              <span>
                American Archive
                <AAPBResultCount resultCount={aapbResultCount} />
              </span>
            }>
            <AAPBResults
              aapbHost={aapbHost}
              onResultCountChange={handleResultCountChange}
            />
          </Tab>
          <Tab title='Help'>
            <Help />
          </Tab>
        </Tabs>
      </ScrollTo>
    </InstantSearch>
  )
}

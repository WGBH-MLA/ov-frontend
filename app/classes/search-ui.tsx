import { InstantSearch, SearchBox, Index, Configure } from 'react-instantsearch'

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

export const Search = ({ serverUrl, aapbHost, searchClient }: SearchProps) => {
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
                <Index indexName='wagtail__wagtailcore_page'>
                  <Configure filters='live:true AND id>3' />
                  Open Vault <ResultsCount />
                </Index>
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
            <SeriesResults aapbHost={aapbHost} />
          </Tab>
          <Tab title='American Archive'>
            <AAPBResults aapbHost={aapbHost} />
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

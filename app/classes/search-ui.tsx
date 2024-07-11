import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import {
  InstantSearch,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch-core'
import {
  SearchBox,
  Hits,
  RefinementList,
  Index,
  Configure,
  ToggleRefinement,
  InstantSearchSSRProvider,
  DynamicWidgets,
  Pagination,
  HitsPerPage,
} from 'react-instantsearch'
import {
  Error,
  EmptyQueryBoundary,
  NoResultsBoundary,
  LoadingIndicator,
  HiddenClearRefinements,
} from './search-utils'
import { SearchErrorToast } from '../components/SearchErrorToast'
import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import { ScrollTo } from '../components/ScrollTo'
import { Hit } from '../components/Hit'
import { Carousel } from '../components/Carousel'
import { NoResults } from '../components/NoResults'
import { AAPBResults } from '../components/AAPBResults'
import { Refinements } from '../components/Refinements'
import { useEffect } from 'react'
import { SearchProps } from '../routes/search'

// Labels for refinements
const ATTRIBUTES = { content_type: 'Type', featured: 'Featured' }

// Labels for content types
const CONTENT_TYPES = {
  'exhibits.ExhibitPage': 'Exhibits',
  'ov_collections.Collection': 'Collections',
}

const sk_options = {
  connection: {
    host: 'https://elastic.wgbh-mla.org',
    // Base64 encoded id:api_key
    apiKey: 'X3NoUXlJMEJZNE9yTDhJMHdMSEQ6N1RLcDQxYm9USEdCV1ByeXJ4MXFDUQ==',
  },
  search_settings: {
    search_attributes: [
      { field: 'title', weight: 3 },
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
      'featured',
    ],
    result_attributes: [
      'title',
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
    ],
    highlight_attributes: ['title'],
    snippet_attributes: [
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
    ],
    facet_attributes: [
      { attribute: 'content_type', field: 'content_type', type: 'string' },
    ],
    filter_attributes: [
      {
        attribute: 'featured',
        field: 'exhibits_exhibitpage__featured_filter',
        type: 'string',
      },
    ],
  },
}

const transformContentTypes = items =>
  items
    .filter(item => item.value in CONTENT_TYPES)
    .map(item => {
      if (item.label in CONTENT_TYPES) {
        return { ...item, label: CONTENT_TYPES[item.label] }
      }
    })

const sk = new Searchkit(sk_options)

export const searchClient = Client(sk)
console.log('searchClient', searchClient)

export const Search = ({ serverState, serverUrl, aapb_host }: SearchProps) => {
  let timerId
  let timeout = 350

  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(serverUrl!) as unknown as Location
              }
              return window.location
            },
          }),
          stateMapping: {
            stateToRoute(uiState) {
              // console.log('stateToRoute', uiState)
              return {
                q: uiState['']?.query,
                p: uiState['wagtail__wagtailcore_page']?.page,
              }
            },
            routeToState(routeState) {
              // console.log('routeToState', routeState)
              return {
                '': {
                  query: routeState.q,
                },
                wagtail__wagtailcore_page: {
                  page: routeState.p,
                },
              }
            },
          },
        }}
        insights={false}
      >
        <Error />
        <SearchErrorToast />

        <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
          <SearchBox
            queryHook={(query, refine) => {
              console.log('searchbox', query, refine)
              // debounce the search input box
              clearTimeout(timerId)
              timerId = setTimeout(() => refine(query), timeout)
            }}
            className="search-box"
          />
          <div className="refinements">
            <Refinements />
            <HiddenClearRefinements />

            <ToggleRefinement attribute="featured" label="Featured" />
            <RefinementList
              attribute="content_type"
              transformItems={transformContentTypes}
            />
          </div>
          <div className="search-results">
            <LoadingIndicator />
            <AAPBResults aapb_host={aapb_host} />
            <EmptyQueryBoundary fallback={null}>
              <Index indexName="wagtail__wagtailcore_page">
                <NoResultsBoundary fallback={<NoResults />}>
                  <h3>Open Vault results</h3>
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
              <Index indexName="gbh-series">
                <NoResultsBoundary fallback={null}>
                  <h3>GBH Series results</h3>
                  <Carousel aapb_host={aapb_host} />
                </NoResultsBoundary>
              </Index>
            </EmptyQueryBoundary>
          </div>
        </ScrollTo>
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
}

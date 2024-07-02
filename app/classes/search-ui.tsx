import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import { InstantSearch, useInstantSearch } from 'react-instantsearch-core'
import {
  SearchBox,
  Hits,
  RefinementList,
  Index,
  Configure,
  ToggleRefinement,
  InstantSearchSSRProvider,
  CurrentRefinements,
  DynamicWidgets,
  Pagination,
  HitsPerPage,
} from 'react-instantsearch'
import {
  Error,
  AAPBResults,
  EmptyQueryBoundary,
  NoResults,
  NoResultsBoundary,
  Pager,
  LoadingIndicator,
  HiddenClearRefinements,
} from './search-utils'
import { SearchErrorToast } from '../components/SearchErrorToast'
import type { InstantSearchServerState } from 'react-instantsearch'
import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import { ScrollTo } from '../components/ScrollTo'
import { Hit } from '../components/Hit'
import { SeriesLink } from '../routes/series'
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

type SearchProps = {
  serverState?: InstantSearchServerState
  serverUrl?: string
}
const sk = new Searchkit(sk_options)

export const searchClient = Client(sk, { debug: true })
console.log('searchClient', searchClient)

export const Search = ({ serverState, serverUrl, aapb_host }: SearchProps) => {
  const SeriesView = ({ hit }) => (
    <>
      <div className="tag">GBH Series</div>
      <SeriesLink host={aapb_host} title={hit.title} />
    </>
  )

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
        }}
        insights={false}
      >
        <Error />
        <SearchErrorToast />

        <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
          <div className="search-bar">
            <SearchBox
              queryHook={(query, refine) => {
                clearTimeout(timerId)
                timerId = setTimeout(() => refine(query), timeout)
              }}
              className="search-box"
            />
            <LoadingIndicator />
          </div>
          <CurrentRefinements
            transformItems={
              // transform refinement Labels
              items =>
                items.map(item => {
                  if (item.attribute in ATTRIBUTES) {
                    // if this is an attribute we track, transform the label for each refinement
                    item.refinements = item.refinements.map(refinement => {
                      if (refinement.value in CONTENT_TYPES) {
                        // Transform the refinement label
                        return {
                          ...refinement,
                          label: CONTENT_TYPES[refinement.value],
                        }
                      }
                      return refinement // return the original refinement if it's not in CONTENT_TYPES
                    })
                    return { ...item, label: ATTRIBUTES[item.attribute] }
                  }
                  return item // return the original item if its attribute is not in ATTRIBUTES
                })
            }
          />
          <HiddenClearRefinements />

          <div className="refinements-panel">
            <ToggleRefinement attribute="featured" label="Featured" />
            <RefinementList
              attribute="content_type"
              transformItems={transformContentTypes}
            />
            <AAPBResults host={aapb_host} />
          </div>
          <EmptyQueryBoundary fallback={null}>
            <h3>Open Vault results</h3>
            <Index indexName="wagtail__wagtailcore_page">
              <NoResultsBoundary fallback={<NoResults />}>
                <Hits
                  hitComponent={Hit}
                  classNames={{
                    list: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
                    item: 'p-2 w-full',
                  }}
                />
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
              <h3>GBH Series results</h3>
              <Configure hitsPerPage={3} />
              <Hits hitComponent={SeriesView} />
              <Pagination />
            </Index>
          </EmptyQueryBoundary>
        </ScrollTo>
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
}

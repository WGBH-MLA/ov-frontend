import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Snippet,
  Highlight,
  Index,
  Configure,
  ToggleRefinement,
  InstantSearchSSRProvider,
  CurrentRefinements,
  DynamicWidgets,
  Pagination,
} from 'react-instantsearch'
import {
  Error,
  AAPBResults,
  NoResults,
  NoResultsBoundary,
  Pager,
  HiddenClearRefinements,
} from './search-utils'
import { SearchErrorToast } from '../components/SearchErrorToast'
import type { InstantSearchServerState } from 'react-instantsearch'
import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import { ScrollTo } from '../components/ScrollTo'
import { Hit } from '../components/Hit'
import { Panel } from '../components/Panel'

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

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  )
}

function transformContentTypes(items) {
  return items
    .filter(item => item.value in CONTENT_TYPES)
    .map(item => {
      if (item.label in CONTENT_TYPES) {
        return { ...item, label: CONTENT_TYPES[item.label] }
      }
    })
}

const HitView = props => {
  // console.log('hit', props)
  return (
    <div>
      <h2>
        <Highlight attribute="title" hit={props.hit} />
      </h2>
      <Snippet
        attribute="exhibits_exhibitpage__body_edgengrams"
        hit={props.hit}
      />
      <Snippet
        attribute="ov_collections_collection__introduction_edgengrams"
        hit={props.hit}
      />
    </div>
  )
}

const SeriesHit = props => (
  <div>
    <div className="search-type"> GBH Series</div>
    <h2>
      <Highlight attribute="title" hit={props.hit} />
    </h2>
    {/* <Snippet attribute="description" hit={props.hit} /> */}
  </div>
)
type SearchProps = {
  serverState?: InstantSearchServerState
  serverUrl?: string
}
const sk = new Searchkit(sk_options)

export const searchClient = Client(sk, { debug: true })
console.log('searchClient', searchClient)

export const Search = ({ serverState, serverUrl }: SearchProps) => (
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
      insights={true}
    >
      <Error />
      <SearchErrorToast />

      <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
        <div className="search-bar">
          <SearchBox />
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
          <h3>Refinements</h3>
          <ToggleRefinement attribute="featured" label="Featured" />
          <RefinementList
            attribute="content_type"
            transformItems={transformContentTypes}
          />
          <AAPBResults />
        </div>
        <NoResultsBoundary fallback={<NoResults />}>
          <Index indexName="wagtail__wagtailcore_page">
            <Configure hitsPerPage={5} />

            <Hits
              hitComponent={HitView}
              classNames={{
                list: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
                item: 'p-2 w-full',
              }}
              // transformItems={(items, meta) => {
              //   // console.log('hit', items, meta)
              //   // If no query, don't show any results
              //   return meta.results.query ? items : []
              // }}
            />
          </Index>
          <Index indexName="gbh-series">
            <Configure hitsPerPage={3} />
            <Hits hitComponent={SeriesHit} />
          </Index>
          <Pagination className="flex self-center" />
        </NoResultsBoundary>
      </ScrollTo>
    </InstantSearch>
  </InstantSearchSSRProvider>
)

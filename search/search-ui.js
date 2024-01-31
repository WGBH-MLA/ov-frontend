import React from "react";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { InstantSearch, SearchBox, Hits, RefinementList, Snippet, Highlight, Configure, ToggleRefinement, CurrentRefinements } from "react-instantsearch";
import { Error, AAPBResults, NoResults, NoResultsBoundary, Pager } from './utils.js'


// Labels for refinements
ATTRIBUTES = { 'content_type': 'Type', 'featured': 'Featured' }

// Labels for content types
CONTENT_TYPES = { 'exhibits.ExhibitPage': 'Exhibits', 'ov_collections.Collection': 'Collections' }

const sk = new Searchkit({
  connection: {
    host: "https://elastic.wgbh-mla.org",
    // Base64 encoded id:api_key
    apiKey: "apikey"
  },
  search_settings: {
    search_attributes: [
      { field: 'title', weight: 3 },
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
      'featured'
    ],
    result_attributes: [
      'title',
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
    ],
    highlight_attributes: ['title'],
    snippet_attributes: [
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams'
    ],
    facet_attributes: [
      { attribute: 'content_type', field: 'content_type', type: 'string' },
    ],
    filter_attributes: [
      { attribute: 'featured', field: 'exhibits_exhibitpage__featured_filter', type: "string" }
    ]
  },
},
  { debug: true }
)

function transformContentTypes(items) {
  return items.filter(item => item.value in CONTENT_TYPES)
    .map(item => {
      if (item.label in CONTENT_TYPES) {
        return { ...item, label: CONTENT_TYPES[item.label] }
      }
    })
}


const searchClient = Client(sk);

const HitView = (props) => {
  return (
    <div>
      <h2>
        <Highlight attribute="title" hit={props.hit} />
      </h2>
      <Snippet attribute="exhibits_exhibitpage__body_edgengrams" hit={props.hit} />
      <Snippet attribute="ov_collections_collection__introduction_edgengrams" hit={props.hit} />
    </div>
  );
};


export const App = () => (
  <InstantSearch indexName="wagtail__wagtailcore_page" searchClient={searchClient}>
    <Error />
    <Configure hitsPerPage={3} />
    <CurrentRefinements
      transformItems={
        // transform refinement Labels
        items => items.map(item => {
          if (item.attribute in ATTRIBUTES) {
            // if this is an attribute we track, transform the label for each refinement
            item.refinements = item.refinements.map(refinement => {
              if (refinement.value in CONTENT_TYPES) {
                // Transform the refinement label
                return { ...refinement, label: CONTENT_TYPES[refinement.value] }
              }
              return refinement; // return the original refinement if it's not in CONTENT_TYPES
            })
            return { ...item, label: ATTRIBUTES[item.attribute] }
          }
          return item; // return the original item if its attribute is not in ATTRIBUTES
        })
      }
    />
    <SearchBox />

    <div className='refinements-panel'>
      <h3>Refinements</h3>
      <ToggleRefinement attribute="featured" label='Featured' />
      <RefinementList attribute="content_type" transformItems={transformContentTypes} />
      <AAPBResults />
    </div>
    <NoResultsBoundary fallback={<NoResults />} >
      <Hits hitComponent={HitView} transformItems={
        (items, meta) => {
          // If no query, don't show any results
          return meta.results.query ? items : []
        }
      }
      />
      <Pager />
    </ NoResultsBoundary>
  </InstantSearch>
);
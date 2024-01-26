import React from "react";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { InstantSearch, SearchBox, Hits, RefinementList, Snippet, Highlight, Pagination, Configure, ToggleRefinement } from "react-instantsearch";


CONTENT_TYPES = ['exhibits.ExhibitPage', 'ov_collections.Collection']

const sk = new Searchkit({
  connection: {
    host: "https://elastic.wgbh-mla.org",
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
    <Configure hitsPerPage={3} />
    <SearchBox />

    <div className='refinements-panel'>
      <h3>Refinements</h3>
      <ToggleRefinement attribute="featured" label='Featured' />
      <RefinementList attribute="content_type" transformItems={
        items => items.filter(item => CONTENT_TYPES.includes(item.value))
          .map(item => {
            switch (item.label) {
              case 'exhibits.ExhibitPage':
                return { ...item, label: 'Exhibits' }
              case 'ov_collections.Collection':
                return { ...item, label: 'Collections' }
            }
          })
      } />
    </div>

    <Hits hitComponent={HitView} />
    <Pagination />
  </InstantSearch>
);
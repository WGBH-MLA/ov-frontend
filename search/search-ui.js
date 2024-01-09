import React from "react";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { InstantSearch, SearchBox, Hits, RefinementList } from "react-instantsearch";

const sk = new Searchkit({
  connection: {
    host: "https://elastic.wgbh-mla.org",
    auth: {
      username: "elastic",
      password: "password"
    },
    // if you're authenticating with api key
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-api-key
    // apiKey: "######"
  },
  search_settings: {
    search_attributes: ['title', 'exhibits_exhibitpage__body_edgengrams'],
    result_attributes: ['title', 'exhibits_exhibitpage__body_edgengrams']
  },
})

const searchClient = Client(sk);

const HitView = ({ hit }) => (
  <div>
    <h3>{hit.title}</h3>
    <p>{hit.exhibits_exhibitpage__body_edgengrams}</p>
  </div>
);

export const App = () => (
  <>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite-min.css" />
    </head>
    <InstantSearch indexName="wagtail__wagtailcore_page" searchClient={searchClient}>
      <SearchBox />
      <Hits hitComponent={HitView} />
      {/* <Hits></Hits> */}
    </InstantSearch>
  </>
);
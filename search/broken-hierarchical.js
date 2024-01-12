import React from "react";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { InstantSearch, SearchBox, Hits, RefinementList, Snippet, Highlight, HierarchicalMenu, Pagination, Configure } from "react-instantsearch";
import { createRoot } from "react-dom/client";

const sk = new Searchkit({
    connection: {
        host: 'https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243',
        apiKey: 'apikey',
    },
    search_settings: {
        search_attributes: [
            { field: 'name', weight: 3 },
            { field: 'categories', weight: 2 },
            { field: 'brand', weight: 2 },
            'description'
        ],
        result_attributes: ['name', 'description', 'categories', 'brand'],
        highlight_attributes: ['name'],
        snippet_attributes: ['description'],
        facet_attributes: [
            { attribute: 'brand', field: 'brand.keyword', type: "string" },
            { attribute: 'categories_lvl0', field: 'hierarchicalCategories.lvl0.keyword', type: "string" },
            { attribute: 'categories_lvl1', field: 'hierarchicalCategories.lvl1.keyword', type: "string" },
            { attribute: 'categories_lvl2', field: 'hierarchicalCategories.lvl2.keyword', type: "string" },
            { attribute: 'price', field: 'price', type: "numeric" }
        ]
    }
})

const HitView = (props) => {
    return (
        <div>
            <h2>
                <Highlight attribute="name" hit={props.hit} />
            </h2>
            <Snippet attribute="description" hit={props.hit} />
        </div>
    );
};
const searchClient = Client(sk);

export const App = () => (
    <InstantSearch indexName="products" searchClient={searchClient}>
        <Configure hitsPerPage={5} />

        <SearchBox />
        <h2>Brand</h2>
        <RefinementList attribute="brand" showMore searchable />
        <HierarchicalMenu
            attributes={[
                'hierarchicalCategories.lvl0',
                'hierarchicalCategories.lvl1',
                'hierarchicalCategories.lvl2',
            ]}
        />
        <Hits hitComponent={HitView} />
        <Pagination />
    </InstantSearch>
);

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />);

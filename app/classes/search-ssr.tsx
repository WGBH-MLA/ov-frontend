import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import type { InstantSearchServerState } from 'react-instantsearch';
import {
  InstantSearch,
  InstantSearchSSRProvider,
  getServerState,
} from 'react-instantsearch';
import { history } from 'instantsearch.js/cjs/lib/routers/index.js';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { searchClient } from './search-ui'
// export function CatchBoundary() {}


// const searchClient = algoliasearch('test', 'asdf');


type SearchProps = {
  serverState?: InstantSearchServerState;
  serverUrl?: string;
};

export function Search({ serverState, serverUrl }: SearchProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="YourIndexName"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(serverUrl!) as unknown as Location;
              }

              return window.location;
            },
          }),
        }}
      >
        {/* Widgets */}
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export function SearchPage() {
  console.log('search page');
  const { serverState, serverUrl } = useLoaderData() as SearchProps;
  console.log('search', serverState, serverUrl);

  return <Search serverState={serverState} serverUrl={serverUrl} />;
}
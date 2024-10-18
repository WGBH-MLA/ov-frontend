import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import searchkit_options from '~/data/searchkit.json'
import {
  RefinementList,
  InstantSearch,
  SearchBox,
  Index,
  Pagination,
  HitsPerPage,
  Hits,
} from 'react-instantsearch'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useRouteError } from '@remix-run/react'
import { Panel } from '~/components/Panel'
import { Carousel } from '~/components/Carousel'
import 'instantsearch.css/themes/algolia-min.css'
import '~/styles/search.css'
import { Meta } from '../classes/meta'
import { ScrollTo } from '~/components/ScrollTo'
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { NoResults, NoResultsBoundary } from '~/classes/search-utils'
import { Refinements } from '~/components/Refinements'
import { Router, stateToRoute, routeToState } from '~/components/Router'
import { Hit } from '~/components/Hit'

export const meta: MetaFunction = ({ location }) => {
  const query = new URLSearchParams(location.search).get('q')
  return [
    {
      title: `${query ? query + ' | ' : ''}Search GBH Open Vault`,
    },
    {
      name: 'description',
      content:
        'Search the GBH Open Vault catalog, Scholar Exhibits and Special Collections.',
    },
    ...Meta,
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url
  const aapb_host = process.env.AAPB_HOST

  return json({
    serverUrl,
    aapb_host,
  })
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  )
}

export type SearchProps = {
  serverUrl?: string
  aapb_host?: string
}

const sk = new Searchkit(searchkit_options)

export const searchClient = Client(sk)

const SearchUI = () => {
  const { serverUrl, aapb_host }: SearchProps = useLoaderData()
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      routing={{
        router: Router(serverUrl),
        stateMapping: { stateToRoute, routeToState },
      }}
      insights={false}
    >
      <ScrollTo className="max-w-6xl p-4 flex gap-4 m-auto">
        <SearchBox
          queryHook={(query, refine) => {
            clearTimeout(timerId)
            timerId = setTimeout(() => refine(query), timeout)
          }}
          className="search-box"
        />
        {/* <Error /> */}
        <div className="search-results">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Open Vault" />
            <Tab label="GBH Series" />
          </Tabs>

          {activeTab === 0 && (
            <Index indexName="wagtail__wagtailcore_page">
              <NoResultsBoundary fallback={<NoResults />}>
                <h2>Open Vault results</h2>
                <Refinements />
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
          )}

          {activeTab === 1 && (
            <Index indexName="gbh-series">
              <NoResultsBoundary fallback={null}>
                <h3>GBH Series results</h3>
                <Carousel aapb_host={aapb_host} />
              </NoResultsBoundary>
            </Index>
          )}
        </div>
      </ScrollTo>
    </InstantSearch>
  )
}

export default SearchUI

export function ErrorBoundary() {
  const error = useRouteError()
  console.log('search error', error)
  return (
    <div>
      <h1>Search Error</h1>
      <h4>We're sorry! Search appears to be broken!</h4>
      <pre>{error.message}</pre>
    </div>
  )
}

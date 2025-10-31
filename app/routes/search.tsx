import type { LoaderFunction, MetaFunction } from 'react-router'
import { useLoaderData, useRouteError } from 'react-router'
import Client from '@searchkit/instantsearch-client'
import Searchkit from 'searchkit'
import search_settings from '~/data/searchkit'
import { Search } from '~/classes/search-ui'
import 'instantsearch.css/themes/algolia-min.css'
import '~/styles/search.css'
import { Meta } from '~/classes/meta'

export const TABS = ['', '#gbh', '#aapb', '#help']

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
  return {
    serverUrl: request.url,
    aapbHost: process.env.AAPB_HOST,
    esUrl: process.env.ES_URL,
    esApiKey: process.env.ES_API_KEY,
    ovIndexName: process.env.ES_OV_INDEX || 'wagtail__wagtailcore_page',
    gbhSeriesIndexName: process.env.GBH_INDEX || 'gbh-series',
  }
}

export type SearchProps = {
  serverUrl?: string
  aapbHost?: string
  esUrl?: string
  esApiKey?: string
  ovIndexName?: string
  gbhSeriesIndexName?: string
}

export default function SearchPage() {
  const {
    serverUrl,
    aapbHost,
    esUrl,
    esApiKey,
    ovIndexName = 'wagtail__wagtailcore_page',
    gbhSeriesIndexName = 'gbh-series',
  }: SearchProps = useLoaderData()

  const sk = new Searchkit({
    connection: {
      host: esUrl,
      apiKey: esApiKey,
    },
    search_settings,
  })

  const searchClient = Client(sk, {
    getQuery: (query, search_attributes) => {
      console.log('search query', query, search_attributes)
      return [
        {
          simple_query_string: {
            query,
          },
        },
      ]
    },
  })

  return (
    <>
      <div className='page-body-container'>
        <h1>Search Open Vault</h1>
        <Search
          serverUrl={serverUrl}
          aapbHost={aapbHost}
          searchClient={searchClient}
          ovIndexName={ovIndexName}
          gbhSeriesIndexName={gbhSeriesIndexName}
        />
      </div>
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.warn('search error', error)
  return (
    <div className='page-body-container'>
      <h1>Search Error</h1>
      <h4>We're sorry! Search appears to be broken!</h4>
      <pre>{error.message}</pre>
    </div>
  )
}

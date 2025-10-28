import type { Hit as AlgoliaHit } from 'instantsearch.js'
import { ExternalLink } from 'lucide-react'
import {
  Configure,
  Highlight,
  Hits,
  Index,
  SortBy,
  HitsPerPage,
  useInstantSearch,
} from 'react-instantsearch'

import {
  Error,
  NoResultsBoundary,
  NoResultsMessage,
  ResultsCount,
  Pagination,
} from '~/components'

type SeriesHitProps = {
  hit: AlgoliaHit<{
    title: string
    // description: string
  }>
}

export const SeriesResults = ({
  aapbHost = 'https://demo.aapb.wgbh-mla.org',
  gbhSeriesIndexName = 'gbh-series',
}) => {
  const aapb_link = (title: string) =>
    `${aapbHost}/catalog?f[series_titles][]=${title}&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all`

  const SeriesHit = ({ hit }: SeriesHitProps) => {
    return (
      <a href={aapb_link(hit.title)} target='_blank'>
        <div className='tag'>GBH Series</div>
        <Highlight attribute='title' hit={hit} /> <ExternalLink />
      </a>
    )
  }
  const { results } = useInstantSearch()
  return (
    <Index indexName={gbhSeriesIndexName}>
      <Error />
      <Configure filters='' />
      <NoResultsBoundary
        fallback={
          <>
            <h2>
              No GBH series titles matched <i>{results.query}</i>
            </h2>
            <p>
              Try using different keywords, or try{' '}
              <a href='#aapb'>searching the American Archive</a>
            </p>
          </>
        }>
        Found {<ResultsCount />} GBH Series
        <div className='search-result-header'>
          <SortBy
            items={[
              {
                label: 'Relevance',
                value: gbhSeriesIndexName,
              },
              {
                label: 'A-Z',
                value: `${gbhSeriesIndexName}_seriestitle_asc`,
              },
              {
                label: 'Z-A',
                value: `${gbhSeriesIndexName}_seriestitle_desc`,
              },
            ]}
          />
          <Pagination />
          <HitsPerPage
            items={[
              { value: 5, label: '5' },
              { value: 10, label: '10', default: true },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
            ]}
          />
        </div>
        <Hits
          hitComponent={SeriesHit}
          classNames={{
            list: 'series-carousel',
            item: 'series-carousel-item',
          }}
        />
        <Pagination />
      </NoResultsBoundary>
    </Index>
  )
}

import type { Hit as AlgoliaHit } from 'instantsearch.js'
import { ExternalLink } from 'lucide-react'
import {
  Highlight,
  Hits,
  Index,
  SortBy,
  HitsPerPage,
} from 'react-instantsearch'

import {
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

export const SeriesResults = ({ aapb_host }) => {
  const aapb_link = (title: string) =>
    `${aapb_host}/catalog?f[series_titles][]=${title}&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all`

  const SeriesHit = ({ hit }: SeriesHitProps) => {
    return (
      <a href={aapb_link(hit.title)} target='_blank'>
        <div className='tag'>GBH Series</div>
        <Highlight attribute='title' hit={hit} /> <ExternalLink />
      </a>
    )
  }

  return (
    <Index indexName='gbh-series'>
      <NoResultsBoundary fallback={<NoResultsMessage />}>
        Found {<ResultsCount />} GBH Series
        <div className='search-result-header'>
          <SortBy
            items={[
              {
                label: 'Relevance',
                value: 'gbh-series',
              },
              {
                label: 'A-Z',
                value: 'gbh-series_seriestitle_asc',
              },
              {
                label: 'Z-A',
                value: 'gbh-series_seriestitle_desc',
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

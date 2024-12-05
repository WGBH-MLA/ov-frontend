import type { Hit as AlgoliaHit } from 'instantsearch.js'
import { Highlight, Hits, Index, SortBy, Pagination } from 'react-instantsearch'
import { NoResultsBoundary, NoResultsMessage } from './NoResults'
import { ResultsCount } from '~/components/Results'

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
        <Highlight attribute='title' hit={hit} />
      </a>
    )
  }

  return (
    <Index indexName='gbh-series'>
      <NoResultsBoundary fallback={<NoResultsMessage />}>
        <h3>GBH Series results</h3>
        <SortBy
          items={[
            {
              value: 'gbh-series',
              label: 'Relevance',
            },
            {
              value: 'gbh-series_seriestitle_asc',
              label: 'A-Z',
            },
            {
              value: 'gbh-series_seriestitle_desc',
              label: 'Z-A',
            },
          ]}
        />
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

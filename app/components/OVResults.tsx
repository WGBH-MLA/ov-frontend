import type { Hit } from 'instantsearch.js'
import { Highlight, Snippet, Hits, Index, SortBy } from 'react-instantsearch'
import { NoResultsBoundary, NoResultsMessage } from './NoResults'
import { Refinements } from '~/components/Refinements'
import { ResultsCount } from '~/components/Results'
import Pagination, { PerPage } from '~/components/Pagination'
import { Panel } from './Panel'

type OVHitProps = {
  hit: Hit<{
    objectID: number
    title: string
    slug: string
    exhibits_exhibitpage__get_hero_thumb_url?: string
    ov_collections_collection__get_hero_thumb_url?: string
  }>
}

export const OVPageHit = ({ hit }: OVHitProps) => {
  let route, label, type
  switch (true) {
    case 'exhibits_exhibitpage__body_edgengrams' in hit:
      label = 'Scholar Exhibit'
      route = '/exhibits/' + hit.slug
      type = 'exhibit-tag'
      break
    case 'ov_collections_collection__introduction_edgengrams' in hit:
      label = 'Special Collection'
      route = '/collections/' + hit.slug
      type = 'collection-tag'
      break
    default:
  }

  return (
    <a href={route}>
      <div className={`tag ${type}`}>{label}</div>
      <Highlight attribute='title' hit={hit} />
      <img src={hit.exhibits_exhibitpage__get_hero_thumb_url} />
      <img src={hit.ov_collections_collection__get_hero_thumb_url} />
      <Snippet attribute='exhibits_exhibitpage__body_edgengrams' hit={hit} />
      <Snippet
        attribute='ov_collections_collection__introduction_edgengrams'
        hit={hit}
      />
    </a>
  )
}

export const OVResults = () => (
  <Index indexName='wagtail__wagtailcore_page'>
    <NoResultsBoundary fallback={<NoResultsMessage />}>
      <Refinements />
      <>Found {<ResultsCount />} Open Vault results</>
      <div className='search-result-header'>
        <SortBy
          items={[
            {
              label: 'Relevance',
              value: 'wagtail__wagtailcore_page',
            },
            {
              label: 'Newest',
              value: 'wagtail__wagtailcore_page_last_published_date_desc',
            },
            {
              label: 'Oldest',
              value: 'wagtail__wagtailcore_page_last_published_date_asc',
            },
            {
              label: 'A-Z',
              value: 'wagtail__wagtailcore_page_title_asc',
            },
            {
              label: 'Z-A',
              value: 'wagtail__wagtailcore_page_title_desc',
            },
          ]}
        />
        <Pagination />

        <PerPage />
      </div>
      <Hits hitComponent={OVPageHit} />
      <Pagination />
    </NoResultsBoundary>
  </Index>
)

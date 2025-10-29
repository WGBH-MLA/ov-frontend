import type { Hit } from 'instantsearch.js'
import {
  Highlight,
  Snippet,
  Hits,
  Index,
  SortBy,
  Configure,
} from 'react-instantsearch'

import {
  NoResultsBoundary,
  NoResultsMessage,
  Refinements,
  Pagination,
  PerPage,
  ResultsCount,
  Error,
  StatusSpinner,
} from '~/components'

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
      <img
        className='search-hit-thumb'
        src={hit.exhibits_exhibitpage__get_hero_thumb_url}
      />
      <img
        className='search-hit-thumb'
        src={hit.ov_collections_collection__get_hero_thumb_url}
      />
      <Snippet attribute='exhibits_exhibitpage__body_edgengrams' hit={hit} />
      <Snippet
        attribute='ov_collections_collection__introduction_edgengrams'
        hit={hit}
      />
    </a>
  )
}

export const OVResults = ({ indexName }) => (
  <Index indexName={indexName}>
    <StatusSpinner />
    <Error />
    <Configure filters='live:true AND id>3' />
    <NoResultsBoundary fallback={<NoResultsMessage />}>
      <Refinements />
      <>Found {<ResultsCount />} Open Vault results</>
      <div className='search-result-header'>
        <SortBy
          items={[
            {
              label: 'Relevance',
              value: `${indexName}`,
            },
            {
              label: 'Newest',
              value: `${indexName}_last_published_date_desc`,
            },
            {
              label: 'Oldest',
              value: `${indexName}_last_published_date_asc`,
            },
            {
              label: 'A-Z',
              value: `${indexName}_title_asc`,
            },
            {
              label: 'Z-A',
              value: `${indexName}_title_desc`,
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

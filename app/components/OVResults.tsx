import type { Hit as AlgoliaHit } from 'instantsearch.js'
import {
  Highlight,
  Snippet,
  Hits,
  Index,
  Pagination,
  HitsPerPage,
  SortBy,
} from 'react-instantsearch'
import { NoResultsBoundary, NoResultsMessage } from './NoResults'
import { Refinements } from '~/components/Refinements'

type OVHitProps = {
  hit: AlgoliaHit<{
    objectID: number
    title: string
    slug: string
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
      <br />
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
      <SortBy
        items={[
          {
            value: 'wagtail__wagtailcore_page',
            label: 'Relevance',
          },
          {
            value: 'wagtail__wagtailcore_page_last_published_date_desc',
            label: 'Newest',
          },
          {
            value: 'wagtail__wagtailcore_page_last_published_date_asc',
            label: 'Oldest',
          },
          {
            value: 'wagtail__wagtailcore_page_title_asc',
            label: 'A-Z',
          },
          {
            value: 'wagtail__wagtailcore_page_title_desc',
            label: 'Z-A',
          },
        ]}
      />
      <Hits hitComponent={OVPageHit} />
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
)

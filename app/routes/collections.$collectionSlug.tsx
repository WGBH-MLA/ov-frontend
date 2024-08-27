import { useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderCollection } from '../classes/collectionPresenter'
import { ErrorBoundary } from './exhibits.$exhibitSlug'
import type { SitemapFunction } from 'remix-sitemap'

export const loader = async ({ params }) => {
  return await getPageBySlug('collections', params.collectionSlug)
}

export const meta = ({ data }) => {
  return [
    {
      title: `${data.title} | GBH Open Vault`,
    },
    {
      name: 'description',
      content: data.meta.search_description || 'GBH Open Vault Collection',
    },
  ]
}

export default function Collections() {
  const spec = useLoaderData()

  if (!spec.content) {
    return <div className="page-body-container">Collection was not found!</div>
  }

  return renderCollection(spec)
}

export { ErrorBoundary }


export const sitemap: SitemapFunction = async ({ config, request }) => {
  const collections = await fetch(
    process.env.OV_API_URL + '/api/v2/collections/'
  ).then(res => {
    return res.json()
  })
  return collections.items.map(collection => {
    return {
      loc: `/collections/${collection.meta.slug}`,
      priority: 0.8,
      lastmod: collection.meta.last_published_at,
      changefreq: 'monthly',
    }
  })
}

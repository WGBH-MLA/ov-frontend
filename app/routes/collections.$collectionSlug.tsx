import { useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderCollection } from '../classes/collectionPresenter'
import { ErrorBoundary } from './exhibits.$exhibitSlug'
import { SEOHandle } from '@balavishnuvj/remix-seo'

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

export const handle: SEOHandle = {
  getSitemapEntries: async request => {
    const collections = await fetch(
      process.env.OV_API_URL + '/api/v2/collections/'
    ).then(res => {
      return res.json()
    })
    return collections.items.map(c => {
      return {
        route: `/collections/${c.meta.slug}`,
        priority: 0.7,
        lastmod: c.meta.last_published_at,
        changefreq: 'monthly',
      }
    })
  },
}

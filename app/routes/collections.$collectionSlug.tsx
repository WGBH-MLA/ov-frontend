import { useLoaderData } from '@remix-run/react'
import type {
  LoaderFunction,
  MetaFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { getPageBySlug } from '~/utils/fetch'
import { renderCollection } from '~/classes/collectionPresenter'
import { ErrorBoundary } from './exhibits.$exhibitSlug'
import type { SitemapFunction } from 'remix-sitemap'
import { json } from '@remix-run/node'
import { extractMeta } from '~/classes/meta'

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  let collection = await getPageBySlug('collections', params.collectionSlug)
  let server_url = request.url
  return json({ collection, server_url })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let collection = data.collection
  return [
    { title: `${collection.title} | GBH Open Vault` },
    {
      name: 'description',
      content:
        collection.meta.search_description || 'GBH Open Vault Collection',
    },
    ...extractMeta(data.server_url, collection),
  ]
}

export default function Collection() {
  const { collection } = useLoaderData()

  if (!collection.content) {
    return <div className="page-body-container">Collection was not found!</div>
  }

  return renderCollection(collection)
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

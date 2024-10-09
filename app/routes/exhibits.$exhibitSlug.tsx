import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import type {
  LoaderFunction,
  MetaFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { getPageBySlug } from '../fetch'
import { renderExhibit } from '../classes/exhibitPresenter'
import type { SitemapFunction } from 'remix-sitemap'
import { extractMeta } from '../classes/meta'

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  let server_url = request.url
  let exhibit = await getPageBySlug('exhibits', params.exhibitSlug)
  return json({ exhibit, server_url })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let exhibit = data.exhibit
  return [
    { title: `${exhibit.title} | GBH Open Vault` },
    {
      name: 'description',
      content:
        exhibit.meta.search_description ||
        'Scholar Exhibit from GBH Open Vault',
    },
    ...extractMeta(data.server_url, exhibit),
  ]
}

export default function Exhibit() {
  const { exhibit } = useLoaderData()
  return renderExhibit(exhibit)
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) throw error
    return (
      <div className="page-body-container">
        <h1>Not found</h1>
        <h3>{error.data}</h3>
        <div>{error.statusText}</div>
        <div>Check your spelling, or try another route.</div>
      </div>
    )
  }
}

export const sitemap: SitemapFunction = async ({ config, request }) => {
  const exhibits = await fetch(
    process.env.OV_API_URL + '/api/v2/exhibits/'
  ).then(res => {
    return res.json()
  })
  return exhibits.items.map(exhibit,index => {
    return {
      key: index,
      loc: `/exhibits/${exhibit.meta.slug}`,
      priority: 0.8,
      lastmod: exhibit.meta.last_published_at,
      changefreq: 'monthly',
    }
  })
}

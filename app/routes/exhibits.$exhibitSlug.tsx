import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderExhibit } from '../classes/exhibitPresenter'
import type { SitemapFunction } from 'remix-sitemap'

export const loader = async ({ params }) => {
  console.log('exx path ', params)
  let exhibit = await getPageBySlug('exhibits', params.exhibitSlug)
  console.log('exhibit loader', exhibit)
  return exhibit
}

export const meta = ({ data }) => {
  return [
    {
      title: `${data.title} | GBH Open Vault`,
    },
    {
      name: 'description',
      content: data.meta.search_description || 'GBH Open Vault Exhibit',
    },
  ]
}

export default function Exhibit() {
  const exhibit = useLoaderData()
  console.log('exhibit', exhibit)

  return renderExhibit(exhibit)
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    console.error('exhibit error', error)
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
  return exhibits.items.map(exhibit => {
    return {
      loc: `/exhibits/${exhibit.meta.slug}`,
      priority: 0.8,
      lastmod: exhibit.meta.last_published_at,
      changefreq: 'monthly',
    }
  })
}

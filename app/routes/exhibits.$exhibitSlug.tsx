import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import type { LoaderFunction, MetaFunction, LoaderFunctionArgs } from 'react-router';
import { getPageBySlug } from '~/utils/fetch'
import { renderExhibit } from '~/classes/exhibitPresenter'
import type { SitemapFunction } from 'remix-sitemap'
import { extractMeta } from '~/classes/meta'
import type { Exhibit } from '~/types/openvault'

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  let server_url = request.url
  let exhibit: Exhibit = await getPageBySlug('exhibits', params.exhibitSlug)
  return { exhibit, server_url }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let exhibit: Exhibit = data?.exhibit
  if (!exhibit) {
    return [
      { title: 'GBH Open Vault' },
      { name: 'description', content: 'Scholar Exhibit from GBH Open Vault' },
    ]
  }
  return [
    { title: `${exhibit.title} | GBH Open Vault` },
    {
      name: 'description',
      content:
        exhibit.meta?.search_description ||
        'Scholar Exhibit from GBH Open Vault',
    },
    ...extractMeta(data.server_url, exhibit),
  ]
}

export default () => {
  const { exhibit } = useLoaderData()
  return renderExhibit(exhibit)
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.status == 404)
      return (
        <div className='page-body-container'>
          <h1>Not found</h1>
          <h3>{error.data}</h3>
          <div>{error.statusText}</div>
          <div>Check your spelling, or try another route.</div>
        </div>
      )
    return (
      <div className='page-body-container'>
        <h1>Something went wrong</h1>
        <h3>{error.statusText}</h3>
        <div>{error.data}</div>
      </div>
    )
  }
}

export const sitemap: SitemapFunction = async ({ config, request }) => {
  const exhibits = await fetch(
    process.env.OV_API_URL + '/api/v2/exhibits/'
  ).then((res) => {
    return res.json()
  })
  return exhibits.items.map((exhibit: Exhibit, index: number) => {
    return {
      key: index,
      loc: `/exhibits/${exhibit.meta.slug}`,
      priority: 0.8,
      lastmod: exhibit.meta.last_published_at,
      changefreq: 'monthly',
    }
  })
}

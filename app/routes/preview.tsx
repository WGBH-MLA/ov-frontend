import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { getPreview } from '../preview'
import { renderCollection } from '../classes/collectionPresenter'
import { renderExhibit } from '../classes/exhibitPresenter'
import type { SitemapFunction } from 'remix-sitemap'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  var params = new URLSearchParams(request.url.replace(/.*\?/, ''))
  if (params.has('content_type') && params.has('token')) {
    var id = params.get('token').split(':')[0].replace(/id=/g, '')
    return await getPreview(id, params.get('content_type'), params.get('token'))
  } else {
    throw new Error('Missing content_type or token!! No!')
  }
}

export default function Preview() {
  const preview = useLoaderData()

  if (!preview) {
    throw new Error('Not found!')
  }

  let rendered
  if (preview.meta.type == 'ov_collections.Collection') {
    rendered = renderCollection(preview)
  } else if (preview.meta.type == 'exhibits.ExhibitPage') {
    rendered = renderExhibit(preview)
  }

  return (
    <div>
      <div className="page-container">
        <div className="page-body-container">{rendered}</div>
      </div>
    </div>
  )
}

export const sitemap: SitemapFunction = async ({ config, request }) => ({
  exclude: true,
})

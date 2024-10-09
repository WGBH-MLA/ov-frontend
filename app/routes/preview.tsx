import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { getPreview } from '../preview'
import { renderCollection } from '../classes/collectionPresenter'
import { renderExhibit } from '../classes/exhibitPresenter'
import type { SitemapFunction } from 'remix-sitemap'
import { getPageBySlug } from '../fetch'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  var params = new URLSearchParams(request.url.replace(/.*\?/, ''))
  // if(params.has("slug") && params.has("token") && params.has("content_type")){

  //   var slug = params.get("slug")
  //   var token = params.get("token")
  //   var content_type = params.get("content_type")
  //   var page_type = content_type == "exhibits.exhibitpage" ? "exhibits" : "collections"
  //   const resp = await getPageBySlug(page_type, slug)
  //   const data = await resp.json()

  //   console.log( 'herse hte data though', data )
  //   if(data && data.id && token && content_type){
  //     console.log( 'using these values', data.id, content_type, token )
  //     return await getPreview(data.id, content_type, token)
  //   }
  // }

  // leaving existing lookup by id, since current preview link provides only it
  if (params.has('content_type') && params.has('token')) {
    var id = params.get('token').split(':')[0].replace(/id=/g, '')
    return await getPreview(id, params.get('content_type'), params.get('token'))
  } else {
    throw new Error('Missing content_type or token!! No!')
  }
}

export default function Preview() {
  const preview = useLoaderData()

  if (!(preview && preview.meta)) {
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

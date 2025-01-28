import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { getMasterpiece } from '~/utils/masterpiece'
import { masterpieceFlavor } from '~/data/masterpieceFlavor'
import { renderPageTitleBar } from '~/classes/pageHelpers'
import { ChevronsLeft, ExternalLink } from 'lucide-react'

export const loader = async ({ params }) => {
  var data = await getMasterpiece()
  var series
  Object.keys(data.masterpieceData).forEach((season) => {
    if (data.masterpieceData[season][params.miniseriesId]) {
      series = data.masterpieceData[season][params.miniseriesId]
    }
  })

  return {
    AAPB_HOST: process.env.AAPB_HOST,
    miniseriesId: params.miniseriesId,
    series: series,
  }
}

export const meta = ({ seriesData }) => {
  if (seriesData?.title) {
    return [
      { title: `GBH Series - ${seriesData?.title}` },
      {
        name: 'description',
        content: `Information for the Masterpiece Miniseries ${seriesData?.title} from GBH Open Vault`,
      },
    ]
  }
}

function masterpieceFlavorImage() {
  console.log(
    'do it',
    masterpieceFlavor.length,
    Math.floor(Math.random(masterpieceFlavor.length))
  )

  return `https://s3.amazonaws.com/openvault.wgbh.org/treasuries/cooke-production-flavor/${
    masterpieceFlavor[Math.floor(Math.random() * masterpieceFlavor.length)]
  }`
}

export default () => {
  const data = useLoaderData()
  let titleBar = renderPageTitleBar(
    data.series.title,
    masterpieceFlavorImage(),
    ''
  )

  return (
    <div>
      <div className='page-container'>
        {titleBar}
        <div className='page-sidebar' />

        <div className='page-body-container'>
          <div className='page-body'>
            <div className='masterpiece-intro'>
              <div className='static-halfbox'>
                <div className='masterpiece-summary'>
                  {data.series.desc ||
                    'No description is available for this series. Visit AAPB for more info!'}
                </div>
              </div>
              <div className='static-halfbox'>
                <img src={masterpieceFlavorImage()} />

                <a
                  className='half-link'
                  href={`${data.AAPB_HOST}/catalog?sort=asset_date+asc&f[special_collections][]=${data.miniseriesId}&f[access_types][]=all`}
                  target='_blank'>
                  View Records On AAPB <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div>
              <a className='back-link' href='/collections/masterpiece'>
                <ChevronsLeft /> Back to Masterpiece Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) throw error
    return (
      <div className='page-body-container'>
        <h1>Not found</h1>
        <h3>{error.data}</h3>
        <div>{error.statusText}</div>
        <div>Check your spelling, or try another route.</div>
      </div>
    )
  }
}

// export const sitemap = async ({ config, request }) => {
//   const exhibits = await fetch(
//     process.env.OV_API_URL + '/api/v2/exhibits/'
//   ).then((res) => {
//     return res.json()
//   })

//   return exhibits.items.map((exhibit: Exhibit, index: number) => {
//     return {
//       key: index,
//       loc: `/exhibits/${exhibit.meta.slug}`,
//       priority: 0.8,
//       lastmod: exhibit.meta.last_published_at,
//       changefreq: 'monthly',
//     }
//   })
// }

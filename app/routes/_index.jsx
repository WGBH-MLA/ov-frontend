import { useLoaderData } from '@remix-run/react'
import { OpenCarousel } from '~/classes/openCarousel'
import { renderPageLinks } from '~/classes/pageHelpers'
import shuffle from '~/utils/shuffle'

export const loader = async () => {
  let collections, exhibits
  try {
    var cr = await fetch(
      process.env.OV_API_URL + '/api/v2/collections/?order=random&limit=3'
    )
    collections = await cr.json()
    var er = await fetch(
      process.env.OV_API_URL + '/api/v2/exhibits/?order=random&limit=3'
    )
    exhibits = await er.json()
    return {
      collections,
      exhibits,
    }
  } catch (e) {
    console.log('error getting home page', e)
    throw new Response(`Error getting home page`, {
      status: 500,
      statusText: 'Something went wrong. Try again later.',
    })
  }
}

export default function Index() {
  let { exhibits, collections } = useLoaderData()

  let carousel
  let exhibitLinksContainer, collectionLinksContainer

  if (exhibits?.items && exhibits.items.length > 0) {
    console.log('home exhibits', exhibits)
    let exhibitLinks = renderPageLinks('exhibits', exhibits.items)
    exhibitLinksContainer = (
      <div className='pagelinks-container'>
        <hr className='spaced-hr' />

        <div className='pagelinks-top'>
          <div className='pagelinks-also'>
            Scholar Exhibits
            <a href='exhibits/' className='big-blue-link'>
              View All
              <div className='big-blue-button'>&gt;</div>
            </a>
          </div>
          <h4>
            Explore selected topics and digitized programs of historical
            significance from the GBH Archives.
          </h4>
        </div>

        {exhibitLinks}
      </div>
    )

    carousel = (
      <OpenCarousel
        slides={shuffle(exhibits?.items.concat(collections?.items))}
      />
    )
  }

  if (collections?.items && collections.items.length > 0) {
    let collectionLinks = renderPageLinks('collections', collections.items)
    collectionLinksContainer = (
      <div className='pagelinks-container'>
        <hr className='spaced-hr' />

        <div className='pagelinks-top'>
          <div className='pagelinks-also'>
            Special Collections
            <a href='collections/' className='big-blue-link'>
              View All
              <div className='big-blue-button'>&gt;</div>
            </a>
          </div>
          <h4>
            Check out collections of significant GBH productions, including
            unique full-length interviews.
          </h4>
        </div>

        {collectionLinks}
      </div>
    )
  }

  return (
    <div className='home-container'>
      <div className='carousel-container'>{carousel}</div>

      {exhibitLinksContainer}
      {collectionLinksContainer}
    </div>
  )
}

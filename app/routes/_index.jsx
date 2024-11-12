import { Link } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import { OpenCarousel } from '~/classes/openCarousel'
import { renderPageLinks } from '~/classes/pageHelpers'
import { getHomepage } from '~/utils/fetch'
import shuffle from 'lodash/shuffle'

export const loader = async () => {
  return await getHomepage()
}

export default function Index() {
  let { exhibits, collections } = useLoaderData()

  let carousel
  let exhibitLinksContainer, collectionLinksContainer

  if (exhibits?.items && exhibits.items.length > 0) {
    let exhibitLinks = renderPageLinks('exhibits', exhibits.items)
    exhibitLinksContainer = (
      <div className="pagelinks-container">
        <hr className="spaced-hr" />

        <div className="pagelinks-top">
          <div className="pagelinks-also">
            Scholar Exhibits
            <a href="exhibits/" className="big-blue-link">
              View All
              <div className="big-blue-button">&gt;</div>
            </a>
          </div>
          <h4>Explore selected topics and digitized programs of historical significance curated by GBH Mellon Scholars.</h4>
        </div>

        {exhibitLinks}
      </div>
    )

    carousel = (
      <OpenCarousel
        slides={shuffle(exhibits.items.concat(collections?.items))}
      />
    )
  }

  if (collections?.items && collections.items.length > 0) {
    let collectionLinks = renderPageLinks('collections', collections.items)
    collectionLinksContainer = (
      <div className="pagelinks-container">
        <hr className="spaced-hr" />

        <div className="pagelinks-top">
          <div className="pagelinks-also">
            Special Collections
            <a href="collections/" className="big-blue-link">
              View All
              <div className="big-blue-button">&gt;</div>
            </a>
          </div>
          <h4>Check out collections of significant GBH productions, including unique full-length interviews.</h4>
        </div>

        { collectionLinks }
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="carousel-container">{carousel}</div>

      { exhibitLinksContainer }
      { collectionLinksContainer }
    </div>
  )
}

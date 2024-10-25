import { Link } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import { OpenCarousel } from '~/classes/openCarousel'
import { renderPageLinks } from '~/classes/pageHelpers'
import { getHomepage } from '~/utils/fetch'

export const loader = async () => {
  return await getHomepage()
}

export default function Index() {
  let data = useLoaderData()

  let carousel
  let exhibitLinksContainer, collectionLinksContainer

  if (data?.exhibits?.items && data.exhibits.items.length > 0) {
    let exhibitLinks = renderPageLinks('exhibits', data.exhibits.items)
    exhibitLinksContainer = (
      <div className="pagelinks-container">
        <hr />

        <div className="pagelinks-top">
          <div className="pagelinks-also">
            Scholar Exhibits
            <div className="big-blue-link">
              View All
              <div className="big-blue-button">&gt;</div>
            </div>
          </div>
          <h4>Explore selected topics and digitized programs of historical significance curated by GBH Mellon Scholars.</h4>

          <div className="pagelinks-all">
            <Link className="exhibit-viewall" to="/exhibits">
              View All
            </Link>
          </div>
        </div>

        { exhibitLinks }
      </div>
    )

    carousel = <OpenCarousel slides={ data?.exhibits?.items.concat(data?.collections?.items) } />
  }

  if (data?.collections?.items && data.collections.items.length > 0) {
    let collectionLinks = renderPageLinks('collections', data.collections.items)
    collectionLinksContainer = (
      <div className="pagelinks-container">
        <hr />

        <div className="pagelinks-top">
          <div className="pagelinks-also">
            Special Collections
            <div className="big-blue-link">
              View All
              <div className="big-blue-button">&gt;</div>
            </div>
          </div>
          <h4>Check out collections of significant GBH productions, including unique full-length interviews.</h4>
          
          <div className="pagelinks-all">
            <Link className="exhibit-viewall" to="/collections">
              View All
            </Link>
          </div>
        </div>

        { collectionLinks }
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="carousel-container">{carousel}</div>

      {exhibitLinksContainer}
      {collectionLinksContainer}
    </div>
  )
}

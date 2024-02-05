import { Link } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"

import { renderPageLinks } from "~/classes/pageHelpers"
import { OpenCarousel } from "~/classes/openCarousel"

import { getExhibits } from "~/exhibit"

export const loader = async () => {
  return await getExhibits()
}

export default function Index() {
  let exhibits = useLoaderData()

  let carousel
  let exhibitLinksContainer

  if(exhibits && exhibits.items && exhibits.items.length > 0){
    let exhibitLinks = renderPageLinks("exhibits", exhibits.items)
    exhibitLinksContainer = (
      <div className="pagelinks-container">
        <hr />

        <div className="pagelinks-top">
          <div className="pagelinks-also">
            Scholar Exhibits
          </div>

          <div className="pagelinks-all">
            <Link className="exhibit-viewall" to="/exhibits" >View All</Link>
          </div>
        </div>

        { exhibitLinks }
      </div>
    )

    carousel = <OpenCarousel slides={ exhibits.items } />
  }

  return (
    <div className="home-container">
      <div className="carousel-container">
        { carousel }
      </div>

      { exhibitLinksContainer }
    </div>
  )
}

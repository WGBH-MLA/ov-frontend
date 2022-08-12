import { Link, useLoaderData } from "remix"
import { Carousel } from "react-responsive-carousel"
import { renderPageLinks } from "~/classes/pageHelpers"
import { getExhibits } from "~/exhibit"

export const loader = async ( { params } ) => {
  return await getExhibits()
}

export default function Index() {

  const exhibits = useLoaderData()

  let exhibitLinks = renderPageLinks('exhibits', exhibits.items)

  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel dynamicHeight={true} infiniteLoop={true} >
          <a href="/guitar-thing">
            <div>
              <img src="/carousel/guitar.jpg" />
              <p className="legend">A Guitar</p>
            </div>
          </a>
          <a href="/vietnam-thing">
            <div>
              <img src="/carousel/vietnam.jpg" />
              <p className="legend">Vietnam</p>
            </div>
          </a>
          <a href="/march-thing">
            <div>
              <img src="/carousel/march.jpg" />
              <p className="legend">March</p>
            </div>
          </a>
        </Carousel>
      </div>

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
    </div>
  );
}

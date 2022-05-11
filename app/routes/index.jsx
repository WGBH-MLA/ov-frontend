import { Link } from "remix"
import { Carousel } from "react-responsive-carousel"
import { renderPageLinks } from "~/classes/pageHelpers"

export default function Index() {

  // need loader!
  let exhibits 
  exhibits = [
      {
        id: 6,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/6/',
          html_url: 'http://localhost/wewf-sdfsdf/',
          slug: 'wewf-sdfsdf',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'wewf  sdfsdf',
        cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',

        author: {
          name: "Weakman Wack",
          image_url: "https://s3.amazonaws.com/americanarchive.org/staff/Alexandra-Garcia.jpg"
        }
      },
      {
        id: 7,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/7/',
          html_url: 'http://localhost/holy-heck/',
          slug: 'holy-heck',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'holy heck',
        cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',

        author: {
          name: "Coolman Slick",
          image_url: "https://s3.amazonaws.com/americanarchive.org/staff/Staff_Carter.jpg"
        }
      },
      {
        id: 8,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/8/',
          html_url: 'http://localhost/wowie-zowie/',
          slug: 'wowie-zowie',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'wowie zowie',
        cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',

        author: {
          name: "Just Alright, Esq.",
          image_url: "https://s3.amazonaws.com/americanarchive.org/staff/Staff_Curtis.jpg"
        }
      },
    ]


  let exhibitLinks = renderPageLinks('exhibits', exhibits)

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

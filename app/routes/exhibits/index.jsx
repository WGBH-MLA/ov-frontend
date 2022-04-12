import { Link, useLoaderData } from "remix"
// import { getExhibits } from "~/exhibit"

// export const loader = async () => {
//   return await getExhibits()
// }

export default function Exhibits() {
  let exhibits

  // actually get from api
  // exhibits = useLoaderData()

  exhibits = {
    items: [
      // {
      //   id: 3,
      //   meta: {
      //     type: 'home.HomePage',
      //     detail_url: 'http://localhost/api/v2/pages/3/',
      //     html_url: 'http://localhost/',
      //     slug: 'home',
      //     first_published_at: '2022-03-17T18:09:42.733436Z'
      //   },
      //   title: 'GBH Openvault'
      // },
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
        author_image: "/carousel/march.jpg",
        cover_image: "/carousel/guitar.jpg"
      },
      {
        id: 8,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/8/',
          html_url: 'http://localhost/bibg-boy-pages/',
          slug: 'bibg-boy-pages',
          first_published_at: '2022-03-28T19:03:49.853855Z'
        },
        title: 'bibg boy pages',
        author_image: "/carousel/march.jpg",
        cover_image: "/carousel/guitar.jpg"
      }
    ]
  }

  console.log( 'ex', exhibits )
  let items = exhibits.items
  return (
    <div>
      <h1>Exhibits</h1>
        {items.map(exhibit => (
          <Link className="exhibit-index-link" to={ "/exhibits/" + exhibit.id }>

            <div className="exhibit-index-coverimg" style={{ backgroundImage: "url(" + exhibit.cover_image + ")" }}>
            
              <div className="exhibit-authorbubble" style={{ backgroundImage: "url(" + exhibit.author_image + ")" }}>
              </div>
            </div>

            <div className="exhibit-index-link-title">
              { exhibit.title }
            </div>
          </Link>  
        ))}
    </div>
  );
}

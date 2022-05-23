import { Link, useLoaderData } from "remix"
import { getSpecialCollections } from "~/specialCollection"

// export const loader = async () => {
//   return await getExhibits()
// }

export default function SpecialCollections() {
  let specs

  // actually get from api
  // exhibits = useLoaderData()

  specs = {
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
          slug: 'very-special-collection',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'Very Special Collection'
      },
      {
        id: 8,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/8/',
          html_url: 'http://localhost/bibg-boy-pages/',
          slug: 'just-alright-collection',
          first_published_at: '2022-03-28T19:03:49.853855Z'
        },
        title: 'Its Fine'
      }
    ]
  }

  let items = specs.items
  return (
    <div>
      <h1>Exhibits</h1>
        {items.map(exhibit => (
          <Link className="exhibit-index-link" to={ "/exhibits/" + exhibit.id }>
            <div className="exhibit-index-link-title">
              { exhibit.title }
            </div>
          </Link>  
        ))}
    </div>
  );
}

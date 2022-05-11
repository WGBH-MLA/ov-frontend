import { Link, useLoaderData } from "remix"
import { getExhibits } from "~/exhibit"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"

// // commented out so we can use fake data
// export const loader = async () => {
//   return await getExhibits()
// }

export default function Exhibits() {
  let exhibits

  // actually get from api
  // exhibits = useLoaderData()
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

  console.log( 'ex', exhibits )

  let exhibitLinks = renderPageLinks('exhibits', exhibits)
  return (
    <div className="pagelinks-container">
      { exhibitLinks }
    </div>
  )
}

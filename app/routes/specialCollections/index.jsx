import { Link, useLoaderData } from "remix"
import { getSpecialCollections } from "~/specialCollection"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"

// export const loader = async () => {
//   return await getExhibits()
// }

export default function SpecialCollections() {
  let specs

  // actually get from api
  // exhibits = useLoaderData()

  specs = [
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
    },
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
    },
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
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
      cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg'
    },
  ]

  let specialCollectionLinks = renderPageLinks('specialCollections', specs)
  return (
    <div className="pagelinks-container">
      { specialCollectionLinks }
    </div>
  );
}

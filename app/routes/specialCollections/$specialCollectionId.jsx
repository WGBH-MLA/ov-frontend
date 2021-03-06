import { Link, useLoaderData } from "remix"
import { getSpecialCollection } from "~/specialCollection"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

// // commented out so we can use fake data
// export const loader = async ( { params } ) => {
//   console.log( 'exx id ', params )
//   return await getSpecialCollection( params.exhibitId )
// };

export default function SpecialCollections() {
  // const exhibit = useLoaderData();

  const spec = {
    id: 8,
    meta: {
      type: 'specialCollection.SpecialCollectionPage',
      detail_url: 'http://localhost/api/v2/pages/8/',
      html_url: 'http://localhost/bibg-boy-pages/',
      slug: 'bibg-boy-pages',
      show_in_menus: false,
      seo_title: '',
      search_description: '',
      first_published_at: '2022-03-28T19:03:49.853855Z',
      parent: { id: 3, meta: [Object], title: 'GBH Openvault' }
    },
    title: 'bibg boy pages',
    body: '<p data-block-key="ggph3">yeah</p><p data-block-key="f78tu"></p><h2 data-block-key="6e2r2">but like yeah yeah <b>yeahhhhh</b></h2><p data-block-key="f14fo"></p><p data-block-key="flnk6"></p><p data-block-key="5eaeg"></p><p data-block-key="6tij5">but when you thinka bout it</p><p data-block-key="ot8u"></p><p data-block-key="bnien"></p><embed alt="flutin" embedtype="image" format="left" id="2"/><p data-block-key="dqprf"></p><p data-block-key="agdi8"></p><p data-block-key="32oee">right?</p>',
    cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',
    hero_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_35-89d51nbw.jpg',

    // hypthetical
    sections: [
      {
        id: 6,
        meta: {
          type: 'specialCollection.SpecialCollectionPage',
          detail_url: 'http://localhost/api/v2/pages/6/',
          html_url: 'http://localhost/wewf-sdfsdf/',
          slug: 'wewf-sdfsdf',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'wewf sdfsdf'
      },
      {
        id: 16,
        meta: {
          type: 'specialCollection.SpecialCollectionPage',
          detail_url: 'http://localhost/api/v2/pages/6/',
          html_url: 'http://localhost/wewf-sdfsdf/',
          slug: 'wewf-sdfsdf',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'wewf sdfsdf'
      },
    ]
  }

  let sidebar
  if(spec.sections){
    sidebar = renderSidebar("specialcollectionc", spec.sections)
  }

  let titleBar
  if(spec.title){
    titleBar = renderPageTitleBar(spec.title, spec.hero_image)
  }

  let collectionAuthor
  if(spec.author){
    let byline = (
      <div className="author-byline">
        By { spec.author.name }
      </div>
    )
    collectionAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(spec.author) } { byline }
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          { collectionAuthor }
          <div className="page-body" dangerouslySetInnerHTML={{ __html: spec.body }} />
        </div>
        
      </div>
    </div>
  )
}

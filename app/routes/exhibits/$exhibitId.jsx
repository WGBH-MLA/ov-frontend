import { Link, useLoaderData } from "remix"
import { getExhibit } from "~/exhibit"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"


// commented out so we can use fake data
// export const loader = async ( { params } ) => {
//   console.log( 'exx id ', params )
//   return await getExhibit( params.exhibitId )
// }

export default function Exhibits() {
  const exhibit = {
    id: 8,
    meta: {
      type: 'exhibit.ExhibitPage',
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
    body: '<p data-block-key="ggph3">yeah</p><p data-block-key="f78tu"></p><h2 id="section-6e2r2" data-block-key="6e2r2">but like yeah yeah <b>yeahhhhh</b></h2><p data-block-key="f14fo"></p><p data-block-key="flnk6"></p><p data-block-key="5eaeg"></p><p data-block-key="6tij5">but when you thinka bout it</p><p data-block-key="6tij5">but when you thinka bout it</p><p data-block-key="6tij5">but when you thinka bout it</p><p data-block-key="ot8u"></p><p data-block-key="bnien"></p><h2 id="section-fakey" data-block-key="fakey">what about a little bit of this!!!</h2><embed alt="flutin" embedtype="image" format="left" id="2"/><p data-block-key="dqprf"></p><p data-block-key="agdi8"></p><p data-block-key="32oee">right?</p>',

    // hypothetical with anchors
    sections: [
      {id: "section-6e2r2", title: "Section 1"},
      {id: "section-fakey", title: "Section 2"},
    ],

    // images
    cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',
    hero_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_35-89d51nbw.jpg',

    // author information
    author: {
      name: "Coolman Slick",
      image_url: "https://s3.amazonaws.com/americanarchive.org/staff/Staff_Carter.jpg"
    },

    related_exhibits: [
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

  }
  // const exhibit = useLoaderData()
  
  let sidebar
  if(exhibit.sections){
    sidebar = renderSidebar("exhibit", exhibit.sections)
  }

  let titleBar
  if(exhibit.title){
    titleBar = renderPageTitleBar(exhibit.title, exhibit.hero_image)
  }

  let bottomBar
  if(exhibit.related_exhibits){
    bottomBar = (

      <div className="exhibit-bottom-graybar">
        <div className="pagelinks-container">
          <div className="pagelinks-top">
            <div className="pagelinks-also">
              You may also like
            </div>

            <div className="pagelinks-all">
              <Link className="page-nav-link" to="/exhibits" >View all scholar exhibits ></Link>
            </div>
          </div>
        
          { renderPageLinks('exhibits', exhibit.related_exhibits) }
        </div>
      </div>
    ) 
  }

  let exhibitAuthor
  if(exhibit.author){
    let byline = (
      <div className="author-byline">
        By { exhibit.author.name }
      </div>
    )
    exhibitAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(exhibit.author) } { byline }
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          { exhibitAuthor }
          <div className="page-body" dangerouslySetInnerHTML={{ __html: exhibit.body }} />
        </div>
        
        { bottomBar }
      </div>
    </div>
  )
}

function scrollSectionIntoView(section){
  let ele = document.getElementById(section.id)
  ele.scrollIntoView()
}


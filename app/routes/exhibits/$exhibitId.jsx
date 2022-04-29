import { Link, useLoaderData } from "remix"
import { getExhibit } from "~/exhibit"

// // commented out so we can use fake data
// export const loader = async ( { params } ) => {
//   console.log( 'exx id ', params )
//   return await getExhibit( params.exhibitId )
// };

export default function Exhibits() {
  // const exhibit = useLoaderData()
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
          name: "Coolman Slick",
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
          name: "Weakman Wack",
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

    // hypothetical with section pages
    // sections: [
    //   {
    //     id: 6,
    //     meta: {
    //       type: 'exhibit.ExhibitPage',
    //       detail_url: 'http://localhost/api/v2/pages/6/',
    //       html_url: 'http://localhost/wewf-sdfsdf/',
    //       slug: 'wewf-sdfsdf',
    //       first_published_at: '2022-03-28T18:28:32.842202Z'
    //     },
    //     title: 'wewf  sdfsdf'
    //   },
    // ]
  }
  // console.log( 'exhibit data', exhibit )

  let sidebar
  if(exhibit.sections){
    sidebar = (
      <div className="exhibit-sidebar">
        <div className="exhibit-sidebar-title">In This Exhibit</div>
        { exhibit.sections.map( (section) => { return renderSidebarSection(section) } ) }
      </div>
    )
  }

  let titleBar
  if(exhibit.title){
    titleBar = (
      <div className="exhibit-titlebar" style={{ backgroundImage: "url(" + exhibit.hero_image + ")" }}>
        <h1 className="exhibit-titlebar-title">{ exhibit.title }</h1>
      </div>
    )
  }

  let bottomBar
  if(exhibit.related_exhibits){
    bottomBar = (
      <div className="exhibit-bottom-graybar">
        { renderBottomExhibitLinks(exhibit.related_exhibits) }
      </div>
    ) 
  }

  return (
    <div>
      <div className="exhibit-container">
        { titleBar }
        { sidebar }
        
        <div className="exhibit-body" dangerouslySetInnerHTML={{ __html: exhibit.body }} />
        
        { bottomBar }
      </div>
    </div>
  );
}

function renderBottomExhibitLinks(exhibits){
  let exhibitBottomLinks = exhibits.map( (exhibit) => { return renderBottomExhibitLink(exhibit) })

  return (
    <div className="exhibit-bottomlinks-container">
      <div className="exhibit-bottomlinks-top">
        <div className="exhibit-bottomlinks-also">
          You may also like
        </div>

        <div className="exhibit-bottomlinks-allexhibits">
          <Link className="exhibit-nav-link" to="/exhibits" >View all scholar exhibits ></Link>
        </div>
      </div>

      <div className="exhibit-bottomlinks">
        { exhibitBottomLinks }
      </div>
    </div>
  )
}

function renderBottomExhibitLink(exhibit){
  console.log( 'exxx', exhibit )
  return (
    <div className="exhibit-bottomlink">
      <a href={ '/exhibits' + exhibit.id }>
        <div className="exhibit-bottomlink-image" style={{ backgroundImage: "url(" + exhibit.cover_image + ")" }}></div>
        <div className="exhibit-bottomlink-title">{ exhibit.title }</div>
        <div className="exhibit-bottomlink-subtitle">By { exhibit.author.name }</div>
      </a>
    </div>
  )
}

function renderSidebarSection(section){
  return (
    <a href="#" onClick={ () => { scrollSectionIntoView(section)  } } className="exhibit-sidebar-link">> { section.title }</a>
  )
}

function scrollSectionIntoView(section){
  let ele = document.getElementById(section.id)
  ele.scrollIntoView()
}



// page-based section approach
// function renderSidebarSection(section){
//   return (
//     <Link to={ section.meta.html_url } className="exhibit-sidebar-link">{ section.title }</Link>
//   )
// }




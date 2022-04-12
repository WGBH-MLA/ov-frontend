import { Link, useLoaderData } from "remix"
import { getExhibit } from "~/exhibit"

export const loader = async ( { params } ) => {
  console.log( 'exx id ', params )
  return await getExhibit( params.exhibitId )
};

export default function Exhibits() {
  // const exhibit = useLoaderData();
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
    body: '<p data-block-key="ggph3">yeah</p><p data-block-key="f78tu"></p><h2 data-block-key="6e2r2">but like yeah yeah <b>yeahhhhh</b></h2><p data-block-key="f14fo"></p><p data-block-key="flnk6"></p><p data-block-key="5eaeg"></p><p data-block-key="6tij5">but when you thinka bout it</p><p data-block-key="ot8u"></p><p data-block-key="bnien"></p><embed alt="flutin" embedtype="image" format="left" id="2"/><p data-block-key="dqprf"></p><p data-block-key="agdi8"></p><p data-block-key="32oee">right?</p>',
    cover_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_111-451g1rhp.jpg',
    hero_image: 'https://s3.amazonaws.com/americanarchive.org/cpb-aacip_35-89d51nbw.jpg',

    // hypthetical
    sections: [
      {
        id: 6,
        meta: {
          type: 'exhibit.ExhibitPage',
          detail_url: 'http://localhost/api/v2/pages/6/',
          html_url: 'http://localhost/wewf-sdfsdf/',
          slug: 'wewf-sdfsdf',
          first_published_at: '2022-03-28T18:28:32.842202Z'
        },
        title: 'wewf  sdfsdf'
      },
    ]
  }
  console.log( 'exhibit data', exhibit )

  let sidebar
  if(exhibit.sections){
    console.log( 'whatttt', exhibit.sections )
    sidebar = (
      <div className="exhibit-sidebar">
        { exhibit.sections.map( (section) => { return renderSidebarSection(section) } ) }
      </div>
    )
  }

  return (
    <div>
      <div className="exhibit-container">
        <h1>{ exhibit.title }</h1>
        { sidebar }
        <div className="exhibit-body" dangerouslySetInnerHTML={{ __html: exhibit.body }} />
        <Link className="exhibit-nav-link" to="/exhibits" >Back to Exhibits</Link>
      </div>
    </div>
  );
}

function renderSidebarSection(section){
  return (
    <Link to={ section.meta.html_url } className="exhibit-sidebar-link">{ section.title }</Link>
  )
}

// function guidURL(guid){
//   return "https://americanarchive.org/catalog/" + guid
// }

// function renderGuidLink(guid){
//   return (
//     <a className="exhibit-record-link" href={ guidURL(guid) }>{ guid }</a>
//   )
// }

// function renderGuidLinks(guids){
//   return guids.map( (guid) => { return renderGuidLink(guid) } )
// }

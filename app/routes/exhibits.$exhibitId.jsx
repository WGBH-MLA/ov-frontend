import { Link, useLoaderData } from "@remix-run/react"
import { getExhibit } from "~/exhibit"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"
import { decode } from "html-entities"

export const loader = async ( { params } ) => {
  console.log( 'exx id ', params )
  return await getExhibit( params.exhibitId )
}

export default function Exhibits() {
  const exhibit = useLoaderData()

  console.log( 'exx gon give it to ya', exhibit )

  let sections
  if(exhibit.sections){
    sections = exhibit.sections
  } else {
    sections = []
  }
  let sidebar = renderSidebar("exhibit", sections)

  let titleBar
  if(exhibit.title){

    let hero
    if(exhibit.hero_image){
      hero = exhibit.hero_image.full_url
    } else {
      hero = "/gbh-mural.jpeg"
    }

    titleBar = renderPageTitleBar(exhibit.title, hero)
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
              <Link className="page-nav-link" to="/exhibits" >View all scholar exhibits &gt;</Link>
            </div>
          </div>

          { renderPageLinks('exhibits', exhibit.related_exhibits) }
        </div>
      </div>
    )
  }

  let exhibitAuthor
  if(exhibit.authors && exhibit.authors.length > 0){
    let byline = (
      <div className="author-byline">
        By { exhibit.authors[0].name }
      </div>
    )
    exhibitAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(exhibit.authors[0]) } { byline }
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

          <div className="page-body" dangerouslySetInnerHTML={{ __html: decode(exhibit.body) }} />
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

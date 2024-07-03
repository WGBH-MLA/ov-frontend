import { decode } from "html-entities"
import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "./pageHelpers"
import { renderBlocks, renderBlock, textContent, headingContent } from "./contentHelpers"

export function renderExhibit(exhibit){
  let sidebar = renderSidebar("exhibit", exhibit.body.filter( (block) => block.type == "heading") )

  let titleBar
  if(exhibit.title){

    let hero
    if(exhibit.hero_image){
      hero = exhibit.hero_image.full_url
    } else {
      hero = "/public/gbh-mural.jpg"
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
  if(exhibit.authors && exhibit.authors.length > 0 && exhibit.authors[0].name){
    // a blank (unspecified) author is currently valid
    
    console.log( 'i like my authors', exhibit.authors )
    let bio
    if(exhibit.authors[0].bio){
      bio = (
        <div className="author-bio" dangerouslySetInnerHTML={{ __html: decode(exhibit.authors[0].bio) }} />
      )
    }

    let byline = (
      <div className="author-byline">
        <div>By { exhibit.authors[0].name }</div>
      </div>
    )

    let extras = (
      <div className="author-extras">
        { byline }
        { bio }
      </div>
    )

  
    exhibitAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(exhibit.authors[0]) }
        { extras }
      </div>
    )
  }

  let bodyContent
  if(exhibit.body && exhibit.body.length > 0){
    bodyContent = renderBlocks(exhibit.body)
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { exhibitAuthor }
        { sidebar }

        <div className="page-body-container">

          <div className="page-body">
            { bodyContent }
          </div>
        </div>

        { bottomBar }
      </div>
    </div>
  )
}

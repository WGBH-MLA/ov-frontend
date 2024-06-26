import { decode } from "html-entities"
import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "./pageHelpers"
import { renderBlocks, renderBlock, textContent, headingContent } from "./contentHelpers"

export function renderExhibit(exhibit){
  let sections
  if(exhibit.sections){
    sections = exhibit.sections
  } else {
    sections = []
  }
  let sidebar = renderSidebar("exhibit", exhibit.body.filter( (block) => block.type == "heading") )

  let titleBar
  if(exhibit.title){

    let hero
    if(exhibit.hero_image){
      hero = exhibit.hero_image.full_url
    } else {
      hero = "/gbh-mural.jpg"
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

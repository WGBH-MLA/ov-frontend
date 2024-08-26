import { decode } from "html-entities"
import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar, renderFootnoteSection, renderFootnotesInBody } from "./pageHelpers"
import { renderBlocks, renderBlock, textContent, headingContent } from "./contentHelpers"

export function renderExhibit(exhibit){
  let showAuthors = exhibit.authors && exhibit.authors.length > 0 && exhibit.authors[0].name
  let showFootnotes = exhibit.footnotes && exhibit.footnotes.length > 0
  let sidebar = renderSidebar("exhibit", exhibit.body.filter( (block) => block.type == "heading"), showAuthors, showFootnotes)  

  // console.log( 'you know i exhibit that', exhibit )

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

  let exhibitAuthor, authorBios, authorsTitle
  if(showAuthors){
    // a blank (unspecified) author is currently valid
    authorsTitle = <h3 id="authors-section" className="page-authors-title">{ exhibit.authors.length > 1 ? "Authors" : "Author" }</h3>

    authorBios = exhibit.authors.map( (author, index) => {
      let bio
      if(author.bio){
        bio = (
          <div className="author-bio" dangerouslySetInnerHTML={{ __html: decode(author.bio) }} />
        )
      }

      return (
        <div key={ index } className="page-authorbubble-bottom-container">
          { renderAuthorBubble(author) }
          <div className="author-extras-bottom">
            <div className="author-byline">
              <div>{ author.name }</div>
            </div>
            { bio }
          </div>
        </div>
      )
    })
    
    let byline = (
      <div className="author-byline">
        <div>By { exhibit.authors.map((author) => { return author.name }).join(", ") }</div>
      </div>
    )

    let extras = (
      <div className="author-extras">
        { byline }
      </div>
    )
  
    let bubbles
    if(exhibit.authors){
      bubbles = exhibit.authors.map((author, index) => renderAuthorBubble(author, "stack", index))
    }
    exhibitAuthor = (
      <div className="page-authorbubble-stacked">
        { bubbles }
        { extras }
      </div>
    )
  }

  let footnoteSection
  if(exhibit.footnotes.length > 0){
    footnoteSection = renderFootnoteSection(exhibit.footnotes)
    exhibit.body = renderFootnotesInBody(exhibit.body, exhibit.footnotes)
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

            { footnoteSection }

            { authorsTitle }
            { authorBios }
          </div>
        </div>

        { bottomBar }
      </div>
    </div>
  )
}

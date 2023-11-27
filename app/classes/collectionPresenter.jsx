import { decode } from "html-entities"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"
import { renderBlocks, renderBlock, textContent, interviewsContent, archivalFootageContent, photographsContent, originalFootageContent, relatedContentContent, creditsContent, headingContent, imageContent, sections } from "~/classes/contentHelpers"

export function renderCollection(collection){
  let sidebar
  sidebar = renderSidebar("collections", sections(collection.content))

  let titleBar
  if(collection.title){

    let hero
    if(collection.hero_image){
      hero = collection.hero_image.full_url
    } else {
      hero = "/gbh-mural.jpeg"
    }

    titleBar = renderPageTitleBar(collection.title, hero)
  }

  let blockContent
  if(collection.content && collection.content.length > 0){
    blockContent = renderBlocks(collection.content)
  }

  let introduction
  if(collection.introduction){
    introduction = (
      <div className="content-block">
        <h3>Introduction</h3>
        <div className="content-block-body" dangerouslySetInnerHTML={{ __html: decode(collection.introduction) }} />
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          <div className="page-body">
            { introduction } 
            { blockContent }
          </div>
        </div>
        
      </div>
    </div>
  ) 
}
// hee hee!

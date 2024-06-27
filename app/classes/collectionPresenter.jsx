import { decode } from "html-entities"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "./pageHelpers"
import { renderBlocks, renderBlock, textContent, interviewsContent, archivalFootageContent, photographsContent, originalFootageContent, relatedContentContent, creditsContent, headingContent, imageContent } from "./contentHelpers"
import { handleAapbRecordGroup, AAPBRecord } from "./aapbRecordHelpers"

export function renderCollection(collection){
  let sidebar
  sidebar = renderSidebar("collections", collection.content.filter( (block) => block.type == "heading" || block.type == "interviews" || block.type == "archival_footage" || block.type == "photographs" || block.type == "original_footage" || block.type == "programs" || block.type == "related_content" || block.type == "credits" ) )

  let titleBar
  if(collection.title){

    let hero
    if(collection.hero_image){
      hero = collection.hero_image.full_url
    } else {
      hero = "/gbh-mural.jpg"
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

import { decode } from "html-entities"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"
import { renderBlocks, renderBlock, textContent, interviewsContent, archivalFootageContent, photographsContent, originalFootageContent, relatedContentContent, creditsContent, headingContent, imageContent } from "~/classes/contentHelpers"
import { parseAapbGuids, AAPBRecord } from "~/classes/aapbRecordHelpers"

export function renderCollection(collection){
  console.log( 'hey!', collection )
  let sidebar
  // take every 'heading' type block, which are guaranteed to have a title field
  sidebar = renderSidebar("collections", collection.content.filter( (block) => block.type == "heading" ))

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

  let aapbRecords
  if(collection.aapb_records){
    var guids = parseAapbGuids(collection.aapb_records)

    aapbRecords = guids.map( (guid) => {
      return <AAPBRecord guid={ guid } />
    })
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
            { aapbRecords }
          </div>
        </div>
        
      </div>
    </div>
  ) 
}
// hee hee!

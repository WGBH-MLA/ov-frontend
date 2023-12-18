import { decode } from "html-entities"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"
import { renderBlocks, renderBlock, textContent, interviewsContent, archivalFootageContent, photographsContent, originalFootageContent, relatedContentContent, creditsContent, headingContent, imageContent } from "~/classes/contentHelpers"
import { parseAapbRecordGroup, AAPBRecord } from "~/classes/aapbRecordHelpers"

export function renderCollection(collection){
  // console.log( 'collection data', collection )
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
    // example for aapb content block
    // blockContent = renderBlocks([{type: "aapb_record", guid: "cpb-aacip-bfc89659489"}])
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

  let aapbRecordGroups
  if(collection.aapb_records){
    // collection.aapb_records is an array of aapb_record_groups

    aapbRecordGroups = collection.aapb_records.map( (aapbRecordGroup, index) => {
      // this func is where we split by whitespace v
      var guids = parseAapbRecordGroup(aapbRecordGroup.value.ids)

      // preserve these flags' effect for each aapb_record_group
      var showThumbnail = aapbRecordGroup.value.show_thumbnail
      var showTitle = aapbRecordGroup.value.show_title

      var aapbRecords = guids.map( (guid, index) => {
        return <AAPBRecord key={ index } guid={ guid } showTitle={ showTitle } showThumbnail={ showThumbnail } />
      })

      return (
        <div key={ index } className="aapb-record-group">
          { aapbRecords }
        </div>
      )
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
            { aapbRecordGroups }
          </div>
        </div>
        
      </div>
    </div>
  ) 
}
// hee hee!

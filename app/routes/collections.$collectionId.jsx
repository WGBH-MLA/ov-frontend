import { useLoaderData } from "@remix-run/react"
import { getCollection } from "~/collection"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

// block render methods
// import * as contentHelpers from "~/classes/contentHelpers"
import { renderBlocks, renderBlock, textContent, interviewsContent, archivalFootageContent, photographsContent, originalFootageContent, relatedContentContent, creditsContent, headingContent, imageContent } from "~/classes/contentHelpers"

export const loader = async ( { params } ) => {
  console.log( 'collection id ', params )
  return await getCollection( params.collectionId )
};

export default function Collections() {
  const spec = useLoaderData();
  console.log( 'SINGLE SPEC', spec )  
  let sidebar, sections
  if(spec.sections){
    sections = spec.sections
  } else {
    // temp
    sections = []
  }
  sidebar = renderSidebar("collections", sections)


  let titleBar
  if(spec.title){

    let hero
    if(spec.hero_image){
      hero = spec.hero_image.full_url
    } else {
      hero = "/gbh-mural.jpeg"
    }

    titleBar = renderPageTitleBar(spec.title, hero)
  }

  let blockContent
  if(spec.content && spec.content.length > 0){
    blockContent = renderBlocks(spec.content)
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          <div className="page-body">
            { blockContent }
          </div>
        </div>
        
      </div>
    </div>
  )
}

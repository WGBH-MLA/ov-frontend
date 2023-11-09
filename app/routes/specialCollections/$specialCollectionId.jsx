import { Link, useLoaderData } from "remix"
import { getSpecialCollection } from "~/specialCollection"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

// block render methods
import * as contentHelpers from "~/classes/contentHelpers"

export const loader = async ( { params } ) => {
  return await getSpecialCollection( params.specialCollectionId )
};

export default function SpecialCollections() {
  const spec = useLoaderData();
  console.log( 'SINGLE SPEC', spec )  
  let sidebar
  if(spec.sections){
    sidebar = renderSidebar("specialcollection", spec.sections)
  }

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
    blockContent = contentHelpers.renderBlocks(spec.content)
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

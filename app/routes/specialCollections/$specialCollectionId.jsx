import { Link, useLoaderData } from "remix"
import { getSpecialCollection } from "~/specialCollection"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

export const loader = async ( { params } ) => {
  console.log( 'collection id ', params )
  return await getSpecialCollection( params.specialCollectionId )
};

export default function SpecialCollections() {
  const spec = useLoaderData();
  
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

  let collectionAuthor
  if(spec.author){
    let byline = (
      <div className="author-byline">
        By { spec.author.name }
      </div>
    )
    collectionAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(spec.author) } { byline }
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          { collectionAuthor }

          <div className="page-body" dangerouslySetInnerHTML={{ __html: spec.body }} />
        </div>
        
      </div>
    </div>
  )
}

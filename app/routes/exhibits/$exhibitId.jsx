import { Link, useLoaderData } from "remix"
import { getExhibit } from "~/exhibit"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"


export const loader = async ( { params } ) => {
  // fake data loader
  // import { exhibits } from '~/exhibit_data'
  // return exhibits.items[0]
  console.log( 'exx id ', params )
  return await getExhibit( params.exhibitId )
}

export default function Exhibits() {

  const exhibit = useLoaderData()

  let sidebar
  if(exhibit.sections){
    sidebar = renderSidebar("exhibit", exhibit.sections)
  }

  let titleBar
  if(exhibit.title){
    titleBar = renderPageTitleBar(exhibit.title, exhibit.hero_image)
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
              <Link className="page-nav-link" to="/exhibits" >View all scholar exhibits ></Link>
            </div>
          </div>

          { renderPageLinks('exhibits', exhibit.related_exhibits) }
        </div>
      </div>
    )
  }

  let exhibitAuthor
  if(exhibit.author){
    let byline = (
      <div className="author-byline">
        By { exhibit.author.name }
      </div>
    )
    exhibitAuthor = (
      <div className="page-authorbubble-container">
        { renderAuthorBubble(exhibit.author) } { byline }
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        { titleBar }
        { sidebar }

        <div className="page-body-container">
          { exhibitAuthor }
          <div className="page-body" dangerouslySetInnerHTML={{ __html: exhibit.body }} />
        </div>

        { bottomBar }
      </div>
    </div>
  )
}

function scrollSectionIntoView(section){
  let ele = document.getElementById(section.id)
  ele.scrollIntoView()
}

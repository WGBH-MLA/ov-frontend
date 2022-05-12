import { Link } from "remix"
function renderAuthorBubble(author, boxAttach=false){
  let classes = "author-bubble"
  if(boxAttach){
    // this sticks to bottom right of parent box
    classes += " box-attach"
  }
  return (
    <div style={{ backgroundImage: "url(" + author.image_url + ")" }} className={ classes }>
    </div>
  )
}

function renderPageLink(pageType, page){
  console.log( 'exxx', page )
  let authorBubble = renderAuthorBubble(page.author, true)
  return (
    <div className="pagelink">
      <a href={ '/' + pageType + '/' + page.id }>
        <div className="pagelink-image" style={{ backgroundImage: "url(" + page.cover_image + ")" }}></div>
        <div className="pagelink-title">{ page.title }</div>

        { authorBubble }

        <div className="pagelink-subtitle">By { page.author.name }</div>
      </a>
    </div>
  )
}

function renderPageLinks(pageType, pages){
  let pageLinks = pages.map( (page) => { return renderPageLink(pageType, page) })

return (
    <div className="pagelinks">
      { pageLinks }
    </div>
  )
}

function renderSidebar(pageType, sections){
  let pageTypeName = pageType === "exhibit" ? "Exhibit" ? "Collection"
  return (
    <div className="page-sidebar">
      <div className="page-sidebar-title">In This { pageTypeName }</div>
      { sections.map( (section) => { return renderSidebarSection(section) } ) }
    </div>
  )
}
function renderSidebarSection(section){
  return (
    <a href="#" onClick={ () => { scrollSectionIntoView(section)  } } className="page-sidebar-link">> { section.title }</a>
  )
}

function renderPageTitleBar(title, hero_image_url){
  return (
    <div className="exhibit-titlebar" style={{ backgroundImage: "url(" + hero_image_url + ")" }}>
      <h1 className="exhibit-titlebar-title">{ title }</h1>
    </div>
  )
}


module.exports = { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebarSection, renderSidebar, renderPageTitleBar }

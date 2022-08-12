import { Link } from "remix"
function renderAuthorBubble(author, boxAttach=false){
  let classes = "author-bubble"
  if(boxAttach){
    // this sticks to bottom right of parent box
    classes += " box-attach"
  }
  return (
    <div style={{ backgroundImage: "url(" + process.env.OV_API_URL + author.image.url + ")" }} className={ classes }>
    </div>
  )
}

function renderPageLink(pageType, page){
  console.log( 'exxx', page )
  let authorBubble, authorByline
  if(page.authors && page.authors.length > 0){
    authorBubble = renderAuthorBubble(page.authors[0], true)
    authorByline = (<div className="pagelink-subtitle">By { page.authors[0].name }</div>)
  }

  return (
    <div className="pagelink">
      <a href={ '/' + pageType + '/' + page.id }>
        <div className="pagelink-image" style={{ backgroundImage: "url(" + process.env.OV_API_URL + page.cover_image.url + ")" }}></div>
        <div className="pagelink-title">{ page.title }</div>

        { authorBubble }
        { authorByline }
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
  let pageTypeName = pageType === "exhibit" ? "Exhibit" : "Collection"
  return (
    <div className="page-sidebar">
      <div className="page-sidebar-title">In This { pageTypeName }</div>
      { sections.map( (section) => { return renderSidebarSection(section) } ) }
    </div>
  )
}

function renderSidebarSection(section){
  return (
    <a href="#" onClick={ () => { scrollSectionIntoView(section)  } } className="page-sidebar-link">&gt; { section.title }</a>
  )
}

function renderPageTitleBar(title, hero_image_url, subtitle=null){
  let subtitleContainer
  if(subtitle){
    subtitleContainer = (
      <h2 className="page-titlebar-subtitle">{ subtitle }</h2>
    )
  }

  return (
    <div className="page-titlebar" style={{ backgroundImage: "url(" + hero_image_url + ")" }}>
      <h1 className="page-titlebar-title">
        { title }
        {subtitleContainer}
      </h1>
    </div>
  )
}

module.exports = { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebarSection, renderSidebar, renderPageTitleBar }

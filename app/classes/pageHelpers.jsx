import { decode } from "html-entities"
import { useLoaderData } from "@remix-run/react"

export function renderAuthorBubble(author, boxAttach=false){
  let classes = "author-bubble"
  if(boxAttach){
    // this sticks to bottom right of parent box
    classes += " box-attach"
  }

  return (
    <div style={{ backgroundImage: author.image ? "url(" + author.image.full_url + ")" : "" }} className={ classes }>
    </div>
  )
}

export function renderPageLink(pageType, page, key){
  let authorBubble, authorLink
  
  if(page.authors && page.authors.length > 0){
    let author = page.authors[0]
    if(author.image){
      // can't really have authorbubblewithout an author image!
      authorBubble = renderAuthorBubble(author, true)
    }
    authorLink = (
      <div key={ key } className="pagelink-subtitle">By { author.name }</div>
    )
  }

  return (
    <div className="pagelink">
      <a href={ "/" + pageType + "/" + page.id }>
        <div className="pagelink-image" style={{ backgroundImage: page.cover_image ? "url(" + page.cover_image.full_url + ")" : null }}></div>
        <div className="pagelink-title">{ page.title }</div>
        { authorBubble }
        { authorLink }
      </a>
    </div>
  )
}

export function renderPageLinks(pageType, pages){
  let pageLinks = pages.map( (page, index) => { return renderPageLink(pageType, page, index) })
  return (
    <div className="pagelinks">
      { pageLinks }
    </div>
  )
}

export function renderSidebar(pageType, sections){
  let pageTypeName = pageType === "exhibit" ? "Exhibit" : "Collection"
  
  return (
    <div className="page-sidebar">
      <div className="page-sidebar-title">In This { pageTypeName }</div>
      { sections.map( (section, index) => { return renderSidebarSection(section, index) } ) }
    </div>
  )
}

export function renderSidebarSection(section, key){
  var title
  if(section.type == "heading"){
    title = section.value
  } else {
    // aapb blocks have-a the nested title
    title = section.value.title
  }

  return (
    <a key={ key } onClick={ () => { scrollSectionIntoView(section)  } } className="page-sidebar-link" dangerouslySetInnerHTML={{ __html: decode(title) }} />
  )
}

function scrollSectionIntoView(section){
  let ele = document.getElementById(section.id)
  ele.scrollIntoView({behavior: "smooth", block: "start"})
}

export function renderPageTitleBar(title, hero_image_url, subtitle=null){
  let subtitleContainer
  if(subtitle){
    subtitleContainer = (
      <div className="page-titlebar-subtitle">{ subtitle }</div>
    )
  }

  return (
    <div className="page-titlebar" style={{ backgroundImage: "url(" + hero_image_url + ")" }}>
      <h1 className="page-titlebar-title">
        { title }
        { subtitleContainer }
      </h1>
    </div>
  )
}

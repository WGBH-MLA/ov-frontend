import { decode } from "html-entities"
import { MenuIcon } from "./mobileMenu"
import { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server'

export function renderAuthorBubble(author, style, key){
  let classes = "author-bubble"
  if(style == "attach"){
    // this sticks to bottom right of parent box
    classes += " attach"
  } else if(style == "stack"){
    classes += " stack"
  }

  if(author){
    return (
      <div key={ key } style={{ backgroundImage: author.image ? "url(" + author.image.full_url + ")" : "" }} className={ classes }>
      </div>
    )
  } 
}

export function renderPageLink(pageType, page, key){
  let authorBubble, authorLink
  
  if(page.authors && page.authors.length > 0 && page.authors[0].name){
    let author = page.authors[0]
    if(author.image){
      // can't really have authorbubble without an author image!
      authorBubble = renderAuthorBubble(author, "attach")
    }
    authorLink = (
      <div className="pagelink-subtitle">By { author.name }</div>
    )
  } else {
    authorBubble = renderAuthorBubble(false, "attach")
    authorLink = <div className="pagelink-subtitle" />
  }

  return (
    <div key={key} className="pagelink">
      <a href={ "/" + pageType + "/" + page.meta.slug }>
        <div className="pagelink-image" style={{ backgroundImage: page.cover_image ? "url(" + page.cover_image.full_url + ")" : null }}></div>
        <h4 className="pagelink-title">{ page.title }</h4>
        { authorBubble }
      </a>
      { authorLink }
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

export function renderSidebar(pageType, sections, authors=false){
  let pageTypeName = pageType === "exhibit" ? "Exhibit" : "Collection"
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const sidebarMenu = document.getElementsByClassName('page-sidebar')[0]
    const initialSidebarTop = sidebarMenu?.offsetTop


    window.addEventListener('scroll', function() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > initialSidebarTop) {
        // bar is at top position

        var distanceFromBottom
        var sbLinks = document.getElementsByClassName("page-sidebar-link")
        if(sbLinks.length > 0){
          // there could be no sidebar elements if ex has no authors and no headings

          var lastSbLink = sbLinks[ sbLinks.length - 1 ]
          var sbRect = lastSbLink.getBoundingClientRect()
          var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
          var top = sbRect.top + scrollTop - clientTop;

          var distanceFromBottom = document.body.scrollHeight - top + sbRect.height

          if(distanceFromBottom/document.body.scrollHeight < 0.36){
            // bar is close enough (36vh) to the footer, stop

            sidebarMenu.style.position = "sticky"
            // sidebarMenu.style.backgroundColor = "#f00"
          } else {
            sidebarMenu.style.top = "0"
            sidebarMenu.style.position = "fixed"
            // sidebarMenu.style.backgroundColor = "#0f0"
          }
        }
        
      } else {
        // sidebar is in top position (page header showing)
        sidebarMenu.style.top = initialSidebarTop - scrollTop + "px"
        sidebarMenu.style.position = "fixed"
        // sidebarMenu.style.backgroundColor = "#00f"
      }

    });
  }, []);

  let authorSectionLink
  if(authors){
    authorSectionLink = <a key={ sections.length } onClick={ () => { scrollSectionIntoView("authors-section")  } } className="page-sidebar-link">Authors</a>
  }
  
  return (
    <div className={ isOpen ? "page-sidebar sidebar-open" : "page-sidebar" } >
      <div className="page-sidebar-header">
        <MenuIcon id="sidebar-menu-icon" onClick={() => setIsOpen(!isOpen)} />
        {<div className="page-sidebar-title mobile-hidden">In This { pageTypeName }</div> }
      </div>
      { isOpen && sections.map( (section, index) => { return renderSidebarSection(section, index) }) }
      { authorSectionLink }
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
    <a key={ key } onClick={ () => { scrollSectionIntoView(section.id)  } } className="page-sidebar-link" dangerouslySetInnerHTML={{ __html: decode(title) }} />
  )
}

function scrollSectionIntoView(sectionId){
  let ele = document.getElementById(sectionId)
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
    <div className="page-titlebar" style={{ backgroundImage: `url(${ hero_image_url })` }}>
      <h1 className="page-titlebar-title">
        { title }
        { subtitleContainer }
      </h1>
    </div>
  )
}

export function renderFootnoteContent(footnote, index){
  return (
    <li className="footnote-content" key={ index }>
      <a href={ `#footnote-${ index+1 }` } id={  ovFootnoteSlug(footnote.uuid)  } className="footnote-text" dangerouslySetInnerHTML={{ __html: decode(footnote.text) }}  />
    </li>
  )
}

export function renderFootnoteSection(footnotes){
  var notes = footnotes.map( (footnote, index) => {
    return renderFootnoteContent(footnote, index)
  })

  return (
    <div id="footnote-section">
      <h3>Footnotes</h3> 
      <ul>
        { notes }
      </ul>
    </div>
  )
}

export function ovFootnoteSlug(uuid){
  // um wagtail pastes just the first six characters of uuid field as text in the <footnote> element
  return uuid.slice(0,6)
}

export function renderFootnotesInBody(body, footnotes){
  footnotes.map( (footnote, index) => {
    body = body.map( (contentBlock) => {
      if( contentBlock.type == "text" && contentBlock.value.includes( `<footnote id="${footnote.uuid}">[${ ovFootnoteSlug(footnote.uuid) }]<\/footnote>` ) ){
        // this crazy right here
        contentBlock.value = contentBlock.value.replace(`<footnote id="${footnote.uuid}">[${ ovFootnoteSlug(footnote.uuid) }]<\/footnote>`, renderToString(renderFootnoteLink(footnote, index+1)) )
      }

      return contentBlock
    })
  })

  return body
}

export function renderFootnoteLink(footnote, number){
  return (
    <a className="footnote-link" id={ `footnote-${number}` } href={ `#${ ovFootnoteSlug(footnote.uuid) }` }>{ number }</a>
  )
}

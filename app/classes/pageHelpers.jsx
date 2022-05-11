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

module.exports = { renderAuthorBubble, renderPageLink, renderPageLinks }

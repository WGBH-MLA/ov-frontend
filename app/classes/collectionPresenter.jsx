import { decode } from 'html-entities'
import { renderSidebar, renderPageTitleBar } from './pageHelpers'
import { renderBlocks } from './contentHelpers'
import { SIDEBAR_TYPES } from '~/data/sidebarTypes'

export function renderCollection(collection) {
  let sidebar
  // console.log('rendering collection', collection)
  sidebar = renderSidebar(
    'In This Collection',
    collection.content.filter(block => ( SIDEBAR_TYPES.includes(block.type) && block?.value?.show_sidebar ) )
  )

  let titleBar
  if (collection.title) {
    let hero
    if (collection.hero_image) {
      hero = collection.hero_image.full_url
    } else {
      hero = '/gbh-mural.jpg'
    }

    titleBar = renderPageTitleBar(collection.title, hero)
  }

  let blockContent
  if (collection.content && collection.content.length > 0) {
    blockContent = renderBlocks(collection.content)
  }

  let introduction
  if (collection.introduction) {
    introduction = (
      <div className="content-block">
        <h3>Introduction</h3>
        <div
          className="content-block-body"
          dangerouslySetInnerHTML={{ __html: decode(collection.introduction) }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="page-container">
        {titleBar}
        {sidebar}

        <div className="page-body-container">
          <div className="page-body">
            {introduction}
            {blockContent}
          </div>
        </div>
      </div>
    </div>
  )
}
// hee hee!

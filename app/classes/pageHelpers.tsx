import { decode } from 'html-entities'
import { MenuIcon } from './mobileMenu'
import { useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import trunc from '~/utils/trunc'

export function renderAuthorBubble(author, style, key) {
  let classes = 'author-bubble'
  if (style == 'attach') {
    // this sticks to bottom right of parent box
    classes += ' attach'
  } else if (style == 'stack') {
    classes += ' stack'
  }

  if (author) {
    return (
      <div
        key={key}
        style={{
          backgroundImage: author.image
            ? 'url(' + author.image.full_url + ')'
            : '',
        }}
        className={classes}></div>
    )
  }
}

export function renderPageLink(pageType, page, key) {
  let authorBubble, authorLink

  return (
    <div key={key} className='pagelink'>
      <a href={'/' + pageType + '/' + page.meta.slug}>
        <div
          className='pagelink-image'
          style={{
            backgroundImage: page.cover_image
              ? 'url(' + page.cover_image.full_url + ')'
              : null,
          }}></div>
        <h4 className='pagelink-title'>{trunc(page.title)}</h4>
        {authorBubble}
      </a>
      {authorLink}
    </div>
  )
}

export function renderPageLinks(pageType, pages) {
  let pageLinks = pages.map((page, index) => {
    return renderPageLink(pageType, page, index)
  })
  return <div className='pagelinks'>{pageLinks}</div>
}

export function renderSidebar(
  sidebarTitle,
  sections,
  authors = false,
  footnotes = false
) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const sidebarMenu = document.getElementsByClassName('page-sidebar')[0]
    const initialSidebarTop = sidebarMenu?.offsetTop

    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop

      if (scrollTop > initialSidebarTop) {
        // bar is at top position

        var distanceFromBottom
        var sbLinks = document.getElementsByClassName('page-sidebar-link')
        if (sbLinks.length > 0) {
          // there could be no sidebar elements if ex has no authors and no headings and no footnotes
          var lastSbLink = sbLinks[sbLinks.length - 1]
          var sbRect = lastSbLink.getBoundingClientRect()
          var clientTop =
            document.documentElement.clientTop || document.body.clientTop || 0
          var top = sbRect.top + scrollTop - clientTop

          var distanceFromBottom =
            document.body.scrollHeight - top + sbRect.height

          if (distanceFromBottom / document.body.scrollHeight < 0.36) {
            // bar is close enough (36vh) to the footer, stop
            sidebarMenu.style.position = 'sticky'
          }
        }
      } else {
        // sidebar is in top position (page header showing)
        sidebarMenu.style.top = initialSidebarTop - scrollTop + 'px'
        sidebarMenu.style.position = 'fixed'
      }
    })
  }, [])

  let authorSectionLink
  if (authors) {
    authorSectionLink = (
      <div key={sections.length} className='page-sidebar-link'>
        <a
          onClick={() => {
            scrollSectionIntoView('authors-section')
          }}
          className=''>
          Authors
        </a>
      </div>
    )
  }

  let footnoteSectionLink
  if (footnotes) {
    footnoteSectionLink = (
      <div key={sections.length + 1} className='page-sidebar-link'>
        <a
          onClick={() => {
            scrollSectionIntoView('footnote-section')
          }}
          className=''>
          Footnotes
        </a>
      </div>
    )
  }

  var sidebarSections = sections.map((section, index) => {
    // aapb data has title nested likea so
    let title
    if (section.type == 'heading') {
      title = section.value
    } else if (section.type == 'credits') {
      title = 'Credits'
    } else {
      title = section.value.title
    }

    return renderSidebarSection(title, section.id, index)
  })

  sidebarSections.push(authorSectionLink, footnoteSectionLink)

  return (
    <div className={isOpen ? 'page-sidebar sidebar-open' : 'page-sidebar'}>
      <div className='page-sidebar-header'>
        <MenuIcon id='sidebar-menu-icon' onClick={() => setIsOpen(!isOpen)} />
        <div className='page-sidebar-title mobile-hidden'>{sidebarTitle}</div>
      </div>
      {isOpen && sidebarSections}
    </div>
  )
}

export function renderSidebarSection(title, id, key) {
  return (
    <div key={key} className='page-sidebar-link'>
      <a
        onClick={() => {
          scrollSectionIntoView(id)
        }}
        dangerouslySetInnerHTML={{ __html: decode(title) }}
      />
    </div>
  )
}

function scrollSectionIntoView(sectionId) {
  let ele = document.getElementById(sectionId)
  ele.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

function scrollToAnchor(anchorId) {
  // erase backbutton entry for anchor click
  // location.replace(document.referrer)

  let ele = document.getElementById(anchorId)

  // where we goin
  var destination = ele.getBoundingClientRect().y
  // where ah we
  var currentScrollPosition = window.scrollY

  // just a little extra
  var offset = -96

  // alright bye bye
  window.scrollTo({
    top: destination + currentScrollPosition + offset,
    behavior: 'smooth',
  })
}

export function renderPageTitleBar(title, hero_image_url, subtitle = null) {
  let subtitleContainer
  if (subtitle) {
    subtitleContainer = <div className='page-titlebar-subtitle'>{subtitle}</div>
  }
  //{title}
  return (
    <div
      className='page-titlebar'
      style={{ backgroundImage: `url(${hero_image_url})` }}>
      <h1 className='page-titlebar-title'>
        <div>{title}</div>
        {subtitleContainer}
      </h1>
    </div>
  )
}

export function renderFootnoteContent(footnote, index) {
  return (
    <li className='footnote-content' key={index}>
      <a
        id={ovFootnoteSlug(footnote.uuid)}
        className='footnote-text'
        dangerouslySetInnerHTML={{ __html: decode(footnote.text) }}
      />
    </li>
  )
}

export function renderFootnoteSection(footnotes) {
  var notes = footnotes.map((footnote, index) => {
    return renderFootnoteContent(footnote, index)
  })

  return (
    <div id='footnote-section'>
      <h3>Footnotes</h3>
      <ul>{notes}</ul>
    </div>
  )
}

export function ovFootnoteSlug(uuid) {
  // um wagtail pastes just the first six characters of uuid field as text in the <footnote> element
  return uuid.slice(0, 6)
}

export function renderFootnotesInBody(body, footnotes) {
  useEffect(() => {
    var ftts = document.querySelectorAll('a.footnote-text')
    Array.prototype.slice.call(ftts).map((ele, index) => {
      ele.addEventListener('click', e => {
        // +1 because they start at 1 not 0
        scrollToAnchor(`footnote-${index + 1}`)
      })
    })

    var ftls = document.querySelectorAll('a.footnote-link')
    // sort the footnote links by their number, since they might be created out of order
    Array.prototype.slice
      .call(ftls)
      .sort(({ innerHTML: a }, { innerHTML: b }) => {
        return parseInt(a) - parseInt(b)
      })
      .map((ele, index) => {
        ele.addEventListener('click', e => {
          scrollToAnchor(ovFootnoteSlug(footnotes[index].uuid))
        })
      })
  }, [])

  footnotes.map((footnote, index) => {
    body = body.map(contentBlock => {
      if (
        contentBlock.type == 'text' &&
        contentBlock.value.includes(
          `<footnote id="${footnote.uuid}">[${ovFootnoteSlug(
            footnote.uuid
          )}]<\/footnote>`
        )
      ) {
        // this crazy right here
        contentBlock.value = contentBlock.value.replace(
          `<footnote id="${footnote.uuid}">[${ovFootnoteSlug(
            footnote.uuid
          )}]<\/footnote>`,
          renderToString(renderFootnoteLink(footnote, index + 1))
        )
      }

      return contentBlock
    })
  })

  return body
}

export function renderFootnoteLink(footnote, number) {
  return (
    // <a onClick={ (e) => scrollSectionIntoView( ovFootnoteSlug(footnote.uuid) ) } className="footnote-link">
    <a id={`footnote-${number}`} className='footnote-link'>
      {number}
    </a>
  )
}

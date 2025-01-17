import { useLoaderData, Link } from '@remix-run/react'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Meta } from '~/classes/meta'
import { seriesData } from '~/data/seriesData'

export const meta = () => {
  return [
    {
      title: `GBH Series | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Browse a list of GBH Series and explore records on the American Archive of Public Broadcasting.`,
    },
    ...Meta,
  ]
}

export const loader = async () => {
  return {
    seriesData: seriesData,
    AAPB_HOST: process.env.AAPB_HOST,
  }
}

function renderSeriesLink(series) {
  return (
    <a href={series.url} className='series-link'>
      {series.title}
    </a>
  )
}

export default function Series() {
  const data = useLoaderData()
  const seriesData = data.seriesData
  const [seriesSearch, setSeriesSearch] = useState(true)

  let alphabetLinks = Object.keys(seriesData).map((letter, index) => (
    <Link
      key={index}
      className='series-alphabet-link'
      to={'#series-' + letter.toLowerCase()}>
      {letter}
    </Link>
  ))

  let seriesAlphaGroups = Object.keys(seriesData).map((letter, index) => {
    let seriesGroup = seriesData[letter]
    if (seriesSearch.length > 0) {
      seriesGroup = seriesGroup.filter((title) =>
        title.toLowerCase().includes(seriesSearch)
      )
    }

    seriesGroup = seriesGroup.map((title, groupIndex) => {
      return (
        <a
          key={groupIndex}
          className='series-link'
          href={`${data.AAPB_HOST}/catalog?f[series_titles][]=${title}&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all`}
          target='_blank'>
          {title}
        </a>
      )
    })

    if (seriesGroup.length > 0)
      return (
        <div key={index} className='series-group'>
          <div
            id={'series-' + letter.toLowerCase()}
            className='series-group-letter'>
            {letter}
          </div>
          {seriesGroup}
        </div>
      )
  })

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

  seriesAlphaGroups = seriesAlphaGroups.filter((sG) => sG)
  if (seriesAlphaGroups.length == 0) {
    seriesAlphaGroups = (
      <div>
        No results were found for your search query. Please revise your query
        and try again.
      </div>
    )
  }

  var clearSearch = function () {
    document.getElementById('search').value = ''
    setSeriesSearch('')
  }

  return (
    <div className='page-container'>
      <div className='page-sidebar list-page'>
        <span>
          <h4 className='page-sidebar-title spaced'>Search GBH Series</h4>
          <div className='series-search-container'>
            <input
              id='search'
              className='series-search'
              onKeyUp={(e) => setSeriesSearch(e.target.value.toLowerCase())}
              type='text'
              name='series-search'
              placeholder='Search...'
            />
            <div className='search-clear-button' onClick={(e) => clearSearch()}>
              <X />
            </div>
            <Search />
          </div>

          <h4 className='page-sidebar-title spaced'>Jump To</h4>
          <div className='series-alphabet'>{alphabetLinks}</div>
        </span>
      </div>

      <div className='page-body-container'>
        <div className='page-body'>
          <h1 className='series-bigtitle'>GBH Series</h1>
          <div className='series-summary'>
            Browse by title and explore records on AAPB
          </div>
          {seriesAlphaGroups}
        </div>
      </div>
    </div>
  )
}

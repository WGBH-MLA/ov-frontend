import { useLoaderData, Link } from '@remix-run/react'
import { ExternalLink, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

import { getMasterpiece } from '~/utils/masterpiece'

export const meta = () => {
  return [
    {
      title: `Alistair Cooke Masterpiece Theatre Collection | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `The Andrew and Linda Egendorf Alistair Cooke Masterpiece Theatre Collection.`,
    },
  ]
}

export const loader = async () => {
  return await getMasterpiece()
}

function safeDate(seasonGroup) {
  return (
    seasonGroup &&
    seasonGroup.broadcast_date &&
    new Date(seasonGroup.broadcast_date)
  )
}

export default function Masterpiece() {
  const data = useLoaderData()
  const masterpieceData = data.masterpieceData

  const [masterpieceSearch, setMasterpieceSearch] = useState(true)
  let seasonLinks = Object.keys(masterpieceData).map((seasonNumber, index) => (
    <Link
      key={index}
      className='masterpiece-season-link page-sidebar-link'
      to={'#season-' + seasonNumber}>
      {seasonNumber}
    </Link>
  ))

  let seasonGroups = Object.keys(masterpieceData).map((seasonNumber, index) => {
    let seasonGroup

    if (masterpieceSearch.length > 0) {
      seasonGroup = {}
      var includeThese = Object.keys(masterpieceData[seasonNumber]).filter(
        (title) => title.toLowerCase().includes(masterpieceSearch)
      )
      includeThese.forEach((title) => {
        seasonGroup[title] = masterpieceData[seasonNumber][title]
      })
    } else {
      seasonGroup = masterpieceData[seasonNumber]
    }

    seasonGroup = Object.keys(seasonGroup)
      .map((normalizedMiniseriesTitle, groupIndex) => (
        <a
          key={groupIndex}
          className='masterpiece-link'
          href={`/miniseries/${normalizedMiniseriesTitle}`}
          target='_blank'>
          {seasonGroup[normalizedMiniseriesTitle].title}
        </a>
      ))
      .sort((sg1, sg2) => safeDate(sg1) > safeDate(sg2))

    if (seasonGroup.length > 0) {
      return (
        <div key={index} className='season-group'>
          <div id={'season-' + seasonNumber} className='season-group-number'>
            Season {seasonNumber}
          </div>
          <div className='season-group-content'>{seasonGroup}</div>
        </div>
      )
    } else {
      return false
    }
  })

  // remove whole section for empty season group
  seasonGroups = seasonGroups.flatMap((sg) => sg).filter((sg) => sg)
  if (seasonGroups.length == 0) {
    seasonGroups = (
      <div>
        No results were found for your search query. Please revise your query
        and try again.
      </div>
    )
  }

  // duplicated from renderSidebar, because search etc on mp/series is too different to combine into one thing
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

  var clearSearch = function () {
    document.getElementById('search').value = ''
    setMasterpieceSearch('')
  }

  return (
    <div className='page-container'>
      <div className='page-sidebar list-page'>
        <span>
          <h4 className='page-sidebar-title spaced'>
            Search the Masterpiece Collection
          </h4>
          <div className='series-search-container'>
            <input
              id='search'
              className='series-search'
              onKeyUp={(e) =>
                setMasterpieceSearch(
                  e.target.value.toLowerCase().replace(/\s+/g, '')
                )
              }
              type='text'
              name='series-search'
              placeholder='Search...'
            />
            <div className='search-clear-button' onClick={(e) => clearSearch()}>
              X
            </div>
            <Search />
          </div>

          <h4 className='page-sidebar-title spaced'>Jump To Season</h4>
          <div className='masterpiece-seasons'>{seasonLinks}</div>
        </span>
      </div>

      <div className='page-body-container'>
        <div className='page-body'>
          <h1 className='masterpiece-bigtitle'>
            The Linda and Andrew Egendorf Masterpiece Theatre Alistair Cooke
            Collection
          </h1>

          <div className='masterpiece-intro'>
            <div className='static-halfbox'>
              <div className='masterpiece-summary'>
                The Linda and Andrew Egendorf Masterpiece Theatre Alistair Cooke
                Collection features programs from the anthology series
                Masterpiece Theatre presented during Alistair Cooke’s tenure as
                host (1971-1992). Along with a complete list of those programs
                with descriptions, the collection will also include Alistair
                Cooke’s introductions and conclusions for each episode.
                Additional materials in the collection will be made available
                online or on-site at GBH as they are digitized.{' '}
                <a href='/collections/masterpiece-funders'>
                  Read more about the collection and our funders who made it
                  possible.
                </a>
              </div>
            </div>
            <div className='static-halfbox'>
              <img src='https://s3.amazonaws.com/openvault.wgbh.org/treasuries/alistair_cooke_collection.jpg' />
            </div>

            <a
              href={`${data.AAPB_HOST}/catalog/?f[special_collections][]=alistair-cooke&sort=asset_date+asc`}>
              View All Masterpiece Records on AAPB <ExternalLink size={20} />
            </a>
          </div>

          {seasonGroups}
        </div>
      </div>
    </div>
  )
}

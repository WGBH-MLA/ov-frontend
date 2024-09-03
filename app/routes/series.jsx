import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { getSeries } from "../series"

export const loader = async () => {
  return await getSeries()
}

function renderSeriesLink(series){
  return (
    <a href={ series.url } className="series-link">{ series.title }</a>
  )
}

export default function Series() {
  const data = useLoaderData()
  const seriesData = data.seriesData
  const [seriesSearch, setSeriesSearch] = useState(true)

  let alphabetLinks = Object.keys(seriesData).map( (letter, index) => <a key={index} className="series-alphabet-link" href={ "#series-"+letter.toLowerCase() } >{ letter }</a> )

  let seriesAlphaGroups = Object.keys(seriesData).map( (letter, index) => {
    let seriesGroup = seriesData[letter]
    if(seriesSearch.length > 0){
      seriesGroup = seriesGroup.filter( (title) => title.toLowerCase().includes(seriesSearch) )
    }
    
    seriesGroup = seriesGroup.map( (title, groupIndex) => <a key={groupIndex} className="series-link" href={ `${ data.AAPB_HOST }/catalog?f[series_titles][]=${ title }&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all` } >{ title }</a> )

    return(
      <div key={index} className="series-group">
        <div  id={ "series-"+letter.toLowerCase() } className="series-group-letter">{ letter }</div>
        { seriesGroup }
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
        var sbLinks = document.getElementsByClassName("page-sidebar-link")
        if(sbLinks.length > 0){
          // there could be no sidebar elements if ex has no authors and no headings and no footnotes

          var lastSbLink = sbLinks[ sbLinks.length - 1 ]
          var sbRect = lastSbLink.getBoundingClientRect()
          var clientTop = document.documentElement.clientTop || document.body.clientTop || 0
          var top = sbRect.top + scrollTop - clientTop

          var distanceFromBottom = document.body.scrollHeight - top + sbRect.height

          if(distanceFromBottom/document.body.scrollHeight < 0.36){
            // bar is close enough (36vh) to the footer, stop
            sidebarMenu.style.position = "sticky"
          }
        }
        
      } else {
        // sidebar is in top position (page header showing)
        sidebarMenu.style.top = initialSidebarTop - scrollTop + "px"
        sidebarMenu.style.position = "fixed"
      }

    })
  }, [])
  // seriesAlphaGroups = seriesAlphaGroups.filter( (sG) => sG.length > 0  )
  return (
    <div className="page-container">
      <div className="page-sidebar">
        <h4 className="page-sidebar-title spaced">Search GBH Series</h4>
        <div className="series-search-container">
          <input className="series-search" onKeyUp={ (e) => setSeriesSearch(e.target.value.toLowerCase()) } type="text" name="series-search" placeholder="Series Name" />
          <div className="series-search-button" />
        </div>

        <h4 className="page-sidebar-title spaced">Jump To</h4>
        <div className="series-alphabet">
          { alphabetLinks }
        </div>
      </div>

      <div className="page-body-container">
        <div className="page-body">
          <h1 className="series-bigtitle">GBH Series</h1>
          <div className="series-summary">
            Browse by title and explore records on AAPB
          </div>
          { seriesAlphaGroups  }
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    console.error('series error', error)
    if (error.status !== 404) throw error
    return (
      <div className="page-body-container">
        <h1>Not found</h1>
        <h3>{error.data}</h3>
        <div>{error.statusText}</div>
        <div>Check your spelling, or try another route.</div>
      </div>
    )
  }
}

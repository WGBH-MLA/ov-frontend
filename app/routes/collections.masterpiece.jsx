import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'

import { getMasterpiece } from "../masterpiece"
import { useState } from 'react'

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

function renderSeriesLink(series){
  return (
    <a href={ series.url } className="masterpiece-link">{ series.title }</a>
  )
}

export default function Masterpiece() {
  const data = useLoaderData()
  const masterpieceData = data.masterpieceData

  const [masterpieceSearch, setMasterpieceSearch] = useState(true)
  let seasonLinks = Object.keys(masterpieceData).map( (seasonNumber, index) => <a key={index} className="masterpiece-season-link" href={ "#season-"+seasonNumber } >Season { seasonNumber }</a> )

  let seasonGroups = Object.keys(masterpieceData).map( (seasonNumber, index) => {
    let seasonGroup = masterpieceData[seasonNumber]
    
    if(masterpieceSearch.length > 0){
    
      let keysToRemove = Object.keys(seasonGroup).filter( (title) => !title.toLowerCase().includes(masterpieceSearch) )
      keysToRemove.forEach( (key) => {
        delete seasonGroup[key]  
      })
    }
    
    seasonGroup = Object.keys(seasonGroup).map( (normalizedMiniseriesTitle, groupIndex) => <a key={groupIndex} className="masterpiece-link" href={ `${ data.AAPB_HOST }/catalog?f[series_titles][]=${ normalizedMiniseriesTitle }&f[access_types][]=all` } >{ seasonGroup[normalizedMiniseriesTitle].nice_title }</a> )

    return(
      <div key={index} className="season-group">
        <div id={ "season-"+seasonNumber } className="season-group-number">Season { seasonNumber }</div>
        <div className="season-group-content">
          { seasonGroup }
        </div>
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

  return (
    <div className="page-container">
      <div className="page-sidebar">
        <h4 className="page-sidebar-title spaced">Search the Masterpiece Collection</h4>
        <div className="series-search-container">
          <input className="series-search" onKeyUp={ (e) => setMasterpieceSearch(e.target.value.toLowerCase()) } type="text" name="series-search" placeholder="Series Name" />
          <div className="series-search-button" />
        </div>

        <h4 className="page-sidebar-title spaced">Jump To</h4>
        <div className="masterpiece-season">
          { seasonLinks }
        </div>
      </div>

      <div className="page-body-container">
        <div className="page-body">
          <h1 className="masterpiece-bigtitle">The Linda and Andrew Egendorf Masterpiece Theatre Alistair Cooke Collection</h1>

          <div className="masterpiece-intro">
            <div className="static-halfbox">
              <div className="masterpiece-summary">
                The Linda and Andrew Egendorf Masterpiece Theatre Alistair Cooke Collection features programs from the anthology series Masterpiece Theatre presented during Alistair Cooke’s tenure as host (1971-1992). Along with a complete list of those programs with descriptions, the collection will also include Alistair Cooke’s introductions and conclusions for each episode. Additional materials in the collection will be made available online or on-site at GBH as they are digitized. Read more about the collection and our funders who made it possible.
              </div>
            </div>
            <div className="static-halfbox">
              <img src="https://s3.amazonaws.com/openvault.wgbh.org/treasuries/alistair.png" />
            </div>

          </div>
          { seasonGroups }
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


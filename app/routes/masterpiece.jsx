import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'

import { getMasterpiece } from "../masterpiece"
import { useState } from 'react'

export const loader = async () => {
  return await getMasterpiece()
}

function renderSeriesLink(series){
  return (
    <a href={ series.url } className="series-link">{ series.title }</a>
  )
}

export default function Masterpiece() {
  const data = useLoaderData()
  const masterpieceData = data.masterpieceData

  const [masterpieceSearch, setMasterpieceSearch] = useState(true)
  let seasonLinks = Object.keys(masterpieceData).map( (seasonNumber, index) => <a key={index} className="series-alphabet-link" href={ "#season-"+seasonNumber } >{ seasonNumber }</a> )

  let seasonGroups = Object.keys(masterpieceData).map( (seasonNumber, index) => {
    let seasonGroup = masterpieceData[seasonNumber]
    if(masterpieceSearch.length > 0){
      seasonGroup = seasonGroup.filter( (title) => title.toLowerCase().includes(masterpieceSearch) )
    }
    
console.log( 'its this!', seasonGroup )

    seasonGroup = Object.keys(seasonGroup).map( (normalizedMiniseriesTitle, groupIndex) => <a key={groupIndex} className="series-link" href={ `${ data.AAPB_HOST }/catalog?f[series_titles][]=${ normalizedMiniseriesTitle }&f[access_types][]=all` } >{ seasonGroup[normalizedMiniseriesTitle].nice_title }</a> )

    return(
      <div key={index} className="series-group">
        <div  id={ "season-"+seasonNumber } className="series-group-letter">{ seasonNumber }</div>
        { seasonGroup }
      </div>
    )
  })

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
          { seasonLinks }
        </div>
      </div>

      <div className="page-body-container">
        <div className="page-body">
          <h1 className="series-bigtitle">GBH Series</h1>
          <div className="series-summary">
            Browse by title and explore records on AAPB
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



import { Link, useLoaderData } from "remix"
import React, { useState } from "react"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"
import { seriesData } from "~/data/seriesData"

// // commented out so we can use fake data
// export const loader = async () => {
//   return await getExhibits()
// }

function renderSeriesLink(series){
  return (
    <a href={ series.url } className="series-link">{ series.title }</a>
  )
}

export default function Series() {
  const [seriesSearch, setSeriesSearch] = useState("")
  
  let alphabetLinks = Object.keys(seriesData).map( (letter) => { return (<a className="series-alphabet-link" href={ "#series-"+letter.toLowerCase() } >{ letter }</a>) } )

  let seriesAlphaGroups = Object.keys(seriesData).map( (letter) => {
    let seriesGroup = seriesData[letter]
    if(seriesSearch.length > 0){
      seriesGroup = seriesGroup.filter( (title) => title.toLowerCase().includes(seriesSearch) )
    }
    seriesGroup = seriesGroup.map( (title) => { return <a className="series-link" href="https://americanarchive.org" >{ title }</a> })

    return(
      <div className="series-group">
        <div id={ "series-"+letter.toLowerCase() } className="series-group-letter">{ letter }</div>
        { seriesGroup }
      </div>
    )
  })

  // seriesAlphaGroups = seriesAlphaGroups.filter( (sG) => sG.length > 0  )

  return (
    <div className="page-container">
      <div className="page-sidebar">
        <div className="page-sidebar-title spaced">Search GBH Series</div>
        <div className="series-search-container">
          <input onKeyUp={ (e) => { setSeriesSearch(e.target.value) } } type="text" name="series-search" placeholder="Series Name" />
          <div className="series-search-button" />
        </div>

        <div className="page-sidebar-title spaced">Jump To</div>
        <div className="series-alphabet">
          { alphabetLinks }
        </div>
      </div>

      <div className="page-body-container">
        <h1 className="series-bigtitle">GBH Series</h1>
        <div className="series-summary">
          Browse by title and explore records on AAPB
        </div>
        { seriesAlphaGroups  }          
      </div>
      
    </div>
  )
}

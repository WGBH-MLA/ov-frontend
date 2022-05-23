import { Link, useLoaderData } from "remix"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"

import { seriesData } from "~/data/seriesData"

// // commented out so we can use fake data
// export const loader = async () => {
//   return await getExhibits()
// }



function renderSeriesSidebar(){
  return (
    <div className="page-sidebar">
      <div className="page-sidebar-title">Search GBH Series</div>
      <div className="series-search-container">
        <input type="text" name="series-search" placeholder="Series Name" />
        <div className="series-search-button" />
      </div>

      <div className="page-sidebar-title">Jump To</div>
      <div className="series-alphabet">
        <a className="series-alphabet-link" href="#series-a">A</a>
      </div>
    </div>
  )
}

function renderSeriesLink(series){
  return (
    <a href={ series.url } className="series-link">{ series.title }</a>
  )
}

// function groupByAlpha(r, a) {
//   if ((r[r.length - 1] || [''])[0][0] === a[0]) {
//       r[r.length - 1].push(a);
//   } else {
//       r.push([a]);
//   }
//   return r;
// }

export default function Series() {
  // let seriesLinks = seriesData.map((title) => { return <Link className="series-link" to="https://americanarchive.org" >{ title }</Link> } )

  let seriesAlphaGroups = Object.keys(seriesData).map( (letter) => {
    return(
      <div className="series-group">
        <div className="series-group-letter">{ letter }</div>
        { seriesData[letter].map( (title) => { return <Link className="series-link" to="https://americanarchive.org" >{ title }</Link> }) }
      </div>
    )
  })


  let sidebar = renderSeriesSidebar()
  return (
    <div className="page-container">
      { sidebar }

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

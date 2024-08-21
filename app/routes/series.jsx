import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { useState } from 'react'
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







// export default class Series extends Component {
//   constructor(props){  
//     super(props)

//     this.state = {
//       seriesSearch: ""
//     }
//   }

//   componentDidMount(){
//     // this is a bit annoying, but because we're injecting AAPB_HOST into window, use this hook to grab AAPB_HOST once its available
//     this.setState({aapb_host: window.ENV.AAPB_HOST})
//   }

//   render(){

    // let alphabetLinks = Object.keys(seriesData).map( (letter, index) => { return (<a key={index} className="series-alphabet-link" href={ "#series-"+letter.toLowerCase() } >{ letter }</a>) } )

    // let seriesAlphaGroups = Object.keys(seriesData).map( (letter, index) => {
    //   let seriesGroup = seriesData[letter]
    //   if(this.state.seriesSearch.length > 0){
    //     seriesGroup = seriesGroup.filter( (title) => title.toLowerCase().includes(this.state.seriesSearch) )
    //   }
      
    //   seriesGroup = seriesGroup.map( (title, groupIndex) => { return <a key={groupIndex} className="series-link" href={ `${ this.state.aapb_host }/catalog?f[series_titles][]=${ title }&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all` } >{ title }</a> })

    //   if(seriesGroup.length > 0)
    //   return(
    //     <div key={index} className="series-group">
    //       <div  id={ "series-"+letter.toLowerCase() } className="series-group-letter">{ letter }</div>
    //       { seriesGroup }
    //     </div>
    //   )
    // })

    // // seriesAlphaGroups = seriesAlphaGroups.filter( (sG) => sG.length > 0  )
    // return (
    //   <div className="page-container">
    //     <div className="page-sidebar">
    //       <h4 className="page-sidebar-title spaced">Search GBH Series</h4>
    //       <div className="series-search-container">
    //         <input className="series-search" onKeyUp={ (e) => { this.setState({seriesSearch: e.target.value.toLowerCase() }) } } type="text" name="series-search" placeholder="Series Name" />
    //         <div className="series-search-button" />
    //       </div>

    //       <h4 className="page-sidebar-title spaced">Jump To</h4>
    //       <div className="series-alphabet">
    //         { alphabetLinks }
    //       </div>
    //     </div>

    //     <div className="page-body-container">
    //       <div className="page-body">
    //         <h1 className="series-bigtitle">GBH Series</h1>
    //         <div className="series-summary">
    //           Browse by title and explore records on AAPB
    //         </div>
    //         { seriesAlphaGroups  }
    //       </div>
    //     </div>
    //   </div>
    // )
//   }

// }

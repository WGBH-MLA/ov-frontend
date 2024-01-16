import { useLoaderData } from "@remix-run/react"
import React, { Component } from "react"
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

export default class Series extends Component {
  constructor(props){  
    super(props)

    this.state = {
      seriesSearch: ""
    }
  }

  componentDidMount(){
    // this is a bit annoying, but because we're injecting AAPB_HOST into window, use this hook to grab AAPB_HOST once its available
    this.setState({aapb_host: window.ENV.AAPB_HOST})
  }

  render(){

    let alphabetLinks = Object.keys(seriesData).map( (letter) => { return (<a className="series-alphabet-link" href={ "#series-"+letter.toLowerCase() } >{ letter }</a>) } )

    let seriesAlphaGroups = Object.keys(seriesData).map( (letter) => {
      let seriesGroup = seriesData[letter]
      if(this.state.seriesSearch.length > 0){
        seriesGroup = seriesGroup.filter( (title) => title.toLowerCase().includes(this.state.seriesSearch) )
      }
      
      seriesGroup = seriesGroup.map( (title) => { return <a className="series-link" href={ `${ this.state.aapb_host }/catalog?f[series_titles][]=${ title }&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all` } >{ title }</a> })

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
            <input className="series-search" onKeyUp={ (e) => { this.setState({seriesSearch: e.target.value}) } } type="text" name="series-search" placeholder="Series Name" />
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

}

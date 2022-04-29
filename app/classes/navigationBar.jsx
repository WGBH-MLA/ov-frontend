import React, { Component } from 'react'
import NavigationLink from './navigationLink'

class NavigationBar extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="top-bar-container">

        <div className="purple-bar-container">
          <span className="top-title">Openvault</span>
          <img src="/MLA_logo_white.png" className="ov-logo" />
        </div>

        <div className="navigation-bar-container">
          <div className="navigation-bar">
            <NavigationLink href="/exhibits" text="Exhibits" />
            <NavigationLink href="/specialCollections" text="Special Collections" />

            <span className="affliated-websites-menu">
              Visit our affiliated websites

              <span className="affliated-websites-toggle">V</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = NavigationBar

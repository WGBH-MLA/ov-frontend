import React, { Component } from 'react'
import NavigationLink from './navigationLink'
import DrawerMenu from './drawerMenu'

class NavigationBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      drawerOpen: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer(){
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render(){
    let drawerItems = [
      {
        label: "American Archive of Public Broadcasting (AAPB)",
        subLabel: "Access nearly 12,000 public media programs",
        url: "https://americanarchive.org"
      },
      {
        label: "GBH Stock Sales",
        subLabel: "License footage from GBH programs",
        url: "http://www.wgbhstocksales.org/"
      },
      
    ]

    return(
      <div className="top-bar-container">

        <div className="purple-bar-container">
          <a href="/" className="top-title">Open Vault</a>
          <img src="/MLA_logo_white.png" className="ov-logo" />
        </div>

        <div className="navigation-bar-container">
          <div className="navigation-bar">
            <NavigationLink href="/exhibits" text="Exhibits" />
            <NavigationLink href="/specialCollections" text="Special Collections" />

            <DrawerMenu toggleDrawer={ this.toggleDrawer } drawerOpen={ this.state.drawerOpen } label={ "Visit our affiliated websites" } items={ drawerItems } />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = NavigationBar

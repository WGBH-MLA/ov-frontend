import React, { Component } from 'react'
import { NavigationLink } from './navigationLink'
import { DrawerMenu } from './drawerMenu'
import { MobileMenu } from './mobileMenu'

export class NavigationBar extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let aboutLinks = [
      {
        label: "About Open Vault",
        url: "/about"
      },
      {
        label: "Support Us",
        url: "/supportus"
      },
      {
        label: "Visit Us",
        url: "/visitus"
      },
      {
        label: "FAQ",
        url: "/faq"
      },
      {
        label: "Credits",
        url: "/credits"
      },

    ]

    let affiliatedSites = [
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
          <MobileMenu />

          <div id="navigation-bar" className="navigation-bar">
            <NavigationLink href="/series" text="GBH Series" />
            <NavigationLink href="/exhibits" text="Scholar Exhibits" />
            <NavigationLink href="/collections" text="Collections" />
            <DrawerMenu classes="about-menu" toggleDrawer={ this.toggleDrawer } label={ "About" } items={ aboutLinks } />

            <DrawerMenu classes=" affiliated-websites-menu" toggleDrawer={ this.toggleDrawer } label={ "Visit our affiliated websites" } items={ affiliatedSites } />
          </div>
        </div>
      </div>
    )
  }
}

import { Component } from 'react'
import { NavigationLink, NavigationSpacer } from './navigationLink'
import { DrawerMenu } from './drawerMenu'
import { MobileMenu } from './mobileMenu'

let aboutLinks = [
  {
    label: 'About Open Vault',
    url: '/about',
  },
  {
    label: 'Support Us',
    url: 'https://gbharchivesopenvault.donorsupport.co/page/general-fundraising',
  },
  {
    label: 'Visit Us',
    url: '/visit-us',
  },
  {
    label: 'FAQ',
    url: '/faq',
  },
  {
    label: 'Credits',
    url: '/credits',
  },
]

let affiliatedSites = [
  {
    label: 'American Archive of Public Broadcasting (AAPB)',
    subLabel: 'Access nearly 12,000 public media programs',
    url: 'https://americanarchive.org',
  },
  {
    label: 'GBH Stock Sales',
    subLabel: 'License footage from GBH programs',
    url: 'http://www.wgbhstocksales.org/',
  },
]
export class NavigationBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="top-bar-container">
        <div className="purple-bar-container">
          <a href="/" className="top-title">
            Open Vault
          </a>
          <img src="/MLA_logo_white.png" className="ov-logo" />
        </div>

        <div className="navigation-bar-container">
          <MobileMenu />

          <div id="navigation-bar" className="navigation-bar mobile-hidden">
            <NavigationLink href="/exhibits" text="Scholar Exhibits" />
            <NavigationLink href="/collections" text="Special Collections" />
            <NavigationLink href="/series" text="GBH Series" />

            <DrawerMenu
              classes="about-menu"
              toggleDrawer={this.toggleDrawer}
              label={'About'}
              items={aboutLinks}
            />

            <NavigationLink href="/search" text="Search" />

            <NavigationSpacer />
            <DrawerMenu
              classes="affiliated-websites-menu"
              toggleDrawer={this.toggleDrawer}
              label={'Visit our affiliated websites'}
              items={affiliatedSites}
            />
          </div>
        </div>
      </div>
    )
  }
}

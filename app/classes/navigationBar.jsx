import { useLocation } from 'react-router';
import { NavigationLink, NavigationSpacer } from './navigationLink'
import { DrawerMenu } from './drawerMenu'
import { MobileMenu } from './mobileMenu'

const aboutLinks = [
  {
    label: 'About Open Vault',
    url: '/about',
  },
  {
    label: 'Support Us',
    url: 'https://gbharchivesopenvault.donorsupport.co/page/general-fundraising',
    external: true,
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
  {
    label: 'Contact Us',
    url: '/contact-us',
  },
]

const affiliatedSites = [
  {
    label: 'American Archive of Public Broadcasting',
    subLabel: 'Access nearly 12,000 public media programs',
    url: 'https://americanarchive.org',
    external: true,
  },
  {
    label: 'GBH Stock Sales',
    subLabel: 'License footage from GBH programs',
    url: 'http://www.wgbhstocksales.org/',
    external: true,
  },
  {
    label: 'Boston Local TV News',
    subLabel: 'Learn more about the history of Boston’s local news',
    url: 'https://bostonlocaltv.org/',
    external: true,
  },
]

export function NavigationBar() {
  const pathname = useLocation().pathname
  return (
    <>
      <div className='top-bar-container'>
        <div className='purple-bar-container'>
          <a href='/' className='top-title'>
            Open Vault
          </a>
          <img src='/MLA_logo_white.png' className='ov-logo' />
          {/* Donate button */}
          <a
            href='https://gbharchivesopenvault.donorsupport.co/page/general-fundraising'
            className='donate-button'
            target='_blank'
            rel='noopener noreferrer'
          >
            Donate
          </a>
        </div>
      </div>

      <div className='navigation-bar-container'>
        <MobileMenu />

        <div id='navigation-bar' className='navigation-bar mobile-hidden'>
          <NavigationLink
            highlight={pathname.startsWith('/collections')}
            href='/collections'
            text='Special Collections'
          />
          <NavigationLink
            highlight={pathname.startsWith('/exhibits')}
            href='/exhibits'
            text='Scholar Exhibits'
          />
          <NavigationLink
            highlight={pathname.startsWith('/series')}
            href='/series'
            text='GBH Series'
          />

          <DrawerMenu classes='about-menu' label={'About'} items={aboutLinks} />

          <NavigationLink
            highlight={pathname.startsWith('/search')}
            href='/search'
            text='Search'
          />

          <NavigationSpacer />
          <DrawerMenu
            classes='affiliated-websites-menu'
            label={'Visit our affiliated websites'}
            items={affiliatedSites}
          />
        </div>
      </div>
    </>
  )
}

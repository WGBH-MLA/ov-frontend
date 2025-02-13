import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: Rock and Roll | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function RockCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: Rock and Roll',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/discoverywoodsetcameraWide.jpg',
    'Open Vault provides online access to unique and historically important content produced by GBH.'
  )

  return (
    <div className='page-container'>
      {titleBar}

      <div className='page-sidebar' />

      <div className='page-body-container'>
        <div className='page-body'>
          
          <p className='static-section'>
            <a href="http://www.grammy.org"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/Grammy.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            <a href="collections/rock-and-roll">The Rock and Roll Collection</a> was made possible by a grant from the GRAMMY Foundation.
          </p>

          <p className='static-section'>
            <div className="purple bold spaced">Project Director</div>
            <div className="black">Karen Cariani</div>

            <div className="purple bold spaced">Project Staff></div>
            <div className="black">Kevin Carter</div>
            <div className="black">Nancy Dillon</div>
            <div className="black">Julie Ecker</div>
            <div className="black">Peter Higgins</div>
            <div className="black">Keith Luf</div>
            <div className="black">Paul Plutnicki</div>
            <div className="black">Nicholas Pollard</div>
          </p>
        </div>
      </div>
    </div>
  )
}

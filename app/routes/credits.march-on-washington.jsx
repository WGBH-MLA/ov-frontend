import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: March on Washington | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function MowCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: March on Washington',
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
            <a href="http://www.arts.gov"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/NEA.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            <a href="collections/march-on-washington">The March on Washington</a>collection was supported in part by Save America's Treasures through a partnership between the National Endowment for the Arts and the National Park Service, Department of the Interior.
          </p>

          <p className='static-section'>
            <div className="purple bold spaced">Project Director</div>
            <div className="black">Karen Cariani</div>

            <div className="purple bold spaced">Project Staff</div>
            <div className="black">Chris Beer</div>
            <div className="black">Karen Colbron</div>
            <div className="black">Paul Plutnicki</div>
          </p>
        </div>
      </div>
    </div>
  )
}

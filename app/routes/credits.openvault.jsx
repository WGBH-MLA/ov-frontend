import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: Open Vault | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function OpenvaultCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: Open Vault',
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
            <a href="http://www.imls.gov"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/IMLS.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            The creation of Open Vault: WGBH Media Library and Archives Web site was made possible in part by the <a href="https://imls.gov">Institute of Museum and Library Services <ExternalLink size={12} /></a>. (IMLS Grant Log Number <a href="https://www.imls.gov/grants/awarded/lg-05-05-0220-05">LG-05-05-0220-05</a>). Any views, findings, conclusions or recommendations expressed in this website do not necessarily represent those of the IMLS.
          </p>

          <p className='static-section'>
            <a href="http://www.macfound.org"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/MacArthur.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            The prototype website was funded in part by The John D. and Catherine T. MacArthur Foundation.
          </p>

          <p className='static-section'>
            IMLS further funded the development of Open Vault in 2008 by supporting the <a href="/collections/the-vietnam-collection">Vietnam Collection</a>
          </p>

          <p className='static-section'>
            All content on this site is the intellectual property of WGBH Educational Foundation, which is solely responsible for this work.
          </p>

          <div className="static-halfbox small-text spaced static-credits">
            <div>
              <div className="purple bold spaced">Project Management</div>
              <div className="black">Karen Cariani, Project Director</div>
              <div className="black">Karen Colbron, Project Manager</div>
            </div>

            <div>
              <div className="purple bold spaced">Business Manager</div>
              <div className="black">Paul Plutnicki</div>
            </div>

            <div>
              <div className="purple bold spaced">Content Production</div>
              <div className="black">Helen Brady, Production Assistant</div>
              <div className="black">Susan Levene, Content Producer</div>
            </div>

            <div className="hidden">
              <div className="purple bold spaced">GBH Archives</div>
              <div className="black">Peter Higgins, Archives Manager</div>
              <div className="black">Erica Titkemeyer, Archives Systems and Technology Manager</div>
              <div className="black">Andrew Meyers, Senior Software Developer</div>
              <div className="black">Henry Neels, Senior Software Developer</div>
              <div className="black">Ryan Harbert, Software Developer</div>
            </div>

            <div>
              <div className="purple bold spaced">GBH Legal</div>
              <div className="black">Nike Okediji</div>
              <div className="black">Susan Rosen</div>
              <div className="black">Doug Ryan</div>
            </div>

            <div>
              <div className="purple bold spaced">Copyeditor</div>
              <div className="black">Eleanor Beram</div>
            </div>
          </div>
          <div className="static-halfbox small-text spaced static-credits">
            <div>
              <div className="purple bold spaced">With thanks to</div>
              <div className="black">
                Steve Baldwin, National Boston Ned Biddle, National Boston
                Kevin Carter, technical advisor, GBH Nancy Dillon, library
                manager, GBH Dale Freeman, assistant archivist, Archives and
                Special Collections Department, Healey Library, University of
                Massachusetts at Boston
              </div>
            </div>

            <div>
              <div className="purple bold spaced">
                Special thanks to our friends and colleagues in Archives:
              </div>
              <div className="black">
                Jordan Berson, Mary Ide, Keith Luf, Jonathan Pipe, Leah Weisse
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

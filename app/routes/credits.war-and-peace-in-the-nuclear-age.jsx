import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: Open Vault War and Peace in the Nuclear Age | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function WapinaCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: Open Vault War and Peace in the Nuclear Age',
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
            <a href="http://www.neh.gov"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/NEH.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            <a href="collections/war-and-peace-in-the-nuclear-age">This Collection</a> has been made possible in part by a major grant from the National Endowment for the Humanities: Exploring the Human Endeavor. Major funding for War and Peace in the Nuclear Age broadcast program was provided by the Annenberg/CPB Project.
          </p>

          <p className='static-section'>
            <div className="purple bold spaced">Project Management</div>
            <div className="black">Karen Cariani, Project Director</div>
            <div className="black">Karen Colbron, Project Consultant</div>
            <div className="black">Keith Luf, Project Manager</div>

            <div className="purple bold spaced">Content Production</div>
            <div className="black">Peter Higgins</div>
            <div className="black">Lynn Mason</div>
            <div className="black">Michael Muraszko</div>
            <div className="black">Sadie Roosa</div>
            <div className="black">Alison Smith</div>
            <div className="black">Leah Weisse</div>

            <div className="purple bold spaced">Business Managers</div>
            <div className="black">Nicholas Pollard</div>
            <div className="black">Paul Plutnicki</div>

            <div className="purple bold spaced">Web Production</div>
            <div className="black">Kevin Carter</div>
            <div className="black">Andrew Myers</div>
            <div className="black">Michael Steadman</div>

            <div className="purple bold spaced">Advisor</div>
            <div className="black">Malcolm Byrne, Deputy Director and Director of Research, National Security Archive</div>

            <div className="purple bold spaced">Legal</div>
            <div className="black">Julie Ecker</div>
            <div className="black">Susan Rosen</div>
            <div className="black">Kate Van Slate</div>

            <div className="purple bold spaced">Interns</div>
            <div className="black">Alyda Porter</div>
            <div className="black">Bruce Vencill</div>
              

          </p>
          <p className='static-section'>
            Poster Artwork Courtesy of <a href="http://www.jansawka.com/">Jan Sawka, 1988</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

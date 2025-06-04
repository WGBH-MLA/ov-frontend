import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: Say Brother | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function SayBrotherCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: Say Brother',
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
            <a href="/collections/say-brother">The Say Brother Collection</a> web site, now incorporated into Open Vault, was made possible though a grant from the National Endowment for the Humanities. However, all content on this site is the intellectual property of the WGBH Educational Foundation, which is solely responsible for this work.
          </p>

          <p className='static-section'>
            <div className="purple bold spaced">Media Library & Archives</div>
            <div className="black">Emily R. Novak, Project Archivist</div>
            <div className="black">Mary Ide, Grant Supervisor</div>
            <div className="black">Sarah-Ann Shaw, Grant Consultant</div>
            <div className="black">Scott Turner, Preservation Supervisor</div>
            <div className="black">Thom Shepard, FileMaker Implementation and HTML Export</div>

            <div className="purple bold spaced">GBH Digital</div>
            <div className="black">Web Site Producer: Caitlin O’Neil</div>
            <div className="black">Interactive Designer: Tyler Howe</div>
            <div className="black">Developer: Molly Frey</div>
            <div className="black">Technical Oversight: Kevin Carter and Dave MacCarn</div>
            <div className="black">Web Rights and Clearance: Julie Ecker</div>

            <div className="purple bold spaced">With special thanks to</div>
            <div className="black">Selene Colburn</div>
            <div className="black">Lacey Dean</div>
            <div className="black">Jim Deering</div>
            <div className="black">Cynthia Johnson</div>
            <div className="black">Keith Luf</div>
            <div className="black">Lauren Marano</div>
            <div className="black">Christopher McNeice</div>
            <div className="black">Courtney Michael</div>
            <div className="black">Jane Pikor</div>
            <div className="black">Jonathan Pipe</div>
            <div className="black">Marita Rivero, VP</div>
            <div className="black">Anya Vinokour</div>
            <div className="black">Leah Weisse</div>
            <div className="black">Archives interns Christina Finneran, Dawn Marsh, Jenny Smilovitz</div>
            <div className="black">The Winthrop Group, Inc.</div>
            <div className="black">The staffs of GBH’s Basic Black and Production Services</div>
          </p>
        </div>
      </div>
    </div>
  )
}

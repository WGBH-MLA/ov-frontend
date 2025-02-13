import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: New Television Workshop | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function NTWCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: New Television Workshop',
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
            <a href="/collections/new-television-workshop">The New Television Workshop Collection</a> was preserved, arranged, and described by the WGBH Media Library and Archives with support from the National Endowment for the Arts (Grant # A 96 - 019016). Materials in the collection include videos from the New Television Workshop, as well as early video arts works that pre-dated organization of the New Television Workshop and ancillary but related video art works produced by WGBH.
          </p>

          <p className='static-section'>
            <div className="purple spaced black">Project Contributors</div>
              <div className="black">Selene Colburn, Project Archivist</div>
              <div className="black">Mary Ide, Grant Supervisor</div>
              <div className="black">Susan Dowling, Grant Consultant</div>
              <div className="black">Carl Piermarini, Preservation Supervisor</div>
              <div className="black">Thom Shepard, FileMaker Implementation and HTML Export</div>
              <div className="black">Lee Shane, Rights Clearance Coordinator</div>
              <div className="black">Nathan Georgitis, Project Intern</div>
              <div className="black">Steve Maloney, Project Intern and Assistant</div>
              <div className="black">Arthur Smith and Chris Wise, Web Design Oversight</div>
              <div className="black">Joan Hazard, Web Graphics</div>
              <div className="black">Kevin Carter and Dave MacCarn, Technical Oversight</div>

              <div className="purple spaced black">Special Thanks to</div>
              <div className="black">David Atwood</div>
              <div className="black">Fred Barzyk</div>
              <div className="black">Jane Beal</div>
              <div className="black">Larry Buck</div>
              <div className="black">Karen Cariani</div>
              <div className="black">Jeremy D’Entremont</div>
              <div className="black">Lacey Dean</div>
              <div className="black">Tracy Deschenes</div>
              <div className="black">Patricia Dwyer</div>
              <div className="black">Julie Ecker</div>
              <div className="black">Electronic Arts Intermix</div>
              <div className="black">Meghan Fallon</div>
              <div className="black">Jay Fialkov</div>
              <div className="black">Rich Harrison</div>
              <div className="black">Nancy Mason Hauser</div>
              <div className="black">Rick Hauser</div>
              <div className="black">Karen Johnson</div>
              <div className="black">Maureen Jordan</div>
              <div className="black">Galen Joseph-Hunter</div>
              <div className="black">Sue Kantrowitz</div>
              <div className="black">Evie Kintzer</div>
              <div className="black">Karen Lally</div>
              <div className="black">Brian Lee</div>
              <div className="black">David Liroff</div>
              <div className="black">Leita Luchetti</div>
              <div className="black">Marni Ludwig</div>
              <div className="black">Keith Luf</div>
              <div className="black">Courtney Michael</div>
              <div className="black">Michael Mushlitz</div>
              <div className="black">Carl Piermarini</div>
              <div className="black">Poets House</div>
              <div className="black">Paul Plutnicki</div>
              <div className="black">Leslie Spears</div>
              <div className="black">Vladimir Stefanovic</div>
              <div className="black">Olivia Tappan</div>
              <div className="black">Ian Wedegartner</div>
              <div className="black">Howard Weinberg</div>
              <div className="black">Leah Weisse</div>

          </p>
        </div>
      </div>
    </div>
  )
}

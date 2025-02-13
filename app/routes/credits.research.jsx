import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: Digital Library Initiative | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function ResearchCredits() {
  let titleBar = renderPageTitleBar(
    'Credits: Digital Library Initiative',
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
            <a href="https://mellon.org/"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/Mellon.jpg" /><ExternalLink size={12} /></a>
          </p>

          <p className='static-section'>
            Funded by The Andrew W. Mellon Foundation, the GBH Archives Digital Library Initiative has completed three phases. In the <a href="https://s3.amazonaws.com/openvault.gbh.org/resources/reports/phase-1.pdf">first phase</a>, GBH conducted an assessment of the value of our archival collections for scholarly use. In the <a href="https://s3.amazonaws.com/openvault.wgbh.org/resources/reports/phase-2.pdf">second phase</a>, “Developing a Public Television Content Delivery System for Academic Institutions,” GBH developed Open Vault Research. Designed in close collaboration with scholars, this prototype web site facilitated research access to the collections. Further, working with Ithaka S+R, we investigated the sustainability of online archives for academic use. In the <a href="https://s3.amazonaws.com/openvault.wgbh.org/resources/reports/phase-3.pdf">third phase</a>, we explored the best methods for bringing our catalog online for scholarly and public access and helped drive new interest and scholarly work around our resources. Functionality from Open Vault Research and lessons from all three phases of the Digital Library Initiative have since been incorporated into the design and development of the current Open Vault.
          </p>

          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Principal Investigators</div>  
            <div className="black">Karen Cariani - Director, GBH Archives</div>
            <div className="black">Peter Pinch - Director of Technology, GBH Interactive</div>
            <div classname=" static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Advisors</div>  
            <div className="black">John W. Dower - Ford International Professor of History, Massachusetts Institute of Technology</div>
            <div className="black">James Blight and Janet Lang - Watson Institute for International Studies, Brown University</div>
            <div className="black">Peter Winn - Professor of History, Tufts University</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Project Team</div>  
            <div className="black">Courtney Michael, Project Manager</div>
            <div className="black">Chris Beer, Developer</div>
            <div className="black">Mayo Todorovic, Designer</div>
            <div className="black">Jim Barton, Business Manager</div>
            <div className="black">Paul Plutnicki, Business Manager</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Sustainability Research</div>  
            <div className="black">Ithaka S + R</div>
            <div className="black">Laura Brown</div>
            <div className="black">Kirby Smith</div>
            <div className="black">Matthew Loy</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Legal Research</div>  
            <div className="black">Jill Goldberg</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Production Assistance</div>  
            <div className="black">Michael Delia</div>
            <div className="black">Jeffrey Elias</div>
            <div className="black">Michael Murasko</div>
            <div className="black">Leah Weisse</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Encoding</div>  
            <div className="black">Jon Alper</div>
          </div>
          <div classname="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Special Thanks to</div>  
              <div className="black">Marisa Castrini</div>
              <div className="black">Karen Colbron</div>
              <div className="black">Nancy Dillon</div>
              <div className="black">Kim Ducharme</div>
              <div className="black">Dov Frede</div>
              <div className="black">Sarah Grafman</div>
              <div className="black">Philip Landry</div>
              <div className="black">Keith Luf</div>
              <div className="black">Christopher McNeice</div>
              <div className="black">Shigeru Miyagawa</div>
              <div className="black">Michael Steadman</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `About | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function About() {
  let titleBar = renderPageTitleBar(
    'Credits: The Vietnam Collection',
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
            <a href="/collections/the-vietnam-collection">The Vietnam Collection</a> was made possible in part by the <a href="https://www.imls.gov">Institute of Museum and Library Services (IMLS)</a> (IMLS Grant Log Number <a href="https://www.imls.gov/grants/awarded/lg-05-07-0166-07">LG-05-07-0166-07</a>). Any views, findings, conclusions or recommendations expressed in this website do not necessarily represent those of the IMLS.
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
            <div className="purple bold spaced">Project Management</div>
            <div className="black">Karen Cariani, Project Director</div>
            <div className="black">Karen Colbron, Project Manager</div>
            <div className="black">Content Production</div>
            <div className="black">Jeff Elias</div>
            <div className="black">Dov Frede</div>
            <div className="black">Courtney Michael</div>
            <div className="black">Lindsay Skay Whitacre</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Business Manager</div>
            <div className="black">Paul Plutnicki</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Web Production, Design, and Development, GBH Interactive</div>
            <div className="black">Sarah Grafman, Producer</div>
            <div className="black">Chris Beer, Developer</div>
            <div className="black">Peter Pinch, Director of Technology</div>
            <div className="black">Li Wei, Senior Designer</div>
            <div className="black">Mayo Todorovic, Designer</div>
            <div className="black">Kim Ducharme, Associate Design Director</div>
            <div className="black">Heather Myers, QA</div>
            <div className="black">Malika Rajan, QA</div>
            <div className="black">Jim Barton, Business Operations Manager</div>
            <div className="black">Alan West, Director of Administration</div>
            <div className="black">Ron LaRussa, Director GBH Interactive</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">GBH Legal</div>
            <div className="black">Nike Okediji</div>
            <div className="black">Susan Rosen</div>
            <div className="black">Doug Ryan</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">With thanks to</div>
            <div className="black">ABC News VideoSource</div>
            <div className="black">CBS News</div>
            <div className="black">Steve Baldwin, National Boston</div>
            <div className="black">Ned Biddle, National Boston</div>
            <div className="black">Billy Stuart, National Boston</div>
            <div className="black">Dale Freeman, University of Massachusetts Boston</div>
            <div className="black">Elizabeth Mock, University of Massachusetts Boston</div>
            <div className="black">Frank Moretti, CCNMTL</div>
            <div className="black">Mark Phillipson, CCNMTL</div>
            <div className="black">Maria Janelli, CCNMTL</div>
            <div className="black">Jonah Bossewitch, CCNMTL</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Special thanks to our colleagues in the Media Library and Archives</div>
            <div className="black">Nancy Dillon</div>
            <div className="black">Julie Ecker</div>
            <div className="black">Jill Goldberg</div>
            <div className="black">Keith Luf</div>
            <div className="black">Mike Muraszko</div>
            <div className="black">Leah Weisse</div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">    
            <div className="purple bold spaced">Thanks to our project partners</div>
            <div className="black"><a href="https://www.umb.edu/">University of Massachusetts Boston</a></div>
            <div className="black"><a href="https://www.umb.edu/joinerinstitute">The William Joiner Center of the University of Massachusetts Boston</a></div>
            <div className="black"><a href="https://ctl.columbia.edu/">Columbia University: Columbia Center for New Media Teaching and Learning</a></div>
          </div>

          <div className="static-halfbox small-text spaced static-credits">
            <div className="purple bold spaced">Thanks to</div>

            <div className="black">Footage Courtesy of <a href="https://www.abcnewsvsource.com/">ABC News</a></div>
            <div className="black">Footage Courtesy of <a href="https://www.cbsnews.com/">CBS News</a></div>
            <div className="black">National Boston</div>
          </div>
              


        </div>
      </div>
    </div>
  )
}

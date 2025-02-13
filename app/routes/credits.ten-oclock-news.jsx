import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ExternalLink } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `Credits: 10 O'Clock News | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Funders and credits for the Ten O'Clock News Collection.`,
    },
    ...Meta,
  ]
}

export default function CreditsTenOclockNews() {
  let titleBar = renderPageTitleBar(
    'Credits: 10 O\'Clock News',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/2mobile3.jpg'
  )
  return (
    <div>
      <div className="page-container">
        {titleBar}

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
                    <p className='static-section'>
              <a href="http://www.imls.gov"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/IMLS.jpg" /><ExternalLink size={12} /></a>
            </p>
            <p className='static-section'>
              <a href="http://www.clir.org"><img src="https://s3.amazonaws.com/openvault.wgbh.org/logos/CLIR.jpg" /><ExternalLink size={12} /></a>
            </p>

            <p className='static-section'>
              <a href="/collections/boston-tv-news-digital-library">The original Ten O’Clock News project</a> web site, which is now incorporated into the <a href="http://bostonlocaltv.org">Boston TV News Digital Library</a>, was made possible in part by the <a href="http://www.imls.gov">Institute of Museum and Library Services (IMLS)</a> (IMLS Grant Log Number <a href="https://www.imls.gov/grants/awarded/lg-05-09-0050-09">LG-05-09-0050-09</a>). The Boston TV News Digital Library, an expansion of the Ten O'Clock News project, was funded by the <a href="http://www.clir.org">Council on Library and Information Resources (CLIR)</a> and IMLS. Credits for the Boston TV News Digital Library project can be found at <a href="https://bostonlocaltv.org/blog/credits">bostonlocaltv.org</a>. 
            </p>
            <p className='static-section'>
              All content on this site is the intellectual property of the WGBH Educational Foundation, which is solely responsible for this work.
            </p>
            <div className="small-text spaced static-credits">
              <div className="purple bold spaced">GBH Archives</div>
              <div className="black">Andrea McCarty, Project Archivist</div>
              <div className="black">Mary Ide, Project Supervisor</div>
              <div className="black">Scott Turner, Preservation Supervisor</div>
              <div className="black">Thom Shepard, Database Developer</div>
              <div className="black">Beth Willis, Project Intern (Simmons Graduate School of Library & Information Science)</div>
              <div className="black">Julie Ecker, Rights clearance</div>

              <div className="purple bold spaced">GBH Interactive</div>
              <div className="black">Caitlin O’Neil, Producer</div>
              <div className="black">Tyler Howe, Designer</div>
              <div className="black">Molly Frey, Developer</div>
              <div className="black">Tim Halle, Video guru</div>
              <div className="black">Jon Alper, Director of Technology, GBH Media Access Group</div>

              <div className="purple bold spaced">Descriptive Video Service</div>
              <div className="black">Ira Miller</div>
              <div className="black">Francis Mahoney</div>
              <div className="black">Sheilarae Lau</div>

              <div className="purple bold spaced">The Caption Center</div>
              <div className="black">Andrew Bowers</div>
              <div className="black">Eileen Carney</div>
              <div className="black">Nathan Gray</div>
              <div className="black">Cauley Greene</div>
              <div className="black">Trish Lawless</div>
              <div className="black">Carl Richardson</div>
              <div className="black">Charlie Schweim</div>
              <div className="black">Leslie Spears</div>
              <div className="black">Ann Stimson</div>
              <div className="black">Barbara VanScoyoc</div>

              <div className="purple bold spaced">Special thanks to:</div>
              <div className="black">Jordan Berson</div>
              <div className="black">Chuck Costa</div>
              <div className="black">Jim Deering</div>
              <div className="black">Jay Fialkov</div>
              <div className="black">Brad Hawes</div>
              <div className="black">Glenn Heath</div>
              <div className="black">Cecelia Kelly</div>
              <div className="black">Keith Luf</div>
              <div className="black">Lauren Marano</div>
              <div className="black">Doug Martin</div>
              <div className="black">Hollis MacArthur</div>
              <div className="black">Jim McKenna</div>
              <div className="black">Christopher McNeice</div>
              <div className="black">Emily Novak</div>
              <div className="black">Jane Pikor</div>
              <div className="black">Jonathan Pipe</div>
              <div className="black">Leah Weisse</div>
              <div className="black">GBH Production Services</div>
              <div className="black">GBH Media Access Group</div>
            </div>    

          </div>
        </div>
      </div>
    </div>
  )
}

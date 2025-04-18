import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'

export const meta = () => {
  return [
    {
      title: `Credits | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Funders and credits for the GBH Open Vault project.`,
    },
    ...Meta,
  ]
}

export default function Credits() {
  let titleBar = renderPageTitleBar(
    'Funders & Credits',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/2mobile3.jpg'
  )
  return (
    <div>
      <div className="page-container">
        {titleBar}

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h2>Digital Infrastructure Project</h2>

            <div className="med-textline">
              The Digital Infrastructure Project has been made possible in part
              by a major grant from the National Endowment for the Humanities:
              Democracy demands wisdom. The National Endowment for the
              Humanities (NEH) issued a challenge grant to GBH Media Library and
              Archives in 2018 in support of the Digital Infrastructure Project
              to preserve and digitize the most at-risk items in the GBH
              archival collection, specifically 83,000 media resources. This
              effort will preserve the archive we have built and ensure that
              future media assets are properly preserved as they are created.
            </div>

            <div className="med-heading">Open Vault 2024 Redesign Project</div>
            <div>
              <div className="purple bold spaced">GBH Archives</div>
              <div className="black">Peter Higgins, Archives Manager</div>
              <div className="black">Erica Titkemeyer, Archives Systems and Technology Manager</div>
              <div className="black">Andrew Meyers, Senior Software Developer</div>
              <div className="black">Henry Neels, Senior Software Developer</div>
              <div className="black">Ryan Harbert, Senior Software Developer</div>
            </div>

            <div>
              <div className="purple bold spaced">GBH Creative</div>
              <div className="black">Allison Picard, Senior Designer</div>
              <div className="black">Matt Welch, Associate Creative Director of Graphic Design</div>
            </div>

            <div>
              <div className="purple bold spaced">Special Thanks To</div>
              <div className="black">Karen Cariani, Executive Director, Media Library and Archives</div>
              <div className="black">Sammy Driscoll, Archives Shutdown Project Manager</div>
              <div className="black">Lauren Jefferson, Archivist</div>
            </div>

            <div className="med-heading martop">
              Major funding for the Digital Infrastructure Project is provided
              by:
            </div>
            <div className="med-textline">
              Linda and Andrew Egendorf | Barbara and Amos Hostetter | Charles
              and Lucille King Family Foundation Inc. | Lia and William Poorvu |
              Ruettgers Family Charitable Foundation
            </div>

            <div className="med-heading">
              Additional funding for the Digital Infrastructure Project is
              provided by:
            </div>
            <div className="med-textline">
              Steve Duckworth | Richard Ferrante | Fliesbach Family Foundation |
              Gandrud Foundation | Ann and Graham Gund | Rosemarie Torres
              Johnson | Sara Lawrence-Lightfoot | Brian A. McCarthy Foundation |
              Slocumb and E. Lee Perry | Myrna Putziger | Henry M. Rines |
              Candis J. Stern Foundation
            </div>

            <h2>Creating Open Vault</h2>

            <div className="static-halfbox small-text">
              <div className="med-textline">
                The initial creation of Open Vault was made possible in part by
                the <b>Institute of Museum and Library Services (IMLS)</b> (IMLS
                Grant Log Number LG-05-05-0220-05). IMLS further funded the
                development of Open Vault in 2008 by supporting the Vietnam
                Collection. The views, findings, conclusions or recommendations
                expressed in this website do not necessarily represent those of
                the Institute of Museum and Library Services. IMLS further
                funded the development of Open Vault in 2008 by supporting the
                Vietnam Collection.
              </div>
            </div>
            <div className="static-halfbox small-text spaced org-logos">
              <img src="/imls.jpg" />
            </div>

            <div className="static-halfbox small-text">
              <div className="med-textline">
                The prototype website was funded in part by <b>The John D. and Catherine T. MacArthur Foundation</b>.
              </div>
            </div>
            <div className="static-halfbox small-text spaced org-logos">
              <img src="/macfound.jpg" />
            </div>

            <div className="static-halfbox small-text">
              <div className="med-textline">
                The <b>Andrew W. Mellon Foundation</b> supported the further
                development of Open Vault through the Digital Library
                Initiative, funding the addition of new functionality and
                features such as a catalog, scholar exhibits, and digitization
                on demand. This site brings together materials from three
                previous web sites: New Television Workshop, Say Brother, Ten
                O’Clock News
              </div>
            </div>
            <div className="static-halfbox small-text spaced org-logos">
              <img src="/mellon.png" />
            </div>

            <div>
              <h2>Additional Project Credits</h2>
              <div>
                <ul style={{listStyle: "none"}}>
                  <li><a href="/credits/openvault">Open Vault</a></li>
                  <li><a href="/credits/research">Digital Library Initiative</a></li>
                  <li><a href="/credits/vietnam">Open Vault Vietnam</a></li>
                  <li><a href="/credits/ten-oclock-news">Ten O’Clock News</a></li>
                  <li><a href="/credits/say-brother">Say Brother</a></li>
                  <li><a href="/credits/new-television-workshop">New Television Workshop</a></li>
                  <li><a href="/credits/war-and-peace-in-the-nuclear-age">War and Peace in the Nuclear Age</a></li>
                  <li><a href="/credits/the-advocates">The Advocates</a></li>

                  <li><a href="/credits/march-on-washington">March on Washington</a></li>
                  <li><a href="/credits/rock-and-roll">Rock and Roll</a></li>
                </ul>
              </div>


            </div>




          </div>
        </div>
      </div>
    </div>
  )
}

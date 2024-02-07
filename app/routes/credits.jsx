import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

export default function Credits() {
  let titleBar = renderPageTitleBar("Funders & Credits", "https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg")

  return (
    <div>
      <div className="page-container">
        { titleBar }

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">

            <h2>Digital Infrastructure Project</h2>

            <div className="med-textline">
              The Digital Infrastructure Project has been made possible in part by a major grant from the National Endowment for the Humanities: Democracy demands wisdom. The National Endowment for the Humanities (NEH) issued a challenge grant to GBH Media Library and Archives in 2018 in support of the Digital Infrastructure Project to preserve and digitize the most at-risk items in the GBH archival collection, specifically 83,000 media resources. This effort will preserve the archive we have built and ensure that future media assets are properly preserved as they are created.
            </div>

            <div className="med-heading">Major funding for the Digital Infrastructure Project is provided by:</div>
            <div className="med-textline">
              Linda and Andrew Egendorf | Barbara and Amos Hostetter | Charles and Lucille King Family Foundation Inc. | Lia and William Poorvu | Ruettgers Family Charitable Foundation
            </div>

            <div className="med-heading">Additional funding for the Digital Infrastructure Project is provided by:</div>
            <div className="med-textline">
              Steve Duckworth | Richard Ferrante | Fliesbach Family Foundation | Gandrud Foundation | Ann and Graham Gund | Rosemarie Torres Johnson | Sara Lawrence-Lightfoot | Brian A. McCarthy Foundation | Slocumb and E. Lee Perry | Myrna Putziger | Henry M. Rines | Candis J. Stern Foundation
            </div>
            
            <h2>Creating Open Vault</h2>
            
            <div className="static-halfbox small-text">
              <div className="med-textline">
                The initial creation of Open Vault was made possible in part by the <b>Institute of Museum and Library Services (IMLS)</b> (IMLS Grant Log Number LG-05-05-0220-05). IMLS further funded the development of Open Vault in 2008 by supporting the Vietnam Collection. The views, findings, conclusions or recommendations expressed in this website do not necessarily represent those of the Institute of Museum and Library Services. IMLS further funded the development of Open Vault in 2008 by supporting the Vietnam Collection. 

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
                The <b>Andrew W. Mellon Foundation</b> supported the further development of Open Vault through the Digital Library Initiative, funding the addition of new functionality and features such as a catalog, scholar exhibits, and digitization on demand. This site brings together materials from three previous web sites: New Television Workshop, Say Brother, Ten O’Clock News
              </div>
            </div>
            <div className="static-halfbox small-text spaced org-logos">
              <img src="/mellon.png" />
            </div>

            <h2>Open Vault Credits</h2>

            <div className="static-halfbox small-text spaced static-credits"> 
              <div>
                <div className="gray spaced">Project Management</div>
                <div className="black">Karen Cariani, Project Director</div>
                <div className="black">Karen Colbron, Project Manager</div>
              </div>
              
              <div>
                <div className="gray spaced">Business Manager</div>
                <div className="black">Paul Plutnicki</div>
              </div>

              <div>
                <div className="gray spaced">Content Production</div>
                <div className="black">Helen Brady, Production Assistant</div>
                <div className="black">Susan Levene, Content Producer</div>
              </div>

              <div>
                <div className="gray spaced">GBH Legal</div>
                <div className="black">Nike Okediji</div>
                <div className="black">Susan Rosen</div>
                <div className="black">Doug Ryan</div>
              </div>

              <div>
                <div className="gray spaced">Copyeditor</div>
                <div className="black">Eleanor Beram</div>
              </div>

            </div>
            <div className="static-halfbox small-text spaced static-credits">
              <div>
                <div className="gray spaced">With thanks to</div>
                <div className="black">Steve Baldwin, National Boston Ned Biddle, National Boston Kevin Carter, technical advisor, GBH Nancy Dillon, library manager, GBH Dale Freeman, assistant archivist, Archives and Special Collections Department, Healey Library, University of Massachusetts at Boston</div>
              </div>

              <div>
                <div className="gray spaced">Special thanks to our friends and colleagues in Archives:</div>
                <div className="black">Jordan Berson, Mary Ide, Keith Luf, Jonathan Pipe, Leah Weisse</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

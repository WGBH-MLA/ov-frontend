import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "../classes/pageHelpers"



export default function VisitUs() {
  let titleBar = renderPageTitleBar("Visit Us", "https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg", "Members of the general public are welcome to access the GBH Archives' collections in the GBH offices in Brighton, MA.")

  return (
    <div>
      <div className="page-container">
        { titleBar }

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h2>Visiting the Archives</h2>

            <p className="static-section">
              Members of the general public are welcome to access the GBH Archives' processed collections in the GBH offices in Brighton, Massachusetts. Users who visit the MLA must agree to abide by MLA's policies. Materials can only be accessed on-site and cannot be borrowed or taken from the GBH offices. The MLA is open Monday through Friday from 10:00am to 4:00pm ET. Before contacting us to schedule your visit, please review the information below. Before your visit, researchers should contact MLA with a specific research request. In some cases, we may first request to schedule an interview to determine which materials you will need to access. Researchers are asked to plan their visit well in advance so that some reference services can be conducted prior to arrival, such as retrieving boxes and tapes. Researchers must contact MLA a minimum of two weeks in advance of their intended visit.
            </p>

            <hr className="spaced-hr" />

            <div className="static-halfbox purple bold">
              <img src="https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg" />
            </div>
            <div className="static-halfbox purple bold">
              Please contact GBH Archives at archive_requests@wgbh.org and state the nature of your research interest and your academic or professional affiliation.
            </div>

            <h2>Guidelines</h2>

            <p className="static-section">
              Individuals are only permitted to access fully processed parts of the GBH archival collections. User requests for restricted materials will be discussed with GBH's Legal Department to determine if the request can be honored. Researchers must abide by GBH Archives' rules governing the physical handling of archival materials such as: 
            </p>

            <ul>
              <li>using only pencil in the research area</li>
              <li>not using any screening or recording devices</li>
              <li>leaving coats, bags, and briefcases outside of the room where they will be researching</li>
              <li>agreeing to let MLA staff do all photocopying of archival papers</li>
              <li>permitting an inspection of notes to ensure documents are not leaving the Archives</li>
            </ul>

            <p className="static-section">
              Permitted photocopying of materials for scholarly use will be granted in accordance with the Fair Use provisions of the Copyright Act.
            </p>

            <p className="static-section">
                Users cannot quote or publish materials from GBH archival collections without first obtaining the written permission of GBH Educational Foundation. Users must submit a copy of all portions of their intended final work with their request for permission. Researchers must agree to credit GBH Archives in any work which references, incorporates, or quotes MLA's materials and must provide GBH Archives with one copy of the finished work free of charge (such as a book, paper, thesis, article, or film). Permission to quote or publish archival materials is granted on a case-by-case basis and will require a written license agreement. User visits to GBH Archives will be scheduled according to the time sensitivity of a researcher's project.
            </p>

            <h2>Fees</h2>
            <p className="static-section">
              Researchers should keep in mind the following fees associated with using archival materials at GBH.
            </p>

            <ul>
              <li>
                <b>Duplication</b>: If any requested material requires reformatting, the researcher shall be responsible for transfer costs and the newly formatted version will remain at the GBH Archives. The GBH Archives will not provide a personal copy of the work for the researcher. Please be aware that due to legal restrictions and copyright issues, the GBH Archives is unable to provide researchers or the general public with personal copies of materials.
              </li>
              <li>
                <b>Photocopying</b>: GBH Archives charges $0.25 per photocopy for a standard 8.5″ x 11″ page. If a researcher requires larger copies, or needs between 30 and 50 pages, a special fee may be arranged on-site at the Archives’ discretion.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Link, useLoaderData } from "remix"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

export default function SupportUs() {
  let titleBar = renderPageTitleBar("Support Us", "https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg", "Help us preserve and provide access to GBH's historic collection of programs for years to come!")

  return (
    <div>
      <div className="page-container">
        { titleBar }

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">

            <div className="purple blockquote-text bold">
              "GBH has created an unparalleled public media archive with over 350,000 master-level materials on various formats including videotape, film and audiotape. These materials, many vulnerable to complete deterioration, must be preserved and digitized so that they can be available for future generations. We are literally in a race against time.""
            </div>
            <div className="small-text purple spaced">— Karen Cariani, David O. Ives Executive Director, GBH Archives</div>

            <h2>NEH Challenge</h2>

            <p>
              In 2018, GBH received a $750,000 challenge grant from the National Endowment for the Humanities (NEH) to preserve and digitize the most at-risk items in the GBH archival collection, specifically 83,000 media resources. This effort will preserve the archive we have built and ensure that future media assets are properly preserved as they are created. The grant calls for a 4:1 match, or $3 million in matching dollars over the next four years.
            </p>

            <div className="med-textline">
              A gift in support of Open Vault, leveraged by the NEH Challenge grant currently underway, directly enables us to:
            </div>

            <div class="med-textline">Digitize critical programs that are currently deteriorating on obsolete formats</div>
            <div class="med-textline">Add newly digitized content to Open Vault</div>
            <div class="med-textline">Improve our website with new features and improve functionality and discoverability of the collection</div>
            <div class="med-textline">Sustain Open Vault technical infrastructure so that we can continue to provide online access to the collection</div>

            <a className="static-link blockquote-text bold">Read the entire case for support here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

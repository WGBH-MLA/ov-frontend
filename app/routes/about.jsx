import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "../classes/pageHelpers"

export default function About() {
  let titleBar = renderPageTitleBar("About Open Vault", "https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg", "Open Vault provides online access to unique and historically important content produced by GBH.")

  return (
    <div>
      <div className="page-container">
        { titleBar }

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h2>Welcome to Open Vault!</h2>

            <p className="static-section">
              On this website, GBH Archives provides online access to unique and historically important content produced by the public television and radio station GBH. Open Vault contains video, audio, images, searchable transcripts, and resource management tools, all of which are available for individual and classroom learning.
            </p>
            <p className="static-section">
              As America's preeminent public broadcasting producer, the source of fully one-third of PBS' prime-time lineup, GBH has been on the front lines of history for nearly seven decades. GBH productions - from local radio and television to nationally distributed programming - have documented our collective cultural heritage in moving images and sound. In 1979, GBH became the first public broadcasting station to develop an archive, staffed by professional archivists. For more than 35 years, MLA staff have preserved, cataloged, and provided access to materials produced by GBH. We currently manage and preserve nearly 1 million audio, video, film, and digital assets dating back to 1947.
            </p>
            <p className="static-section">
              Open Vault contains video, audio, images, searchable transcripts, and resource management tools, all of which are available for individual and classroom learning. As America's preeminent public broadcasting producer, the source of fully one-third of PBS' prime-time lineup, GBH has been on the front lines of history for nearly seven decades. GBH productions - from local radio and television to nationally distributed programming - have documented our collective cultural heritage in moving images and sound. In 1979, GBH became the first public broadcasting station to develop an archive, staffed by professional archivists. For more than 35 years, MLA staff have preserved, cataloged, and provided access to materials produced by GBH. We currently manage and preserve nearly 1 million audio, video, film, and digital assets dating back to 1947.
            </p>

            <hr className="spaced-hr" />

            <a className="static-link">American Archive of Public Broadcasting</a>


            <p className="static-section">
              <img className="half-image right" src="/aapb.png" />

              In 2013, the Corporation for Public Broadcasting selected GBH and the Library of Congress as the permanent stewards of the American Archive of Public Broadcasting, an initiative seeking to identify, preserve and make accessible significant historical content created by public media, and to preserve at-risk public media before its content is lost to posterity. Approximately 40,000 hours of content comprising 68,000 programs, contributed by 100 stations across the country, have been digitized. We provide access to nearly 12,000 of these programs, which are available online at americanarchive.org.
            </p>

            <hr className="spaced-hr" />

            <a className="static-link">GBH Stock Sales</a>
            <p className="static-section">
              For professional licensing requests, please visit the GBH Stock Sales website or call 617-300-3939.
            </p>

            <hr className="spaced-hr" />

            <a className="static-link">Boston TV News Digital Library</a>
            <p className="static-section">
              <img className="half-image left" src="/tocn.png" />

              You can explore more of GBH's collection in the Boston TV News Digital Library. During this CLIR and IMLS-funded project, we worked with the Boston Public Library, Cambridge Community Television, and Northeast Historic Film to digitize and bring to life local news stories produced in and about Boston from 1960 to 2000. Nearly 2,000 news programs are available online at BostonLocalTV.org.

            </p>

            <p className="static-section">
              The entire GBH collection and AAPB are available for research on location at GBH. Contact us to schedule a research visit in our Brighton, MA offices.
            </p>

            <h2>Current Initiatives</h2>

            <p className="static-section">
              In 2018, GBH received a $750,000 challenge grant from the National Endowment for the Humanities (NEH) to preserve and digitize the most at-risk items in the GBH archival collection, specifically 83,000 media resources. This effort will preserve the archive we have built and ensure that future media assets are properly preserved as they are created. The grant calls for a 4:1 match, or $3 million in matching dollars over the next four years.
            </p>

            <p className="static-section">
              A gift in support of Open Vault, leveraged by the NEH Challenge grant currently underway, directly enables us to:
            </p>

            <ul>
              <li>Digitize critical programs that are currently deteriorating on obsolete formats</li>
              <li>Add newly digitized content to Open Vault</li>
              <li>Improve our website with new features and improve functionality and discoverability of the collection </li>
              <li>Sustain Open Vault technical infrastructure so that we can continue to provide online access to the collection</li>
            </ul>

            <h2>Mailing Address</h2>
            <p className="static-section">
              Open Vault<br /> GBH Archives<br /> WGBH Educational Foundation<br /> One Guest Street<br /> Boston, MA 02135
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

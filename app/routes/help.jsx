import { Link, useLoaderData } from "@remix-run/react"
import { renderAuthorBubble, renderPageLink, renderPageLinks, renderSidebar, renderSidebarSection, renderPageTitleBar } from "~/classes/pageHelpers"

export default function Credits() {
  let titleBar = renderPageTitleBar("Funders & Credits", "https://s3.amazonaws.com/openvault.wgbh.org/carousel/press-and-the-people-q-80.jpg", "Open Vault provides online access to unique and historically important content produced by GBH.")

  return (
    <div>
      <div className="page-container">
        { titleBar }

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h3>I can’t get one of the video or audio records to play. What should I do?</h3>
            <p>Please make sure your web browser is as new as or newer than Internet Explorer 7.0, Mozilla Firefox 3.0, or Safari 3.0. If the record still will not play, please contact us.</p>

            <h3>I have found a factual error in one of the records. Who should I contact?</h3>
            <p>Contact us here.</p>

            <h3>Can I buy copies of the programs on Open Vault?</h3>
            <p>Most programs are no longer available for distribution. Please refer to www.shoppbs.org for the latest catalog of programs available for distribution.</p>

            <h3>Can I buy copies of source materials (interviews, news footage, b-roll, etc)?</h3>
            <p>For professional licensing requests, please contact GBH Stock Sales at 617-300-3939 or stock_sales@wgbh.org.</p>

            <h3>How can I arrange to visit the GBH Archives?</h3>
            <p>Individuals wishing to visit the Archives should be engaged in educational research. Please see Visit the Archive for further information.</p>

            <h3>Can you provide me with contact information for any of the people in the clips?</h3>
            <p>WGBH Educational Foundation cannot provide the names, addresses, telephone numbers, or e-mail addresses of individuals, next of kin, estates, or related organizations for people who appeared in GBH programs. To do so would violate GBH’s Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

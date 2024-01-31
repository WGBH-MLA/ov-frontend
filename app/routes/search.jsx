import { Link, useLoaderData } from "remix"
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
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}

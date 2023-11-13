import { Link } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import { getExhibits } from "~/exhibit"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"

export const loader = async () => {
  return await getExhibits()
}

export default function Exhibits() {

  let exhibits = useLoaderData()
  let exhibitLinks = renderPageLinks('exhibits', exhibits.items)

  return (
    <div className="pagelinks-container">
      { exhibitLinks }
    </div>
  )
}

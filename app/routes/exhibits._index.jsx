import { Link, useLoaderData } from '@remix-run/react'
import { getExhibits } from '../fetch'
import { renderPageLinks } from '../classes/pageHelpers'

export const loader = async () => {
  return await getExhibits()
}

export default function Exhibits() {
  let exhibits = useLoaderData()
  let exhibitLinks
  if (exhibits.items) {
    exhibitLinks = renderPageLinks('exhibits', exhibits.items)
  }

  return <div className="pagelinks-container">{exhibitLinks}</div>
}

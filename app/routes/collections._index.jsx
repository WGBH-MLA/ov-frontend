import { Link, useLoaderData } from "@remix-run/react"
import { getCollections } from "../collection"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "../classes/pageHelpers"

export const loader = async () => {
  return await getCollections()
}

export default function Collections() {
  let specs

  // actually get from api
  specs = useLoaderData()

  console.log( 'specky wecky', specs )
  let collectionLinks = renderPageLinks('collections', specs.items)

  return (
    <div className="pagelinks-container">
      { collectionLinks }
    </div>
  );
}
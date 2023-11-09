import { useLoaderData } from "@remix-run/react"
import { getSpecialCollections } from "~/specialCollection"
import { renderAuthorBubble, renderPageLink, renderPageLinks } from "~/classes/pageHelpers"

export const loader = async () => {
  return await getSpecialCollections()
}

export default function SpecialCollections() {
  let specs

  // actually get from api
  specs = useLoaderData()

  console.log( 'specky wecky', specs )
  let specialCollectionLinks = renderPageLinks('specialCollections', specs.items)

  return (
    <div className="pagelinks-container">
      { specialCollectionLinks }
    </div>
  );
}

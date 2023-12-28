import { useLoaderData } from "@remix-run/react"
import { getCollection } from "~/collection"
import { renderCollection } from "~/classes/collectionPresenter"

export const loader = async ( { params } ) => {
  return await getCollection( params.collectionId )
};

export default function Collections() {
  const spec = useLoaderData();
  return renderCollection(spec)
}

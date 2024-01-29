import { useLoaderData } from "@remix-run/react"
import { getCollection } from "~/collection"
import { renderCollection } from "~/classes/collectionPresenter"

export const loader = async ( { params } ) => {
  return await getCollection( params.collectionId )
};

export default function Collections() {
  const spec = useLoaderData();
  
  if(!spec.content){
    return <div className="page-body-container">Collection was not found!</div>
  }

  return renderCollection(spec)
}

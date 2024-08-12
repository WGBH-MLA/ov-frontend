import { useLoaderData } from "@remix-run/react"
import { getExhibit } from "../exhibit"
import { renderExhibit } from "../classes/exhibitPresenter"

export const loader = async ( { params } ) => {
  console.log( 'exx path ', params )
  return await getExhibit( params.exhibitPath )
}

export default function Exhibits() {
  const exhibit = useLoaderData()

  if(!exhibit){
    return <div className="page-body-container">Exhibit was not found!</div>
  }

  return renderExhibit(exhibit)
}

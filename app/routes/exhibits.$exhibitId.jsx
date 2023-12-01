import { useLoaderData } from "@remix-run/react"
import { getExhibit } from "~/exhibit"
import { renderExhibit } from "~/classes/exhibitPresenter"

export const loader = async ( { params } ) => {
  console.log( 'exx id ', params )
  return await getExhibit( params.exhibitId )
}

export default function Exhibits() {
  const exhibit = useLoaderData()
  return renderExhibit(exhibit)
}

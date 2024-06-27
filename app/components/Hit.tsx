import type { Hit as AlgoliaHit } from 'instantsearch.js'
import { Highlight, Snippet } from 'react-instantsearch'

type HitProps = {
  hit: AlgoliaHit<{
    objectID: number
    title: string
  }>
}

const HitLink = props => {
  let hit = props.hit
  let route, label
  switch (true) {
    case 'exhibits_exhibitpage__body_edgengrams' in hit:
      label = 'Scholar Exhibit'
      route = '/exhibits/' + hit.objectID
      break
    case 'ov_collections_collection__introduction_edgengrams' in hit:
      label = 'Special Collection'
      route = '/collections/' + hit.objectID
      break
    default:
  }

  return (
    <>
      <a href={route}>
        <div class="tag">{label}</div>
        <h2>
          <Highlight attribute="title" hit={props.hit} />
        </h2>
      </a>
    </>
  )
}

export const Hit = ({ hit }: HitProps) => {
  return (
    <div>
      <HitLink hit={hit} />
      <Snippet attribute="exhibits_exhibitpage__body_edgengrams" hit={hit} />
      <Snippet
        attribute="ov_collections_collection__introduction_edgengrams"
        hit={hit}
      />
    </div>
  )
}

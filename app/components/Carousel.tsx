import { useInstantSearch } from 'react-instantsearch-core'

export const Carousel = ({ aapb_host }) => {
  const { results } = useInstantSearch()
  console.log('carousel', results)
  return (
    <div className="series-carousel">
      {results.hits.map((hit, index) => (
        <div key={index} className="series-carousel-item">
          <div className="tag">GBH Series</div>

          <a
            href={`${aapb_host}/catalog?f[series_titles][]=${hit.title}&q=+(contributing_organizations: WGBH(MA) OR producing_organizations: WGBH Educational Foundation)&f[access_types][]=all`}
            target="_blank"
          >
            {hit.title}
          </a>
        </div>
      ))}
    </div>
  )
}

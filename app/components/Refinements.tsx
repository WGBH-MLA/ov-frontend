import { CurrentRefinements } from 'react-instantsearch'

export const Refinements = () => (
  <CurrentRefinements
    transformItems={
      // transform refinement Labels
      items =>
        items.map(item => {
          if (item.attribute in ATTRIBUTES) {
            // if this is an attribute we track, transform the label for each refinement
            item.refinements = item.refinements.map(refinement => {
              if (refinement.value in CONTENT_TYPES) {
                // Transform the refinement label
                return {
                  ...refinement,
                  label: CONTENT_TYPES[refinement.value],
                }
              }
              return refinement // return the original refinement if it's not in CONTENT_TYPES
            })
            return { ...item, label: ATTRIBUTES[item.attribute] }
          }
          return item // return the original item if its attribute is not in ATTRIBUTES
        })
    }
  />
)

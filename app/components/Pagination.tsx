import { Pagination, HitsPerPage } from 'react-instantsearch'
import type { Hit } from 'instantsearch.js'

export default () => (
  <Pagination
    translations={{
      firstPageItemText: 'First',
      previousPageItemText: 'Previous',
      nextPageItemText: 'Next',
      lastPageItemText: 'Last',
      // pageItemText: ({ currentPage, nbPages }) =>
      //   `Page ${currentPage}/${nbPages}`,
      firstPageItemAriaLabel: 'Go to first page',
      previousPageItemAriaLabel: 'Go to previous page',
      nextPageItemAriaLabel: 'Go to next page',
      lastPageItemAriaLabel: 'Go to last page',
      pageItemAriaLabel: ({ currentPage, nbPages }) =>
        `Go to page ${currentPage} of ${nbPages}`,
    }}
  />
)

export const PerPage = ({ items }: Hit) => (
  <HitsPerPage
    items={[
      { value: 5, label: '5 per page' },
      { value: 10, label: '10 per page', default: true },
      { value: 20, label: '20 per page' },
      { value: 50, label: '50 per page' },
    ]}
  />
)

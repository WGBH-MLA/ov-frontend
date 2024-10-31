/* Help page for search */
import { SearchLink } from '~/classes/search-utils'
export default () => (
  <>
    <h1>Searching Open Vault</h1>
    <p>
      Open Vault is a search engine for the GBH Media Library and Archives. You
      can search for exhibits, collections, and series from GBH. You can also
      search for records on{' '}
      <a href="https://americanarchive.org/">AmericanArchive.org</a>.
    </p>
    <h2>Search results</h2>
    <p>The search results are divided into tabs:</p>
    <ul>
      <li>
        <strong>Open Vault</strong> - search results from the GBH Media Library
        and Archives
      </li>
      <li>
        <strong>GBH Series</strong> - Program names and series produced by GBH
      </li>
      <li>
        <strong>American Archive</strong> - Search records from over 200 media
        organizations hosted by the American Archive of Public Broadcasting
      </li>
      <li>
        <strong>Settings</strong> - Change settings for the search engine
      </li>
    </ul>
    <h2>Search box</h2>
    <p>
      The search box is where you enter your search query. You can search for
      exhibits, collections, and series from GBH.
    </p>
    <h2>Advanced search</h2>
    <p>You can use advanced search operators to refine your search query.</p>
    <h3>""</h3>
    If you want to search for an exact phrase, you can use double quotes.
    <ul>
      <li>{SearchLink('"Julia Child"')}</li>
    </ul>
    <h3>~</h3>
    Including a tilde <code>~</code> after a word (without a number) will match
    similar words.
    <ul>
      <li>{SearchLink('Vietnam~')} will match "Vietnam" and "Vietnamese"</li>
    </ul>
    A tilde <code>~</code> with a number will match similar words within a
    certain distance. The number is the "fuzzyness" factor.
    <ul>
      <li>{SearchLink('America~0')} will match "America" and "American"</li>
      <li>
        {SearchLink('America~1')} will also include "Americanized" and
        "Americanizing"
      </li>
      <li>
        {SearchLink('America~2')} will include "African American" and even
        unrelated words like "medical"
      </li>
    </ul>
    When searching a phrase with quotes, including a tilde <code>~</code> with a
    number will match phrases separated by that number of words.
    <ul>
      <li>
        {SearchLink('"Vietnam war"~3')} will match "Vietnam war" and "war in
        Vietnam"
      </li>
    </ul>
    <h3>*</h3>
    You can use the asterisk to search for records that contain a term with a
    wildcard.
    <h3>()</h3>
    You can use parentheses to group terms.
    <h3>+</h3>
    You can use the <code>+</code> operator to include records that contain a
    term.
    <h3>AND</h3>, you can use <code>AND</code> to search for records that
    contain multiple terms.
    <h3>OR</h3>
    You can also use <code>OR</code> (or <code>|</code>) to include records that
    match either term.
    <h3>NOT</h3>
    You can use the <code>NOT</code> (or <code>-</code>) operator to exclude
    records that contain a term.
  </>
)

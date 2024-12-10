/* Help page for search */
import { useSearchBox } from 'react-instantsearch'

export const Help = () => {
  const { refine } = useSearchBox()

  const HelpLink = (query: string) => (
    <div
      onClick={() => {
        // setActiveTab(0)
        refine(query)
      }}>
      {query}
    </div>
  )

  return (
    <>
      <p>
        Open Vault is a search engine for the GBH Media Library and Archives.
        You can search for exhibits, collections, and series from GBH. You can
        also search for records on{' '}
        <a href='https://americanarchive.org/' target='_blank'>
          AmericanArchive.org
        </a>
      </p>
      <h2>Search tabs</h2>
      <p>The search results are divided into tabs:</p>
      <ul>
        <li>
          <strong>Open Vault</strong> - search results from the GBH Media
          Library and Archives
        </li>
        <li>
          <strong>GBH Series</strong> - Program names and series produced by GBH
        </li>
        <li>
          <strong>American Archive</strong> - Search records from over 200 media
          organizations hosted by the{' '}
          <a href='https://americanarchive.org/' target='_blank'>
            American Archive of Public Broadcasting
          </a>
        </li>
      </ul>
      <h2>Advanced search</h2>
      <p>You can use advanced search operators to refine your search query.</p>
      <h3>"Exact Phrases"</h3>
      If you want to search for an exact phrase, you can use double quotes.
      <ul>
        <li>{HelpLink('"Julia Child"')}</li>
        <li>{HelpLink('"Louis Lyons"')}</li>
        <li>{HelpLink('"Civil War"')}</li>
      </ul>
      <h3>Similarity~</h3>
      Including a tilde <code>~</code> after a word (without a number) will
      match similar words.
      <ul>
        <li>
          {HelpLink('Archive')} (without a tilde) will match <em>archive</em>,
          and <em>archives</em>
        </li>
        <li>
          {HelpLink('Archive~')} (with a tilde ~) includes <em>archived</em>,{' '}
          <em>archiving</em>, <em>archival</em>, and similarly spelled words
          like <em>architecture</em> and <em>achievement</em>
        </li>
      </ul>
      The "fuzzyness" factor can be adjusted by adding a number after the tilde.
      <ul>
        <li>
          {HelpLink('America~0')} will match <em>America</em> and{' '}
          <em>American</em>
        </li>
        <li>
          {HelpLink('America~1')} will include <em>Americanized</em> and{' '}
          <em>Americanizing</em>
        </li>
        <li>
          {HelpLink('America~2')} will include <em>African American</em> and
          even unrelated words like <em>medical</em>
        </li>
      </ul>
      When searching a phrase with quotes, including a tilde <code>~</code>{' '}
      followed by a number will match phrases separated by that number of words.
      <ul>
        <li>
          {HelpLink('"Vietnam war"~3')} will match <em>Vietnam war</em> and{' '}
          <em>war in Vietnam</em>
        </li>
      </ul>
      <h3>Wildcards*</h3>
      You can use an asterisk <code>*</code> to search for records that contain
      a term with a wildcard.
      <ul>
        <li>
          {HelpLink('tech*')} matches <em>tech</em> and <em>technology</em>
        </li>
        <li>
          {HelpLink('front*')} matches <em>front</em> and <em>Frontline</em>
        </li>
      </ul>
      <h3>Booleans</h3>
      Use <code>+</code>, <code>-</code>, and <code>|</code> operators to
      include or exclude specific terms.
      <h4>
        <code>+</code> (plus)
      </h4>
      Use <code>+</code> to include only records that contain that term.
      <ul>
        <li>
          {HelpLink('+Boston +busing')} matches records that contain both{' '}
          <em>Boston</em> and <em>busing</em>
        </li>
      </ul>
      <h4>
        <code>-</code> (minus)
      </h4>
      Use <code>-</code> to exclude records that contain that term.
      <ul>
        <li>
          {HelpLink('music +-folk')} matches records that contain <em>music</em>{' '}
          and do not contain <em>folk</em>
        </li>
      </ul>
      <h4>
        <code>|</code> (pipe)
      </h4>
      Use <code>|</code> between terms to match either term.
      <ul>
        <li>
          {HelpLink('television | radio')} matches records that contain either{' '}
          <em>television</em> or <em>radio</em>
        </li>
      </ul>
      <h3>Groups ( )</h3>
      Use parentheses to group terms.
      <ul>
        <li>
          {HelpLink('(tech | technology) +Frontline')} matches records that
          contain either <em>tech</em> or <em>technology</em> and includes{' '}
          <em>Frontline</em>
        </li>
        <li>
          {HelpLink('("Julia Child" | "Joyce Chen") +radio')} matches records
          that contain either exact phrase <em>"Julia Child"</em> or{' '}
          <em>"Joyce Chen"</em> and also includes <em>radio</em>
        </li>
      </ul>
    </>
  )
}

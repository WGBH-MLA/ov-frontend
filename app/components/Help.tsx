/* Help page for search */
import { SearchLink } from '~/components/Suggestions'
export default () => (
  <>
    <p>
      Open Vault is a search engine for the GBH Media Library and Archives. You
      can search for exhibits, collections, and series from GBH. You can also
      search for records on{' '}
      <a href='https://americanarchive.org/' target='_blank'>
        AmericanArchive.org
      </a>
    </p>
    <h1>Search tabs</h1>
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
        organizations hosted by the{' '}
        <a href='https://americanarchive.org/' target='_blank'>
          American Archive of Public Broadcasting
        </a>
      </li>
    </ul>
    <h1>Advanced search</h1>
    <p>You can use advanced search operators to refine your search query.</p>
    <h3>Phrases " "</h3>
    If you want to search for an exact phrase, you can use double quotes.
    <ul>
      <li>{SearchLink('"Julia Child"')}</li>
      <li>{SearchLink('"Louis Lyons"')}</li>
      <li>{SearchLink('"Civil War"')}</li>
    </ul>
    <h3>Similarity ~</h3>
    Including a tilde <code>~</code> after a word (without a number) will match
    similar words.
    <ul>
      <li>
        {SearchLink('Archive')} (without a tilde) will match <em>archive</em>,
        and <em>archives</em>
      </li>
      <li>
        {SearchLink('Archive~')} (with a tilde ~) includes <em>archived</em>,{' '}
        <em>archiving</em>, <em>archival</em>, and similarly spelled words like{' '}
        <em>architecture</em> and <em>achievement</em>
      </li>
    </ul>
    The "fuzzyness" factor can be adjusted by adding a number after the tilde.
    <ul>
      <li>
        {SearchLink('America~0')} will match <em>America</em> and{' '}
        <em>American</em>
      </li>
      <li>
        {SearchLink('America~1')} will include <em>Americanized</em> and{' '}
        <em>Americanizing</em>
      </li>
      <li>
        {SearchLink('America~2')} will include <em>African American</em> and
        even unrelated words like <em>medical</em>
      </li>
    </ul>
    When searching a phrase with quotes, including a tilde <code>~</code>{' '}
    followed by a number will match phrases separated by that number of words.
    <ul>
      <li>
        {SearchLink('"Vietnam war"~3')} will match <em>Vietnam war</em> and{' '}
        <em>war in Vietnam</em>
      </li>
    </ul>
    <h3>Wildcard *</h3>
    You can use an asterisk <code>*</code> to search for records that contain a
    term with a wildcard.
    <ul>
      <li>
        {SearchLink('tech*')} matches <em>tech</em> and <em>technology</em>
      </li>
      <li>
        {SearchLink('front*')} matches <em>front</em> and <em>Frontline</em>
      </li>
    </ul>
    <h3>Booleans</h3>
    Use <code>+</code>, <code>-</code>, and <code>|</code> operators to include
    or exclude specific terms.
    <h4>
      <code>+</code> (plus)
    </h4>
    Use <code>+</code> to include only records that contain that term.
    <ul>
      <li>
        {SearchLink('+Boston +busing')} matches records that contain both{' '}
        <em>Boston</em> and <em>busing</em>
      </li>
    </ul>
    <h4>
      <code>-</code> (minus)
    </h4>
    Use <code>-</code> to exclude records that contain that term.
    <ul>
      <li>
        {SearchLink('music +-folk')} matches records that contain <em>music</em>{' '}
        and do not contain <em>folk</em>
      </li>
    </ul>
    <h4>
      <code>|</code> (pipe)
    </h4>
    Use <code>|</code> between terms to match either term.
    <ul>
      <li>
        {SearchLink('television | radio')} matches records that contain either{' '}
        <em>television</em> or <em>radio</em>
      </li>
    </ul>
    <h3>Groups ( )</h3>
    Use parentheses to group terms.
    <ul>
      <li>
        {SearchLink('(tech | technology) +Frontline')} matches records that
        contain either <em>tech</em> or <em>technology</em> and includes{' '}
        <em>Frontline</em>
      </li>
      <li>
        {SearchLink('("Julia Child" | "Joyce Chen") +radio')} matches records
        that contain either exact phrase <em>"Julia Child"</em> or{' '}
        <em>"Joyce Chen"</em> and also includes <em>radio</em>
      </li>
    </ul>
  </>
)

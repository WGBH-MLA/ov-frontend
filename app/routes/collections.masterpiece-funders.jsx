import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'
import { ChevronsLeft } from 'lucide-react'

export const meta = () => {
  return [
    {
      title: `About | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Open Vault provides online access to unique and historically important content produced by GBH.`,
    },
    ...Meta,
  ]
}

export default function MasterpieceFunders() {
  let titleBar = renderPageTitleBar(
    'Learn More About the Funders for the Masterpiece Special Collection',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/discoverywoodsetcameraWide.jpg',
    ''
  )

  return (
    <div className='page-container'>
      {titleBar}

      <div className='page-sidebar'>
        <a className='back-link' href='/collections/masterpiece'>
          <ChevronsLeft />
          Back to Masterpiece Collection
        </a>
      </div>

      <div className='page-body-container'>
        <div className='page-body'>
          <p>
            <a align='right' className='treasury-bio-image-container'>
              <img
                className='half-image right'
                src='https://s3.amazonaws.com/openvault.wgbh.org/treasuries/AndyAndLinda2.jpg'
              />
            </a>
            <em>Masterpiece Theatre</em> began in 1971 as a partnership between GBH and the BBC and other producers. In 2019 Andrew Egendorf generously donated to GBH in honor of his late wife Linda. This gift enabled the Media Library and Archives to digitize episodes of <em>Masterpiece Theatre</em> programs from 1971-1992, Alistair Cooke’s tenure. Materials will be available online when possible and on-site at GBH as materials are digitized.
          </p>

          <h3 id='collection-background'>Collection Background</h3>

          <p>
            The Linda and Andrew Egendorf <em>Masterpiece Theatre</em> Alistair Cooke Collection features programs from the anthology series <em>Masterpiece Theatre</em> presented during Alistair Cooke’s tenure as host (1971-1992). Along with a complete list of those programs with descriptions, the collection will also include Alistair Cooke’s introductions and conclusions for each episode. Additional materials in the collection will be made available online or on-site at GBH as they are digitized.
          </p>

          <p>
            <em>Masterpiece Theatre</em> was the result of a collaboration between GBH in Boston and the BBC and other producers, after GBH President Stanford Calderwood became interested in licensing dramatic programs from the UK for broadcast in the US. <em>Masterpiece Theatre</em> premiered on PBS on January 10, 1971, with Christopher Sarson serving as the series’ first executive producer. From its first broadcast until 1992, <em>Masterpiece Theatre’s</em> host was Alistair Cooke, a British-American broadcaster and journalist. To this day, Alistair Cooke remains the longest-serving of any <em>Masterpiece</em> host.
          </p>

          <p>
            In 2008, the series title was changed to <em>Masterpiece</em> and the series was split into three: <em>Masterpiece Classic</em> mainly encompassing shows set in the years before World War Two, <em>Masterpiece Mystery!</em> featuring detective drama shows, and <em>Masterpiece Contemporary</em> mainly for shows set in the years from World War II to the present. Today <em>Masterpiece</em> is known for its popular programs including <em>Upstairs/Downstairs</em>, <em>Jewel in the Crown</em>, <em>Sherlock</em>, <em>Downton Abbey</em>, and <em>Victoria</em>. <em>Masterpiece Theatre</em> programs have won a number of Emmy and Peabody Awards.
          </p>

          <p>
            Alistair Cooke was a British-born journalist who worked both in the UK and the US who is known for his work interpreting culture and history for audiences on both sides of the Atlantic. Born in 1908, Cooke began working for the BBC in 1932 as a film critic and later worked as a correspondent for NBC, where he notably reported on Edward VIII’s abdication. Cooke moved to the US in 1937 and became naturalized in 1941 and reported on American perceptions and experiences of World War II. In the post-war years he worked as a correspondent for the <em>Manchester Guardian</em> newspaper and as host of CBS’s educational series <em>Omnibus</em>, his television debut. In 1971 Cooke took on the role for which he remains best known in the US, as host of <em>Masterpiece Theatre</em>. Although he accepted the position hesitantly, Cooke stayed on as host for 22 years, from 1971-1992. His role as host of <em>Masterpiece Theatre</em> spawned many parodies, most notably that of “Alistair Cookie” on <em>Sesame Street</em>, played by Cookie Monster. In 1973, Cooke was awarded an honorary knighthood for his work building Anglo-American understanding, and in 1975 Cooke won an Emmy Award for Outstanding Program and Individual Achievement. After his tenure at <em>Masterpiece Theatre</em>, Cooke continued to host his radio show <em>Letter from America</em>, one of the longest-running radio series at 58 years (1946-2004), until his death on March 30, 2004. After his death, the Fulbright Alistair Cooke Award in Journalism was established.
          </p>

          <p>
            <img
              className='treasury-neh-image'
              align='right'
              src='https://s3.amazonaws.com/openvault.wgbh.org/treasuries/NEH-Preferred-Seal820.jpg'
            />
            In 2018, GBH received a $750,000 challenge grant from the National Endowment for the Humanities <a href='https://www.wgbh.org/foundation/press/wgbh-receives-national-endowment-for-the-humanities-grant-to-support-preservation-of-historic-public-broadcasting-materials'>NEH</a> to preserve and digitize the most at-risk items in the GBH archival collection, specifically 83,000 media resources. This effort will preserve the archive we have built and ensure that future media assets are properly preserved as they are created. The grant calls for a 4:1 match, or $3 million in matching dollars over the next four years.
          </p>

          <p>
            In 2019 Andrew Egendorf, in memory of his late wife, Linda Egendorf, gifted to GBH a donation to support the GBH Archives NEH Challenge grant and the creation of the Masterpiece Theatre Alistair Cooke Collection. For the first time, intros by Alistair Cooke will be made available to the public, thanks to this generous gift. Linda, a jewelry designer and sculptor, and Andrew, an attorney and inventor, lived in Lincoln, Massachusetts. Linda was born in 1946 in Maryland and trained as a jewelry designer until she began working exclusively in sculpture around 1996, working mainly with metal, wood, and cloth. Linda’s jewelry work includes pieces made for the JFK Library and Harvard, and her sculpture work includes the sculpture “Aftermath” which was created as a tribute to the victims of the September 11 attacks and which appeared on the cover of the October 2001 issue of Art Calendar magazine. She was the only American woman accepted to the Japanese Toyamura International Sculpture Biennale in 2005. Linda died in 2017. Andrew ("Andy") was born in 1945 and studied at M.I.T., Harvard Business School, and Harvard Law School. While at Harvard, Andy helped form “Nader’s Raiders", volunteer students interested in improving consumer protections. Andy's group of "Raiders" studied the Federal Trade Commission, leading ultimately to the agency’s overhaul. He also was instrumental in establishing Harvard's joint Law-Business program. Andy later was a member of the team which founded the M.I.T. spinoff Symbolics, Inc., the first "dot-com", and he has been granted many internet-related patents.
          </p>
        </div>
      </div>
    </div>
  )
}

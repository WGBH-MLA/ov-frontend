import { renderPageTitleBar } from '../classes/pageHelpers'
import { Meta } from '../classes/meta'

export const meta = () => {
  return [
    {
      title: `Support us | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Help us preserve and provide access to GBH's historic collection of programs for years to come!`,
    },
    ...Meta,
  ]
}

export default function SupportUs() {
  let titleBar = renderPageTitleBar(
    'Support Us',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/BB50th_DSC_0384Wide.jpg',
    "Help us preserve and provide access to GBH's historic collection of programs for years to come!"
  )

  return (
    <div>
      <div className="page-container">
        {titleBar}

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h2>Support Open Vault</h2>

            <div className="purple blockquote-text bold">
              "GBH has created an unparalleled public media archive with over
              350,000 master-level materials on various formats including
              videotape, film and audiotape. These materials, many vulnerable to
              complete deterioration, must be preserved and digitized so that
              they can be available for future generations. We are literally in
              a race against time.""
            </div>
            <div className="small-text purple spaced">
              — Karen Cariani, David O. Ives Executive Director, GBH Archives
            </div>

            <h2>NEH Challenge</h2>

            <p>
              In 2018, GBH received a $750,000 challenge grant from the National
              Endowment for the Humanities (NEH) to preserve and digitize the
              most at-risk items in the GBH archival collection, specifically
              83,000 media resources. This effort will preserve the archive we
              have built and ensure that future media assets are properly
              preserved as they are created. The grant calls for a 4:1 match, or
              $3 million in matching dollars over the next four years.
            </p>

            <div className="med-textline">
              A gift in support of Open Vault, leveraged by the NEH Challenge
              grant currently underway, directly enables us to:
            </div>

            <ul>
              <li>
                Digitize critical programs that are currently deteriorating on
                obsolete formats
              </li>
              <li>Add newly digitized content to Open Vault</li>
              <li>
                Improve our website with new features and improve functionality
                and discoverability of the collection
              </li>
              <li>
                Sustain Open Vault technical infrastructure so that we can
                continue to provide online access to the collection
              </li>
            </ul>

            <div className="static-link blockquote-text bold">
              Read the entire case for support{' '}
              <a href="https://s3.amazonaws.com/openvault.wgbh.org/resources/case_for_support.pdf">
                here.
              </a>
            </div>

            <div className="med-textline">
              If you are interested in supporting Open Vault and the NEH
              challenge currently underway, please contact Tatiana Espinal,
              Major Gifts Officer, at tatiana_espinal@wgbh.org or 617.300.3677.
            </div>

            <div className="med-textline">
              GBH is a 501(c)(3) nonprofit organization. All donations are tax
              deductible to the extent allowable by law.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Meta } from '~/classes/meta'

export const meta = () => {
  return [
    {
      title: `FAQ | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Frequently Asked Questions about GBH Open Vault.`,
    },
    ...Meta,
  ]
}

export default function FAQ() {
  return (
    <div>
      <div className="page-container">
        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <h2>Frequently Asked Questions</h2>
            <div className="med-heading">
              I can't get one of the video or audio records to play. What should
              I do?
            </div>
            <div className="med-textline">
              Please make sure your web browser is updated to the latest
              version. If the record still will not play, please{' '}
              <a href="/contact-us">contact us</a>.
            </div>

            <div className="med-heading">
              I have found a factual error in one of the records. Who should I
              contact?
            </div>
            <div className="med-textline">
              <a href="/contact-us">Contact us here.</a>
            </div>

            <div className="med-heading">
              Can I buy copies of the programs on Open Vault?
            </div>
            <div className="med-textline">
              Most programs are no longer available for distribution. Please
              refer to <a href="https://shop.pbs.org/">shop.pbs.org</a> for the
              latest catalog of programs available for distribution.
            </div>

            <div className="med-heading">
              Can I buy copies of source materials (interviews, news footage,
              b-roll, etc)?
            </div>
            <div className="med-textline">
              For professional licensing requests, please contact GBH Stock
              Sales at 617-300-3939 or{' '}
              <a href="mailto:stock_sales@wgbh.org?subject=Open%20Vault%20licensing">
                stock_sales@wgbh.org
              </a>
              .
            </div>

            <div className="med-heading">
              How can I arrange to visit the GBH Archives?
            </div>
            <div className="med-textline">
              Individuals wishing to visit the Archives should be engaged in
              educational research. Please see <a href="/visit-us">Visit Us</a>{' '}
              for further information.
            </div>

            <div className="med-heading">
              Can you provide me with contact information for any of the people
              in the clips?
            </div>
            <div className="med-textline">
              WGBH Educational Foundation cannot provide the names, addresses,
              telephone numbers, or e-mail addresses of individuals, next of
              kin, estates, or related organizations for people who appeared in
              GBH programs. To do so would violate GBH's Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { renderPageTitleBar } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'

export const meta = () => {
  return [
    {
      title: `Contact Us | GBH Open Vault`,
    },
    {
      name: 'description',
      content: `Contact GBH Open Vault with questions or feedback.`,
    },
    ...Meta,
  ]
}

export default function ContactUs() {
  let titleBar = renderPageTitleBar(
    'Contact Us',
    'https://s3.amazonaws.com/openvault.wgbh.org/carousel/CameraFrogPondearlyWide.jpg'
  )

  return (
    <div>
      <div className="page-container">
        {titleBar}

        <div className="page-sidebar" />

        <div className="page-body-container">
          <div className="page-body">
            <p>
              We would love to hear from you! If you have general questions or comments about the website and collection, want to share information on the stories you find in the collection, or would like to support the archive by sponsoring digitization, you can reach us at <a href="mailto:openvault@wgbh.org">openvault@wgbh.org</a> or by mail.
            </p>

            <h3>Mailing Address:</h3>
            <div>Open Vault</div>
            <div>GBH Archives</div>
            <div>WGBH Educational Foundation</div>
            <div>One Guest St.</div>
            <div>Boston, MA 02135</div>
          </div>
        </div>
      </div>
    </div>
  )
}

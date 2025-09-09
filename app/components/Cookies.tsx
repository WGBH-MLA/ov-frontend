// OneTrust Cookies Consent Notice start for openvault.wgbh.org
import { useLoaderData } from 'react-router'

export default () => {
  const { ENV } = useLoaderData()
  const { COOKIE_CONSENT_ID } = ENV

  if (!COOKIE_CONSENT_ID) return

  return (
    <script
      src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
      data-language='en'
      type='text/javascript'
      data-domain-script={COOKIE_CONSENT_ID}
    />
  )
}

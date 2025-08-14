// OneTrust Cookies Consent Notice start for openvault.wgbh.org

export default () => {
  // function OptanonWrapper() {
  //   if (document.getElementById('onetrust-banner-sdk')) {
  //     // Get the buttons and container

  //     let acceptBtn = document.getElementById('onetrust-accept-btn-handler')
  //     let declineBtn = document.getElementById('onetrust-reject-all-handler')
  //     let cookieSettingsBtn = document.getElementById('onetrust-pc-btn-handler')
  //     let btnContainer = document.getElementById('onetrust-button-group')

  //     // Set button order for banner

  //     btnContainer.append(acceptBtn, declineBtn, cookieSettingsBtn)
  //   }
  // }

  return (
    <>
      {/* <script
        type='text/javascript'
        src='https://cdn.cookielaw.org/consent/0196e87a-6f01-787d-9abc-2f669f41c09e/OtAutoBlock.js'></script> */}

      <script
        src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
        data-language='en'
        type='text/javascript'
        charset='UTF-8'
        data-domain-script='0196e87a-6f01-787d-9abc-2f669f41c09e'></script>
      {/* <script type='text/javascript'>OptanonWrapper()</script> */}
    </>
  )
}

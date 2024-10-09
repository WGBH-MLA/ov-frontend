export function Footer(props){
  return(
    <div className="bottom-bar-container">
      <div className="bottom-bar-row">
        <div className="bottom-bar-column">
          <div className="bottom-bar-logos">
            <img src="/MLA_logo_white.png" />
          </div>
        </div>
        <div className="bottom-bar-column">
          <FooterLink link="/series" text="GBH Series" />
          <FooterLink link="/exhibits" text="Exhibits" />
          <FooterLink link="/collections" text="Collections" />
        </div>
        <div className="bottom-bar-column">
          <FooterLink link="https://gbharchivesopenvault.donorsupport.co/page/general-fundraising" text="Support Us" />
          <FooterLink link="/visit-us" text="Visit Us" />
          <FooterLink link="/faq" text="Help" />
          <FooterLink link="/credits" text="Credits" />
        </div>
        <div className="bottom-bar-column">
          <FooterLink link="/privacy-policy" text="Privacy Policy" />
          <FooterLink link="/terms" text="Terms & Conditions" />
        </div>
      </div>
      <div className="bottom-bar-row">
        <div className="bottom-bar-doublecolumn">
          2021 WGBH Educational Foundation. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export function FooterLink(props){
  return (
    <a className="bottom-bar-link" href={ props.link }>{ props.text }</a>
  )
}

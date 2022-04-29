function Footer(props){
  return(
    <div className="bottom-bar-container">
      <div className="bottom-bar-column">
        <div className="bottom-bar-logos">
          <img src="/MLA_logo_white.png" />
        </div>
      </div>
      <div className="bottom-bar-column">
        <FooterLink link="/" text="Home" />
        <FooterLink link="/exhibits" text="Exhibits" />
      </div>
    </div>
  )
}

function FooterLink(props){
  return (
    <a className="bottom-bar-link" href={ props.link }>{ props.text }</a>
  )
}

module.exports = { Footer, FooterLink }

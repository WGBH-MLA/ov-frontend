function Footer(props){
  return(
    <div className="bottom-bar-container">
      <FooterLink link="/" text="Home" />
      <FooterLink link="/exhibits" text="Exhibits" />
    </div>
  )
}

function FooterLink(props){
  return (
    <a className="bottom-bar-link" href={ props.link }>{ props.text }</a>
  )
}

module.exports = {Footer, FooterLink}

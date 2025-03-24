export function Social(props){
  return(
    <div>
      <a target="_blank" href="https://www.youtube.com/@GBHArchives"><img className="social-icon" src="/yt.png" /></a>
      <a target="_blank" href="https://www.facebook.com/GBHArchives/"><img className="social-icon" src="/fb.png" /></a>
      <a target="_blank" href="https://www.instagram.com/gbharchives/"><img className="social-icon" src="/ig.png" /></a>
      <a target="_blank" href="https://x.com/GBHArchives"><img className="social-icon" src="/tw.png" /></a>
    </div>
  )
}

export function FooterLink(props){
  return (
    <a className="bottom-bar-link" href={ props.link }>{ props.text }</a>
  )
}

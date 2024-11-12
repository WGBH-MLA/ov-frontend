export function NavigationLink(props){
  let classes = "navigation-link"
  if(props.highlight){
    classes += " highlight"
  }
  return(
    <a className={classes} href={ props.href }>
      <div>
        { props.text }
      </div>
    </a>
  )
}

export function NavigationSpacer(){
  return <a className="navigation-spacer" />
}

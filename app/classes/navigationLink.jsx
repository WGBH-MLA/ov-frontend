export function NavigationLink(props){
  return(
    <a className="navigation-link" href={ props.href }>
      <div>
        { props.text }
      </div>
    </a>
  )
}

export function NavigationSpacer(){
  return <a className="navigation-spacer" />
}

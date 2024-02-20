export function DrawerMenu(props) {

  let items
  if(props.items){
    items = props.items.map((item, index) => { return <DrawerItem key={ index} label={ item.label } subLabel={ item.subLabel } url={ item.url } /> })
  }

  let drawerClasses = "drawermenu-container "
  if(props.classes){
    drawerClasses += props.classes
  }

  return(
    <div className={ drawerClasses }>
      <span className="drawermenu-label">
        { props.label }
        <DownChevron />
      </span>

      <div className="drawermenu-items">
        { items }
      </div>
    </div>
  )
}

function DrawerItem(props){
  return(
    <a className="drawer-item" href={ props.url }>
      <h4 className="drawer-title">
        { props.label }
      </h4>
      <div className="drawer-subtitle">
        { props.subLabel }
      </div>
    </a>
  )
}

export const DownChevron = () => <div className="chevron" />

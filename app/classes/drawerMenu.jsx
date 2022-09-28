function DrawerMenu(props) {

  let items
  if(props.items){
    items = props.items.map((item) => { return <DrawerItem label={ item.label } subLabel={ item.subLabel } url={ item.url } /> })
  }

  let drawerClasses = "drawermenu-container"
  if(props.classes){
    drawerClasses += props.classes
  }

  return(
    <div className={ drawerClasses }>
      <span className="drawermenu-label">
        { props.label }
        <div className="drawermenu-toggle"></div>
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
      <div className="drawer-title">
        { props.label }
      </div>
      <div className="drawer-subtitle">
        { props.subLabel }
      </div>
    </a>
  )
}
  
module.exports = DrawerMenu

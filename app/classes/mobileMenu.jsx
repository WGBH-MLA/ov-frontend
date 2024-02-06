export const MenuIcon = (props) => (<div className="menu-icon" {...props}>
  <div></div>
  <div></div>
  <div></div>
    </div>)


export function MobileMenu(){
  return(
    <div id="mobile-menu" onClick={ toggleMobileMenu }>
      Open Vault
      <MenuIcon id="mobile-menu-icon" onClick={toggleMobileMenu} />
    </div>
  )
}

function toggleMobileMenu(e){
  var navBar = document.getElementById("navigation-bar")
  if(navBar.classList.contains("mobile-hidden")){
    navBar.classList.remove("mobile-hidden")
  } else {
    navBar.classList.add("mobile-hidden")
  }
  e.stopPropagation()
}

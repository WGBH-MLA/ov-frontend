export function MobileIcon() {
  return (
    <div id="mobile-menu-icon" onClick={toggleMobileMenu}>
  <div></div>
  <div></div>
  <div></div>
    </div>
  );
}


export function MobileMenu(props){
  return(
    <div id="mobile-menu" onClick={ toggleMobileMenu }>
      Open Vault
      <MobileIcon />
    </div>
  )
}

function toggleMobileMenu(e){
  var navBar = document.getElementById("navigation-bar")
  var mobileMenu = document.getElementById("mobile-menu")
  if(navBar.classList.contains("mobile-hidden")){
    mobileMenu.classList.add("mobile-hidden")
    navBar.classList.remove("hidden")
  } else {
    mobileMenu.classList.remove("mobile-hidden")
    navBar.classList.add("hidden")
  }
}

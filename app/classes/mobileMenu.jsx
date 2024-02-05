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
  if(navBar.classList.contains("mobile-hidden")){
    navBar.classList.remove("mobile-hidden")
  } else {
    navBar.classList.add("mobile-hidden")
  }
  e.stopPropagation()
}

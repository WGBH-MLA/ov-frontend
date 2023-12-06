export function MobileMenu(props){
  return(
    <div id="mobile-menu-icon" onClick={ toggleMobileMenu }>
      Open Vault
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
}

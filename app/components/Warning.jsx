import { CircleX } from 'lucide-react'

export const Warning = (props) => {
  var doFade = !props.visible ? "fade" : ""
  return (
    <div onClick={ props.onClick } className={"warning-container " + doFade} >
      This website is currently being updated. Thank you for your patience as we work to improve your experience!
      <div className="close"><CircleX /></div>
    </div>
  )
}

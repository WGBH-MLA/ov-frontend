import { Component } from "react"
import { Carousel } from "react-responsive-carousel"
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"
import '../styles/carousel.css'

export class OpenCarousel extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    let slides
    if(this.props.slides && this.props.slides.length > 0){
      slides = this.props.slides.map( (slide,i) => {
        return <Slide key={i} url={ `/exhibits/${slide.id}` } image_url={ slide?.hero_image?.full_url } title={ slide.title } />
      })
    }

    return (
      <Carousel animationHandler={ "fade" } dynamicHeight={true} autoPlay={true} infiniteLoop={true} transitionTime={ 1200 }>
        { slides }
      </Carousel>
    )
  }
}

function Slide(props){
  return (
    <a className="carousel-slide" href={ props.url }>
      <div>
        <img src={ props.image_url } />
        <p className="legend">{ props.title }</p>
      </div>
    </a>
  )
}

import { Component } from "react"
import { Carousel } from "react-responsive-carousel"

export class OpenCarousel extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.setState({ov_host: window.ENV.OV_API_URL})
  }

  render(){
    let slides
    if(this.props.slides && this.props.slides.length > 0){
      slides = this.props.slides.map( (slide) => {
        return <Slide url={ `${ this.state.ov_host }/api/v2/${slide.id}` } image_url={ slide?.cover_image?.full_url } title={ slide.title } />
      })
    }

    return (
      <Carousel dynamicHeight={true} infiniteLoop={true} transitionTime={ 4 }>
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

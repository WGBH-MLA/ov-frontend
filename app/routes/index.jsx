import { Link } from "remix"
import { Carousel } from "react-responsive-carousel"

export default function Index() {
  return (
    <div className="carousel-container">
      <Carousel dynamicHeight={true} infiniteLoop={true} >
        <a href="/guitar-thing">
          <div>
            <img src="/carousel/guitar.jpg" />
            <p className="legend">A Guitar</p>
          </div>
        </a>
        <a href="/vietnam-thing">
          <div>
            <img src="/carousel/vietnam.jpg" />
            <p className="legend">Vietnam</p>
          </div>
        </a>
        <a href="/march-thing">
          <div>
            <img src="/carousel/march.jpg" />
            <p className="legend">March</p>
          </div>
        </a>
      </Carousel>

      <h1>Welcome to Openvault</h1>
      <Link className="exhibit-nav-link" to="/exhibits">Exhibits</Link>
    </div>
  );
}

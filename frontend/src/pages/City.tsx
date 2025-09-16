// Components
import HeroBanner from "../components/HeroBanner";
import MiniMap from "../components/MiniMap";
import Comments from "../components/Comments";
import PlaceNName from "../components/PlaceName";
import Description from "../components/Description";

// Images
import img from "../assets/img/parisBridge.jpg"

export default function Cities() {
  return (
    <div className="city">
      <HeroBanner img={img}/>
      <MiniMap />
      <PlaceNName />
      <Comments />
      <Description/>
    </div>
  )
}

// Components
import MiniMap from "../components/MiniMap";
import Comments from "../components/Comments";
import PlaceName from "../components/PlaceName";
import Description from "../components/Description";

export default function Cities() {
  return (
    <div className="city">
      <MiniMap />
      <PlaceName />
      <Comments />
      <Description/>
    </div>
  )
}

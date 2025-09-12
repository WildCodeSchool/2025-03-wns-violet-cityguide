// Import des components
import HeroBanner from "../components/HeroBanner";
import FadingBackground from "../components/FadingBackground";
import MiniMap from "../components/MiniMap";
import Comments from "../components/Comments";
import PlaceNName from "../components/PlaceName";
import Description from "../components/Description";

export default function Cities() {
  return (
    <>
      <HeroBanner />
      <FadingBackground />
      <MiniMap />
      <PlaceNName />
      <Comments />
      <Description/>
    </>
  )
}
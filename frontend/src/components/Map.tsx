// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Zustand
import { useCityStore } from "../zustand/cityStore";

// Fonction pour générer une icône colorée
function createColoredIcon(color: string) {
	return L.divIcon({
		className: "custom-marker",
		html: `
		<div style="
			width: 24px;
			height: 24px;
			background-color: ${color};
			border-radius: 50%;
			border: 3px solid white;
			box-shadow: 0 0 4px rgba(0,0,0,0.5);
		"></div>
	`,
		iconSize: [24, 24],
		iconAnchor: [12, 24],
	});
}

export default function Map() {
	const city = useCityStore((s) => s.currentCity);

	if (!city) return null;

	// const center: [number, number] = [city.cityLat, city.cityLng];
	const center: [number, number] = [43.6048462, 1.4428480];

	// const markerIcon = createColoredIcon(city.style ?? "#ff0000");
	const markerIcon = createColoredIcon("#ff0000");

	return (
		<div className="city__map">
			<MapContainer
				center={center}
				zoom={13}
				className="city__map-container"
				scrollWheelZoom={true}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; OpenStreetMap contributors"
				/>

				<Marker position={center} icon={markerIcon}>
					<Popup className="city__popup">{city.cityName}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

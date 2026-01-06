// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Définir une icône par défaut pour tous les Markers
const DefaultIcon = L.icon({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41],
});

// On assigne cette icône par défaut à tous les Markers
L.Marker.prototype.options.icon = DefaultIcon;

export default function MiniMap() {

	return (
		<>
			<MapContainer
				center={[48.8566, 2.3522]} // Paris
				zoom={13}
				style={{ height: '400px', width: '100%' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; OpenStreetMap contributors"
				/>

				<Marker position={[48.8566, 2.3522]}>
					<Popup>
						Salut ! Je suis un marqueur Leaflet dans React.
					</Popup>
				</Marker>
			</MapContainer>
		</>
	)
}
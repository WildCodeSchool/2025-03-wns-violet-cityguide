// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import persoIcon from '../assets/img/logoimg.svg';

// Définir une icône par défaut pour tous les Markers
const DefaultIcon = L.icon({
    iconRetinaUrl: persoIcon,
    iconUrl: persoIcon,
    // shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

// On assigne cette icône par défaut à tous les Markers
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {

    return (
        <div className="city__map">
            <MapContainer
                center={[48.8566, 2.3522]} // Paris
                zoom={13}
                className="city__map-container"
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={[48.8566, 2.3522]}>
                    <Popup className="city__popup">
                        Salut ! Je suis un marqueur Leaflet dans React.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Types
import type { GetAllCitiesQuery } from "../generated/graphql-types";

// Assets
import persoIcon from "../assets/img/logoimg.svg";

type CityFromQuery = GetAllCitiesQuery["getAllCities"][number];

type MapProps = {
    city: CityFromQuery;
};

// Icône perso
const DefaultIcon = L.icon({
    iconRetinaUrl: persoIcon,
    iconUrl: persoIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Exemple de coordonnées en dur (à remplacer par ton vrai système)
const CITY_COORDS: Record<string, [number, number]> = {
    Paris: [48.8566, 2.3522],
    Lyon: [45.7640, 4.8357],
    Marseille: [43.2965, 5.3698],
};

export default function Map({ city }: MapProps) {
    const defaultCenter: [number, number] = [48.8566, 2.3522];

    const center = CITY_COORDS[city.cityName] ?? defaultCenter;

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

                <Marker position={center}>
                    <Popup className="city__popup">
                        {city.cityName}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
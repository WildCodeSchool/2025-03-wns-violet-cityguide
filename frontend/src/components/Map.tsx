// React
import { useState } from "react";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Zustand
import { useCityStore, useCityAllPoiStore, useCityCategoryStore } from "../zustand/cityStore";

// Types
import type { City, Poi } from "../types/CityType";

// Component
import PoiMarker from "./PoiMarker";

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
    const city = useCityStore((s) => s.currentCity) as City | null;
    const selectedCategoryId = useCityCategoryStore((s) => s.selectedCategoryId);
    const allPois = useCityAllPoiStore((s) => s.pois) as Poi[];
    const filteredPois = useCityCategoryStore((s) => s.poisByCategory) as Poi[];

    // si une catégorie est sélectionnée => on affiche les POIs filtrés
    // sinon => on affiche tous les POIs de la ville
    const pois = selectedCategoryId ? filteredPois : allPois;

    // POI sélectionné pour le panneau de droite
    const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

    const center: [number, number] = city
        ? [city.cityLatitude, city.cityLongitude]
        : [0, 0];

    if (!city) {
        return <div>Aucune ville sélectionnée</div>;
    }

    const markerIcon = createColoredIcon("#ff0000");

    return (
        <>
            <div className="city__map">
                <MapContainer
                    center={center}
                    zoom={13}
                    className="city__map-container"
                    scrollWheelZoom={true}
                    key={city.cityId}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    {/* Marqueur de la ville */}
                    <Marker position={center} icon={markerIcon}>
                        <Popup className="city__popup">{city.cityName}</Popup>
                    </Marker>

                    {/* Marqueur du Poi */}
                    {pois?.map((poi) => (
                        <PoiMarker key={poi.poiId} poi={poi} onSelect={setSelectedPoi} />
                    ))}
                </MapContainer>

            {/* Panneau de droite */}
            <aside
                className={`city__poi-panel ${
                    selectedPoi ? "city__poi-panel--open" : ""
                }`}
            >
                {selectedPoi && (
                    <div className="city__right-panel">
                        <div className="city__right-panel__header">
                            <h2>{selectedPoi.poiName}</h2>
                            <img src={selectedPoi.imageUrl} alt={'image de ' + selectedPoi.poiName} />

                                <button
                                    type="button"
                                    className="city__right-panel__cross"
                                    aria-label="Fermer le menu"
                                    aria-controls="main-nav"
                                    onClick={() => setSelectedPoi(null)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 city__right-panel__cross__icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                        </div>

                        {selectedPoi.poiCategory && (
                            <p className="city__right-panel__category">
                                Catégorie: {selectedPoi.poiCategory.categoryName}
                            </p>
                        )}

                        {selectedPoi.address && (
                            <p className="city__right-panel__address">
                                📍 Adresse: {selectedPoi.address}
                            </p>
                        )}

                        {selectedPoi.poiDescription && (
                            <p className="city__right-panel__description">
                                Description: {selectedPoi.poiDescription}
                            </p>
                        )}

                        {selectedPoi.externalLink && (
                            <p className="city__right-panel__description">
                                Site web: <a href={selectedPoi.externalLink} target="_blank" rel="noreferrer">visiter le site</a>
                            </p>
                        )}

                        <div className="city__right-panel__coords">
                            <small>
                               Coordonnées: Lat : {selectedPoi.poiLatitude} — Lng : {selectedPoi.poiLongitude}
                            </small>
                        </div>
                    </div>
                )}
            </aside>
            </div>
        </>
    );
}

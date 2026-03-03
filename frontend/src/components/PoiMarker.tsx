import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Poi } from "../types/CityType";
import type { LeafletEventHandlerFnMap } from "leaflet";

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

type Props = {
    poi: Poi;
    onSelect: (poi: Poi) => void;
};

export default function PoiMarker({ poi, onSelect }: Props) {
    const markerRef = useRef<L.Marker | null>(null);

    const handlers: LeafletEventHandlerFnMap = {
        click: () => onSelect(poi),

        add: () => {
            const marker = markerRef.current;
            const el = marker?.getElement();
            if (!el) return;

            el.setAttribute("tabindex", "0");
            el.setAttribute("role", "button");
            el.setAttribute("aria-label", poi.poiName);

            const onKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(poi);
                    marker?.openPopup();
                }
            };

            el.addEventListener("keydown", onKeyDown);

            marker?.once("remove", () => {
                el.removeEventListener("keydown", onKeyDown);
            });
        },
    };

    return (
        <Marker
            ref={(m) => {
                markerRef.current = (m as unknown as L.Marker) ?? null;
            }}
            position={[poi.poiLatitude, poi.poiLongitude]}
            icon={createColoredIcon(poi.poiCategory?.style ?? "#666")}
            eventHandlers={handlers}
        >
            <Popup>{poi.poiName}</Popup>
        </Marker>
    );
}
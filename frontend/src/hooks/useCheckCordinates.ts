import { useState } from "react";

export const useCheckCordinates = () => {

	// LES COORDONNEES ! 
		// Ceci sont les state nécessaires à montrer et selectionnée les coordonnées de la ville
		const [mapLatitude, setMapLatitude] = useState(0); //latitude pinnée sur la carte leaflet
		const [isLatitudeValid, setIsLatitudeValid] = useState(true) // la latitude est validée
		const [mapLongitude, setMapLongitude] = useState(0); //longitude pinnée sur la carte leaflet
		const [isLongitudeValid, setIsLongitudeValid] = useState(true); // la longitude est validée
		const [showMap, setShowMap] = useState(false); // affiche ou non la map leaflet pour afficher les coordonées ci-dessus
		const [coordinateFormatError, setCoordinateFormatError] = useState("") // le message d'erreur affiché si les coordonnées entrées ne sont pas valides

		const cordinatesUseState = () => {
			return {
				mapLatitude,
				isLatitudeValid, 
				setIsLatitudeValid,
				mapLongitude, 
				isLongitudeValid, 
				setIsLongitudeValid, 
				showMap, 
				setShowMap, 
				coordinateFormatError,
				setCoordinateFormatError
			}
		}
		// on check les coordonnées input par l'utilisateur
		const checkCoordinateInput = (e: React.ChangeEvent<HTMLInputElement>, setValid: (valid: boolean) => void, type: string) => {
			const coordinate = Number(e.target.value);
	
			if (coordinate) {
				// coordinate a un type renseigné (string) : "latitude" || "longitude"
				// on vérifie ici les latitudes et longitudes
	
				if (type === "latitude") {
					// la latitude ne peut être comprise que entre 90 et -90
					if (coordinate <= 90 && coordinate >= -90) {
						setMapLatitude(coordinate)
						setIsLatitudeValid(true)
						setCoordinateFormatError("")
					} else {
						setIsLatitudeValid(false)
						setCoordinateFormatError('Erreur de format. Veuillez choisir une latitude comprise entre 90 et -90 et une longitude comprise en 180 et -180')
					}
				} else if (type === "longitude") {
					if (coordinate <= 180 && coordinate >= -180) {
						setMapLongitude(coordinate)
						setIsLongitudeValid(true)
						setCoordinateFormatError("")
					} else {
						setIsLongitudeValid(false)
						setCoordinateFormatError('Erreur de format. Veuillez choisir une latitude comprise entre 90 et -90 et une longitude comprise en 180 et -180')
					}
				} else {
					setCoordinateFormatError("Veuillez renseigner une coordonnée.")
					return setValid(false)
				}
				// on lance par la suite une fonction pour afficher la minimap
				showMapHandler()
			}
			return setValid
		}
	
		function showMapHandler() {
			if (!mapLatitude && !mapLongitude) {
				return setShowMap(false)
			} else {
				return setShowMap(true)
			}
		}

		return {
			cordinatesUseState, 
			checkCoordinateInput, 
			showMapHandler
		}
}

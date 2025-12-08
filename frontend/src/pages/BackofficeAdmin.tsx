// style:
import { useState, type FormEvent } from "react"
import "../scss/pages/backoffice.scss"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function BackofficeAdmin() {


	const handleAddCitySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target;
		const formAddCityData = new FormData(form as HTMLFormElement);
		const formJsonAddCity = Object.fromEntries(formAddCityData.entries())
	}


	const [isLatitudeValid, setIsLatitudeValid] = useState(true);
	const [isLongitudeValid, setIsLongitudeValid] = useState(true);
	const [showMap, setShowMap] = useState(false);
	const [mapLatitude, setMapLatitude] = useState(48.8566);
	const [mapLongitude, setMapLongitude] = useState(2.3522);
	const checkCoordinateInput = (e: React.ChangeEvent<HTMLInputElement>, setValid: (valid: boolean) => void, type: string) => {
		const coordinate = e.target.value;
		console.log('checkCoordinate : ', e, type, coordinate)

		if (coordinate === '') setValid(true);

		// 1. Decimal Degrees (DD): 48.8566, -123.3847
		const regexDD = /^-?\d+\.?\d*$/;
		// Examples: 48.8566, -123.3847, 90, -180

		// 2. Degrees Minutes Seconds (DMS): 48°51'29.376"N, 123°23'4.692"W
		const regexDMS = /^\d+°\d+'\d+\.?\d*"[NSEW]$/;
		// Examples: 48°51'29.376"N, 2°20'56.4"E

		// 3. Degrees Decimal Minutes (DDM): 48°51.4896'N, 2°20.94'E
		const regexDDM = /^\d+°\d+\.\d+'[NSEW]$/;
		// Examples: 48°52.5291'S, 123°23.5116'W (your current format)

		// 4. Decimal Degrees with direction: 48.8566 N, 2.3522 E
		const regexDDDirection = /^\d+\.?\d*\s*[NSEW]$/;
		// Examples: 48.8566 N, 2.3522E

		// 5. Full coordinate pairs:
		const regexLatLongPair = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;
		// Examples: 48.8566, 2.3522 or -33.8688, 151.2093
		const match = detectCoordinateFormat(coordinate);
		console.log('match : ', match)

		if (match) {
			const parsed = convertToDecimal(coordinate)
			if (type === "latitude") setMapLatitude(parsed)
			if (type === "longitude") setMapLongitude(parsed)
		}

		showMapHandler();
		return setValid(match);
	}
	
	function detectCoordinateFormat(coordinate: string): 'DD' | 'DMS' | 'DDM' | 'DDDirection' | 'pair' | 'invalid' {
			if (/^-?\d+\.?\d*$/.test(coordinate)) return 'DD';
			if (/^\d+°\d+'\d+\.?\d*"[NSEW]$/.test(coordinate)) return 'DMS';
			if (/^\d+°\d+\.\d+'[NSEW]$/.test(coordinate)) return 'DDM';
			if (/^\d+\.?\d*\s*[NSEW]$/.test(coordinate)) return 'DDDirection';
			if (/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/.test(coordinate)) return 'pair';
			return 'invalid';
	}

	function convertToDecimal(coordinate: string): number {
		const format = detectCoordinateFormat(coordinate);

		switch (format) {
			case 'DD':
				return parseFloat(coordinate);

			case 'DMS': {
				const match = coordinate.match(/^(\d+)°(\d+)'(\d+\.?\d*)"([NSEW])$/);
				if (!match) return 0;
				const [, deg, min, sec, dir] = match;
				let decimal = parseInt(deg) + parseInt(min) / 60 + parseFloat(sec) / 3600;
				if (dir === 'S' || dir === 'W') decimal *= -1;
				return decimal;
			}

			case 'DDM': {
				const match = coordinate.match(/^(\d+)°(\d+\.\d+)'([NSEW])$/);
				if (!match) return 0;
				const [, deg, min, dir] = match;
				let decimal = parseInt(deg) + parseFloat(min) / 60;
				if (dir === 'S' || dir === 'W') decimal *= -1;
				return decimal;
			}

			case 'DDDirection': {
				const match = coordinate.match(/^(\d+\.?\d*)\s*([NSEW])$/);
				if (!match) return 0;
				let decimal = parseFloat(match[1]);
				if (match[2] === 'S' || match[2] === 'W') decimal *= -1;
				return decimal;
			}

			default:
				return 0;
		}
	}
	function showMapHandler() {
		console.log('showMapHander : isLatitudeValid = ', isLatitudeValid, ' isLongitudeValid = ', isLongitudeValid)
		if (isLatitudeValid === true && isLongitudeValid === true) {
			setShowMap(true)
		} else {
			setShowMap(false)
		}

		console.log({
			mapLatitude: mapLatitude,
			mapLongitude: mapLongitude,
		})
		console.log('showMapHander', showMap)
	}

	const coordinateFormatError = "Le format de votre coordonnée n'est pas correcte. Veullez utilisez le format approprié : degrées, décimal et minutes. Soit :  00°00.000' N "


	const [isValidUser, setIsValidUser] = useState(false)
	return (
		<div id="admin">
			<div className="backoffice-banner">
				<h1>Administration</h1>
			</div>
			<section id="admin-ville">
				<h2>Villes</h2>
				<div className="add-city">
					<h3>Ajouter une ville</h3>
					<form onSubmit={handleAddCitySubmit}>
						<label htmlFor="nom-ville">Nom
							<input type="text" name="nom-ville" placeholder="Saint-Remote" required />
						</label>
						<label htmlFor="description-ville">Description
							<input type="text" name="description-ville" placeholder="Une ville de talent..." />
						</label>
						<label htmlFor="description-nom-ville">Image
							<input type="file" name="image-ville" placeholder="Image" /></label>
						<p>Coordonnées</p>
						<div className="add-ville-coordonnees">
							<label htmlFor="description-nom-ville">Latitude
								<input type="text" name="description-ville" placeholder="48°52.5291'S" onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')} required />
								{!isLatitudeValid && <p>{coordinateFormatError}</p>}
							</label>
							<label htmlFor="description-nom-ville">Longitude
								<input type="text" name="description-ville" placeholder="123°23.5116'W" onBlur={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')} required />
								{!isLongitudeValid && <p>{coordinateFormatError}</p>}
							</label>
						</div>
						{showMap &&
							<MapContainer
								center={[mapLatitude, mapLongitude]} // Paris
								zoom={13}
								style={{ height: '300px', width: '100%' }}
							>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution="&copy; OpenStreetMap contributors"
								/>
								<Marker position={[mapLatitude, mapLongitude]}>
									<Popup>
										Salut ! Je suis un marqueur Leaflet dans React.
									</Popup>
								</Marker>
							</MapContainer>
						}
						{/* <input type="submit">Ajouter la ville</input> */}
					</form>
				</div>
				<div className="separator">
					<div className="separator-line"></div>
				</div>
				<div className="admin-cities">
					<h3>Administrer une ville</h3>
					<div className="admin-cities-wrapper">
						<label htmlFor="select-ville">
							<select name="select-ville">
								<option>Saint-Loin-Lez-Allouètes</option>
								<option>Machine Glin-glin</option>
								<option>Lyon</option>
							</select>
						</label>
					</div>
				</div>
			</section>
			<div className="separator"></div>
			<section id="admin-users">
				<h2>Utilisateurs</h2>
			<form>
				<label htmlFor="nom-utilisateur">Nom
					<input type="text" name="nom-utilisateur" placeholder="Jean-Miche" required />
				</label>
					<input type="submit" name="isNameValid" value="Vérifier utilisateur" />
			</form>
			{ !isValidUser && 
			<div>
				<h3>Utilisateur trouvé</h3>
			</div>}
			</section>
		</div>
	)
}
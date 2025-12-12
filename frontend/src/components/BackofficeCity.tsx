import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React, { useState, type FormEvent } from "react"
import useImageVerificationFrontend from '../pages/backofficeHandler/imageVerification';

export default function BackofficeCity() {

	// handle the admin tab + get and set the date
	const [adminTabCities, setAdminTabCities] = useState('createCity')
	const handleAdminTabCities = (tab: string) => {
		setAdminTabCities(tab);
	}

	// to handle coordinateFormatError, see below
	const [mapLatitude, setMapLatitude] = useState(0);
	const [isLatitudeValid, setIsLatitudeValid] = useState(true)
	const [mapLongitude, setMapLongitude] = useState(0);
	const [isLongitudeValid, setIsLongitudeValid] = useState(true);
	const [showMap, setShowMap] = useState(false);
	let coordinateFormatError = ""
	const checkCoordinateInput = (e: React.ChangeEvent<HTMLInputElement>, setValid: (valid: boolean) => void, type: string) => {
		const coordinate = Number(e.target.value);
		console.log('checkCoordinate : ', e, type, coordinate)

		// // 1. Decimal Degrees (DD): 48.8566, -123.3847
		// const regex = type === "latitude"
		// 	? /^-?([0-8]?\d(\.\d+)?|90(\.0+)?)$/
		// 	: /^-?(1[0-7]\d(\.\d+)?|180(\.0+)?|\d{1,2}(\.\d+)?)$/;
		// // Examples: 48.8566, -123.3847, 90, -180
		// const match = coordinate.match(regex)
		console.log('match in check coordinate : ', {
			// regex: regex,
			coordinate: coordinate,
			type: type,
			// try: (coordinate.match(regex)),
			// match: match
		})
		if (coordinate) {
			if (type === "latitude") {
				if (coordinate <= 90 || coordinate >= -90) {
					setMapLatitude(coordinate)
					setIsLatitudeValid(true)
				} else {
					setIsLatitudeValid(false)
					coordinateFormatError('Erreur de format. Veuillez choisir une latitude comprise entre 90 et -90 et une longitute comprise en 180 et -180')
				}
			}
			if (type === "longitude") {
				if (coordinate <= 180 || coordinate >= -180) {
					setIsLongitudeValid(false)
				} else {
					setIsLongitudeValid(false)
				}
			}
			coordinateFormatError = "Veuillez renseigner une coordonnée."
			return setValid(false)
		}

		// if (match) {
		// 	console.log('there is a match in coordinate !')
		// 	if (type === "latitude") {
		// 		setMapLatitude(coordinate)
		// 		setIsLatitudeValid(true)
		// 	}
		// 	if (type === "longitude") {
		// 		setMapLongitude(coordinate)
		// 		setIsLongitudeValid(true)
		// 	}
		// 	setValid(true)
		// 	showMapHandler();
		// } else {
		// 	console.log('regex is false for coordinate')
		// 	setIsLatitudeValid(false)
		// 	setIsLongitudeValid(false)
		// 	setValid(false)
		// 	coordinateFormatError = "Le format de votre coordonnée n'est pas correcte. Veullez utilisez le format approprié : Degrées décimal. Par exemple : Longitude -48.876667 ; latitude : -123.393333 "
		// }
		return setValid
	}

	function showMapHandler() {
		if (mapLatitude !== '' && mapLongitude !== '') {
			setShowMap(true)
		} else {
			setShowMap(false)
		}

		console.log({
			mapLatitude: mapLatitude,
			mapLongitude: mapLongitude,
		})
		console.log('showMapHandler', showMap)
	}


	// to handle adding an image see below
	const { checkFileSignature, verifyImageLoad } = useImageVerificationFrontend()
	const [isImageValid, setImageValid] = useState('unverified');
	const [imageError, setImageError] = useState('');
	const validateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		console.log('in validImage ! file is : ', file)
		setImageError('');
		setImageValid('unverified');


		if (!file) {
			console.log('no file found ')
			setImageError('Erreur lors du chargement du fichier. Veuillez réessayer.');
			setImageValid('false');
		} else {

			const validType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			console.log('file type is : ', file.type)
			if (!validType.includes(file.type) || file === null) {
				console.log('file type is not valid')
				setImageError('Format invalide. Utilisez JPG, JPEG, PNG ou WEBP.')
				setImageValid('false')
				return e.target.value = '';
			}

			const maxSize = 5 * 1024 * 1024 // 5 MB in bytes
			console.log('file size is : ', file.size, ' max size is : ', maxSize)
			if (file.size > maxSize) {
				console.log('file size is not valid')
				setImageError('Image trop volumineuse. Taille Maximum : 5MB.');
				setImageValid('false')
				return e.target.value = '';
			}
			const imageSecurityCheck = async (file: File) => {
				const fileMagicSignatureIsValid = await checkFileSignature(file);
				console.log('in image security check, value of fileMagicSignatureIsValid = ', await checkFileSignature(file))
				const fileVerifiedOnBrowserIsValid = await verifyImageLoad(file);
				console.log('fileverifiedonbrowerisvalid ', fileVerifiedOnBrowserIsValid)
				if (fileMagicSignatureIsValid === true && fileVerifiedOnBrowserIsValid === true) {
					return setImageValid('true')
				} else {
					setImageError('Image invalide. Veuillez fournir une autre image (formats autorisés : png, jpeg, webp, jpg)');
					setImageValid('false')
					return e.target.value = '';
				}
			}
			imageSecurityCheck(file)
		}
	}

	const handleAddCitySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target;
		const formAddCityData = new FormData(form as HTMLFormElement);
		const formJsonAddCity = Object.fromEntries(formAddCityData.entries())
	}

	return (
		<>
			<h2>Villes</h2>
			<h3><div style={{ display: "inline-flex", flexDirection: "row", justifyContent: "flex-start", gap: "2rem", width: "100%" }}><div className={"tabBtn " + (adminTabCities === 'createCity' ? 'active' : '')} onClick={() => handleAdminTabCities('createCity')}>Ajouter une ville</div><div className={"tabBtn " + (adminTabCities === 'admin-city' ? 'active' : '')} onClick={() => handleAdminTabCities('admin-city')}>Administrer une ville</div></div></h3>

			{/* ajouter une ville */}
			{adminTabCities === "createCity" &&
				<div className="input-field section-part">
					<form onSubmit={handleAddCitySubmit}>
						<label htmlFor="cityName">Nom de la ville
							<input type="text" name="cityName" placeholder="Lyon" required />
						</label>
						<label htmlFor="description">Description
							<input type="text" name="description" placeholder="Une ville de talent..." />
						</label>
						<label htmlFor="imageUrl">Image
							<input type="file" name="imageUrl" placeholder="Image" accept="image/jpeg, image/png, image/jpg, image/webp" onChange={validateImage} />
							{isImageValid === 'false' &&
								<div className="img-div"><span className="img-div__error">{imageError}</span></div>
							}
							{isImageValid === 'true' &&
								<div className="img-div">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13 L9 17 L19 7"
											fill="none"
											stroke="#22c55e"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>

									<span className="img-div__valid">Image valide</span></div>}</label>
						<p>Coordonnées</p>
						<div className="add-ville-coordonnees">
							<label htmlFor="cityLatitude">Latitude
								<input type="number" name="cityLatitude" min="-90" max="90" placeholder="-48.876667" onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')} required />
								{isLatitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
							<label htmlFor="cityLongitude">Longitude
								<input type="number" name="cityLongitude" min="-180" max="180" placeholder="-123.393333" onBlur={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')} required />
								{isLongitudeValid === false && <p>{coordinateFormatError}</p>}
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
				</div>}

			{/* administrer une ville */}
			{adminTabCities === "admin-city" &&
				<div className="admin-cities section-part">
					<h3>Administrer une ville</h3>
					<div className="admin-cities-wrapper">
						<label htmlFor="select-ville">Choisissez une ville
							<select name="select-ville">
								<option>Saint-Loin-Lez-Allouètes</option>
								<option>Machine Glin-glin</option>
								<option>Lyon</option>
							</select>
						</label>
					</div>
				</div>}
		</>
	)
}
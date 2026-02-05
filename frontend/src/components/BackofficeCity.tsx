import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import React, { useState, type FormEvent } from "react"
import useImageVerificationAndUpload from '../pages/backofficeHandler/imageVerificationAndUpload';
import { useCityStore } from '../zustand/cityStore';
import { useCreateCityMutation, useGetAllCitiesQuery, useGetOneCityQuery, useUpdateOneCityMutation, type City, type CreateCityMutationOptions, type NewUserInput, type UpdateCityInput } from '../generated/graphql-types';
import City from '../pages/City';
import { GET_ALL_CITIES } from '../graphql/operations';

export default function BackofficeCity() {

	// Les query et mutation graphQL relatives aux villes 
	const { data: allCitiesData, loading: allCitiesLoading, error: allCitiesError } = useGetAllCitiesQuery();
	const [updateCity] = useUpdateOneCityMutation();
	const [createCity] = useCreateCityMutation()

	// les states de selection des onglets : Ajouter une vile ou Administrer une ville
	const [adminTabCities, setAdminTabCities] = useState('createCity')
	const handleAdminTabCities = (tab: string) => {
		setAdminTabCities(tab);
	}

	// LES COORDONNEES ! 
	// Ceci sont les state nécessaires à montrer et selectionnée les coordonnées de la ville
	const [mapLatitude, setMapLatitude] = useState(0); //latitude pinnée sur la carte leaflet
	const [isLatitudeValid, setIsLatitudeValid] = useState(true) // la latitude est validée
	const [mapLongitude, setMapLongitude] = useState(0); //longitude pinnée sur la carte leaflet
	const [isLongitudeValid, setIsLongitudeValid] = useState(true); // la longitude est validée
	const [showMap, setShowMap] = useState(false); // affiche ou non la map leaflet pour afficher les coordonées ci-dessus
	let coordinateFormatError = "" // le message d'erreur affiché si les coordonnées entrées ne sont pas valides

	// on check les coordonnées input par l'utilisateur
	const checkCoordinateInput = (e: React.ChangeEvent<HTMLInputElement>, setValid: (valid: boolean) => void, type: string) => {
		const coordinate = Number(e.target.value);

		if (coordinate) {
			// coordinate a un type renseigné (string) : "latitude" || "longitude"
			// on vérifie ici les latitudes et longitudes

			if (type === "latitude") {
				// la latitude ne peut être comprise que entre 90 et -90
				if (coordinate <= 90 || coordinate >= -90) {
					setMapLatitude(coordinate)
					setIsLatitudeValid(true)
				} else {
					setIsLatitudeValid(false)
					coordinateFormatError = 'Erreur de format. Veuillez choisir une latitude comprise entre 90 et -90 et une longitute comprise en 180 et -180'
				}
			} else if (type === "longitude") {
				if (coordinate <= 180 || coordinate >= -180) {
					setMapLongitude(coordinate)
					setIsLongitudeValid(true)
				} else {
					setIsLongitudeValid(false)
					coordinateFormatError = 'Erreur de format. Veuillez choisir une latitude comprise entre 90 et -90 et une longitute comprise en 180 et -180'
				}
			} else {
				coordinateFormatError = "Veuillez renseigner une coordonnée."
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

	// IMAGES ! 
	const { resetUseState, imageUploadUseState, validateImageFrontEndSide, validateUrl } = useImageVerificationAndUpload() // import de fonctions de vérifications de l'image
	const { isImageValid, displayImage, imgSrc, imageError } = imageUploadUseState(); 

	// vérification de l'image côté front-end
	const validateCityImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		// on réinitialise les states
		resetUseState(); 

		if (!file) {
			throw new Error('Erreur lors du chargement du fichier')
		}
		validateImageFrontEndSide(file)
	}

	// TODO requête trop lourde (toutes les villes au lieu d'une seule pour les modif)

	// CRÉATION D'UNE VILLE
	const handleAddCitySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formAddCityData = new FormData(form);

		try {
			// Map form data to the correct structure KÉCÉCÉKECECOMMENTAIREMOISI ????
			const cityInput = {
				cityName: formAddCityData.get('cityName') as string,
				description: formAddCityData.get('description') as string,
				imageUrl: imgSrc, // Use the validated image URL from state
				cityLatitude: Number(formAddCityData.get('cityLatitude')),
				cityLongitude: Number(formAddCityData.get('cityLongitude'))
			};

			const { data } = await createCity({
				variables: {
						data: cityInput
				},
				refetchQueries: [
					{ query: GET_ALL_CITIES }
				]
			});

			if (!data) throw new Error('Missing data');
			
			alert('Ville créée avec succès !');
			form.reset();
			resetUseState();
			setShowMap(false);

		} catch (error) {
			console.error('Erreur lors de la création de la ville:', error);
			alert('Erreur lors de la création de la ville');
		}
	}

	// MODIFICATION D'UNE VILLE
	// UseState de la ville à modifier
	const [cityToUpdate, setCityToUpdate] = useState<null | City>(null);
	const [currentLatitude, setCurrentLatitude] = useState(0);
	const [currentLongitude, setCurrentLongitude] = useState(0);

	// Fonction appelée lors du choix d'une ville dans le select
	const editCityHandler = (id: string) => {

		// Récupération de la vile à modifier
		const city = allCitiesData?.getAllCities.find(city => city.cityId === Number(id));
		if (!city) return;

		// Stockage de la latitude et de la longitude pré-modification
		setCurrentLatitude(city.cityLatitude);
		setCurrentLongitude(city.cityLongitude);

		// Set de la city à modifier
		setCityToUpdate(city);

		// Si la ville à modifier n'existe pas / n'est pas trouvée, arrêt du traitement
		if (!cityToUpdate) {
			return;
		}
	}

	// GESTION DES CHANGEMENTS
	// Nom
	const handleCityNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!cityToUpdate) return;
		setCityToUpdate({...cityToUpdate, cityName: e.target.value});
	};

	// Description
		const handleCityDescriptionUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!cityToUpdate) return;
		setCityToUpdate({...cityToUpdate, description: e.target.value});
	};

	// Image : traitée par la même fonction que pour la création de ville (validateCityImage)

	// Coordonnées
	const handleCityLatitudeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!cityToUpdate) return;
		setCityToUpdate({...cityToUpdate, cityLatitude: Number(e.target.value)});
	};
	const handleCityLongitudeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!cityToUpdate) return;
		setCityToUpdate({...cityToUpdate, cityLongitude: Number(e.target.value)});
	};

	// CENTRAGE DE LA CARTE SUR LES COORDONNÉES GPS FOURNIES
	function ChangeMapView({ center, zoom }: { center: [number, number], zoom: number }) {
		const map = useMap();
		map.setView(center, zoom);
		return null;
	}

	// ENREGISTREMENT DES NOUVELLES DONNÉES DE LA VILLE
	const updateCityHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {

			const updateCityInput=  { 
				cityName : cityToUpdate?.cityName as string, 
				description: cityToUpdate?.description as string, 
				imageUrl: imgSrc as string || cityToUpdate?.imageUrl as string,
				cityLatitude : cityToUpdate?.cityLatitude as number,
				cityLongitude: cityToUpdate?.cityLongitude as number
			}

			const { data } = await updateCity({
				variables: { 
						data: updateCityInput, 
						cityId: cityToUpdate?.cityId as number 
				},
				refetchQueries: [
					{ query: GET_ALL_CITIES }
				],
				awaitRefetchQueries: true
			})

			if (!data) {
				throw new Error("Missing data")
			} else {
				alert("Ville modifiée avec succès ! ")
			};

		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<h2>Villes</h2>
			<div className='tab__container'>
				<div className={"tab__btn " + (adminTabCities === 'createCity' ? 'active' : '')} onClick={() => handleAdminTabCities('createCity')}>
					<h3>Ajouter une ville</h3>
				</div>
				<div className={"tab__btn " + (adminTabCities === 'updateCity' ? 'active' : '')} onClick={() => handleAdminTabCities('updateCity')}>
					<h3>Administrer une ville</h3>
				</div>
			</div>

			<div className="backoffice-container">

				{/* ajouter une ville */}
				{adminTabCities === "createCity" &&
					<form onSubmit={handleAddCitySubmit}>

						{/* Nom de la ville */}
						<label htmlFor="cityName">Nom de la ville
							<input type="text" name="cityName" placeholder="Lyon" required />
						</label>

						{/* Description */}
						<label htmlFor="description">Description
							<textarea
								name="description" 
								placeholder="Une ville de talent..." 
								className='description-field' 
								minLength={ 10 } 
								maxLength={ 80 } 
							/>
						</label>

						{/* Image */}
						<label htmlFor="imageUrl" className='vertical' >Image
							<div>
								<input
									type="file" 
									name="imageUrl" 
									id="imageUrl-file" 
									placeholder="Image" 
									accept="image/jpeg, image/png, image/jpg, image/webp" 
									onChange={ validateCityImage }
								/>
							</div>
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

									<span className="img-div__valid">Image valide</span>
								</div>}
							{displayImage === true &&
								<img src={imgSrc} style={{ maxHeight: "300px" }} />}
						</label>

						{/* Coordonnées */}
						<p>Coordonnées</p>
						<div className="add-ville-coordonnees">
							<label htmlFor="cityLatitude">Latitude
								<input
									type="number"
									name="cityLatitude"
									min="-90" max="90"
									step="0.000001"
									placeholder="-48.876667"
									onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')}
									required
								/>
								{isLatitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
							<label htmlFor="cityLongitude">Longitude
								<input
									type="number"
									name="cityLongitude"
									min="-180"
									max="180"
									step="0.000001"
									placeholder="-123.393333"
									onChange={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')}
									required
								/>
								{isLongitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
						</div>
						{showMap &&
							<MapContainer
								center={[mapLatitude, mapLongitude]}
								zoom={13}
								style={{ height: '300px', width: '70%', alignSelf: 'center'}}
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

						{/* Bouton de validation de la création de ville */}
						<input type="submit" value="Ajouter la ville"/>
					</form>}

				{/* administrer une ville */}
				{adminTabCities === "updateCity" &&
					<div className="backoffice-container">

						{/* Choix de la ville à éditer */}
						<label htmlFor="select-ville">Choisissez une ville à éditer
							<select name="select-ville" onChange={(e) => editCityHandler(e.target.value)}>
								<option value="">Sélectionnez une ville</option>
								{allCitiesData?.getAllCities.map((city) => (
									<option value={city.cityId} key={city.cityId}>{city.cityName}</option>
								))}
							</select>
						</label>

						{/* Si la ville est trouvée, affichage du formulaire pré-rempli de modification de la ville */}
						{ cityToUpdate?.cityId &&
							<div className='backoffice-container relative'>

								{/* Croix de fermeture du formulaire d'update de ville (haut droite) */}
								<div className="close" onClick={() => { setEditCity(false); setEditCityName('') }}>
									<svg height={15} width={15}>
										<line x1="2" y1="2" x2="10" y2="10" style={{ stroke: "red", strokeWidth: 1 }} />
										<line x1="2" y1="10" x2="10" y2="2" style={{ stroke: "red", strokeWidth: 1 }} />
									</svg>
								</div>

								<form onSubmit={updateCityHandler}>

									{/* Nom de la ville */}
									<label htmlFor='cityName'>Nom de la ville :
										<input 
										type="text"
										value={cityToUpdate?.cityName}
										name='cityName'
										onChange={ handleCityNameUpdate }
									/>
									</label>

									{/* Description*/}
									<label htmlFor='description'>Description de la ville :
										<textarea 
											className='description-field' 
											value={cityToUpdate.description}
											name="description" 
											minLength={ 10 } 
											maxLength={ 80 } 
											onChange={ handleCityDescriptionUpdate }
										/>
									</label>

									{/* Image */}
									<label 
										htmlFor='imageUrl'
										className='vertical'
									>Image actuelle :
										{cityToUpdate.imageUrl !== '' && <img src={cityToUpdate.imageUrl} height="300px" width="500px" />}
										<div>
											<input 
												type="file"
												name="imageUrl"
												placeholder="Image"
												id="image-update-file"
												accept="image/jpeg, image/png, image/jpg, image/webp"

												// Vérification du fichier fourni
												onChange={ validateCityImage }
											/>
										</div>
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
												<p>Nouvelle image :</p>
												<span className="img-div__valid">Image valide</span>
											</div>}
										{displayImage === true &&
											<img src={imgSrc} style={{ maxHeight: "300px" }} />}
									</label>

									{/* Coordonnées */}
									<h5>Coordonnées</h5>
									<div className='latitude-longitude'>
										<p>Latitude actuelle : { currentLatitude }</p>
										<label htmlFor='cityLatitude'>
											Nouvelle latitude : 
											<input
												type="number" 
												value={cityToUpdate.cityLatitude} 
												name="cityLatitude"
												min="-90" 
												max="90"
												step="0.000001"
												onChange={ handleCityLatitudeUpdate }
											/>
										</label>
									</div>
									
									<div className='latitude-longitude'>
										<p>Longitude actuelle : { currentLongitude }</p>
										<label htmlFor='cityLongitude'>
											Nouvelle longitude : 
											<input
												type="number"
												value={cityToUpdate.cityLongitude}
												name="cityLongitude"
												min="-180"
												max="180"
												step="0.000001"
												onChange={ handleCityLongitudeUpdate }
											/>
										</label>
									</div>

									{/* Map */}
									<MapContainer
										center={[cityToUpdate.cityLatitude, cityToUpdate.cityLongitude]}
										zoom={13}
										style={{ height: '300px', width: '70%', alignSelf: 'center' }}
										className='map-update-city'
									>
										<ChangeMapView center={[cityToUpdate.cityLatitude, cityToUpdate.cityLongitude]} zoom={13} />

										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution="&copy; OpenStreetMap contributors"
										/>

										<Marker position={[cityToUpdate.cityLatitude, cityToUpdate.cityLongitude]}></Marker>
									</MapContainer>

									{/* bouton de validation du form */}
									<input type="submit" value="Modifier la ville" />
								</form>
							</div>
						}
				</div>
			}
			</div>
		</>
	)
}
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import React, { use, useEffect, useState, type FormEvent } from "react"
import useImageVerificationAndUpload from '../pages/backofficeHandler/imageVerificationAndUpload';
import { useCityStore } from '../zustand/cityStore';
import { useCreateCityMutation, useGetAllCitiesQuery, useUpdateOneCityMutation, type City, type CreateCityMutationOptions, type NewUserInput, type UpdateCityInput } from '../generated/graphql-types';

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
	const { resetUseState, imageUploadUseState, validateImageFrontEndSide, validateUrl } = useImageVerificationAndUpload() // import de fonctions de vérifications de l'images
	const { isImageValid, displayImage, imgSrc, imageError } = imageUploadUseState(); 

	// vérification de l'image côté front-end
	const validateCityImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		// on réinitialise les states
		resetUseState(); 

		// L'utilisateur a décidé de choisir d'uploader une photo: on efface donc le lien de l'input url
		const imageUrlLink = document.getElementById('imageUrl-link') as HTMLInputElement;
		if (imageUrlLink) {
			imageUrlLink.value = ''
			console.log("URL effacée")
		}

		if (!file) {
			throw new Error('Erreur lors du chargement du fichier')
		}
		validateImageFrontEndSide(file)

	}

	// l'utilisateur a choisit d'envoyer un lien au lieu d'uploader une image
	const validateCityImageUrl = (url: string) => {

		// on réinitialise les states
		resetUseState()

		// on efface le fichier, si un fichier a été fournie avant le lien
		const fileInput = document.getElementById('imageUrl-file') as HTMLInputElement;
		if (fileInput) {
			fileInput.value = '';
		}
		if(!fileInput) {
			const editFileInput = document.getElementById('image-update-file') as HTMLInputElement; 
			editFileInput.value = ""
		}

		validateUrl(url)
	}

	const handleAddCitySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    const form = e.currentTarget;
    const formAddCityData = new FormData(form);
    
    try {
        // Map form data to the correct structure
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
            }
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

	const [editCity, setEditCity] = useState(false);
	const [editCityId, setEditCityId] = useState(0);
	const [editCityName, setEditCityName] = useState('');
	const [editCityDescription, setEditCityDescription] = useState('')
	const [editImageUrl, setEditImageUrl] = useState('');
	const [editCityLatitude, setEditCityLatitude] = useState(0);
	const [editCityLongitude, setEditCityLongitude] = useState(0);
	const [newCityLatitude, setNewCityLatitude] = useState(0);
	const [newCityLongitude, setNewCityLongitude] = useState(0)
	const editCityHandler = (id: string) => {
		const city = allCitiesData?.getAllCities.find(city => city.cityId === Number(id));
		if (!city) {
			console.log("error finding the city")
			return
		};
		setEditCityId(city.cityId)
		setEditCityName(city.cityName);
		setEditCityDescription(city.description);
		setEditImageUrl(city.imageUrl);
		setEditCityLatitude(city.cityLatitude);
		setEditCityLongitude(city.cityLongitude);
		setNewCityLatitude(city.cityLatitude);
		setNewCityLongitude(city.cityLongitude);

		if (editCityName === '') setEditCity(false)
		setEditCity(true)
	}

	// LA DESCRIPTION
	// Permet lors du changement de ville à éditer depuis le select, d'obtenir le texte de la description correspondant à la ville choisie
	const [descriptionUpdate, setDescriptionUpdate] = useState(editCityDescription);

	// Au changement dans le select, on récupère la bonne description
	useEffect(() => {
		setDescriptionUpdate(editCityDescription);
	}, [editCityDescription]);

	// Set des compteurs de caractères
	const [charCountCreate, setCharCountCreate] = useState(0);
	const [charCountUpdate, setCharCountUpdate] = useState(editCityDescription.length);

	// Quand la description change, on récupère la nouvelle description + on compte le nombre de caractères saisis
	const handleDescriptionUpdateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescriptionUpdate(e.target.value);
		setCharCountUpdate(e.target.value.length);
	};

	// Compte des caractères de la description pour une création de ville
	const handleCharCountCreate = (value: string) => {
		setCharCountCreate(value.length);
	};

	// RàZ du compteur de caractères de la description de ville lors de sa création lorsqu'on arrive sur l'onglet création de ville
	useEffect(() => {
		if (adminTabCities === 'createCity') {
			setCharCountCreate(0); // remet le compteur à zéro
		}
	}, [adminTabCities]);

	// Set le compteur de caractères de la description d'une ville pour sa modification au nombre de caractères de la description actuelle
	useEffect(() => {
		setCharCountUpdate(editCityDescription.length);
	}, [editCityDescription.length]);

	// LATITUDE / LONGITUDE ET VUE SUR LA MAP
	const setNewCityLongitudeHandler = (value: number) => {
		setNewCityLongitude(value)
		console.log("this is the value of setNewCityLongitudeHandler : ", value)
	}

	const setNewCityLatitudeHandler = (value: number) => {
		setNewCityLatitude(value)
	}

	function ChangeMapView({ center, zoom }: { center: [number, number], zoom: number }) {
		const map = useMap();
		map.setView(center, zoom);
		return null;
	}

	const updateCityHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// const form = e.currentTarget;
		// const formData = new FormData(form);

		try {

			const updateCityInput=  { 
				cityName : editCityName as string, 
				description: editCityDescription as string, 
				imageUrl: editImageUrl,
				cityLatitude : editCityLatitude,
				cityLongitude: editCityLongitude
			}
			const { data } = await updateCity({
				variables:
					{ data: updateCityInput, cityId: editCityId }

			})
			if (!data) throw new Error("Missing data");

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
				<div className={"tab__btn " + (adminTabCities === 'admin-city' ? 'active' : '')} onClick={() => handleAdminTabCities('admin-city')}>
					<h3>Administrer une ville</h3>
				</div>
			</div>

			<div className="backoffice-container">
				{/* ajouter une ville */}
				{adminTabCities === "createCity" &&
					<form onSubmit={handleAddCitySubmit}>

						<label htmlFor="cityName">Nom de la ville
							<input type="text" name="cityName" placeholder="Lyon" required />
						</label>

						<label htmlFor="description">Description
							<textarea
								name="description" 
								placeholder="Une ville de talent..." 
								className='description-field' 
								minLength={ 10 } 
								maxLength={ 80 } 
								onChange={(e) => handleCharCountCreate(e.target.value)} 
							/>
							<p>{ charCountCreate } / 80</p>
						</label>

						<label htmlFor="imageUrl" className='vertical' >Image
							<div>
								<input type="file" name="imageUrl" id="imageUrl-file" placeholder="Image" accept="image/jpeg, image/png, image/jpg, image/webp" onChange={validateCityImage} />
								<span>or</span>
								<input type="url" name='imageUrl' id="imageUrl-link" placeholder="https://my-image.com" onBlur={(e) => validateCityImageUrl(e.target.value)} />
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
						<p>Coordonnées</p>
						<div className="add-ville-coordonnees">
							<label htmlFor="cityLatitude">Latitude
								<input type="number" name="cityLatitude" min="-90" max="90" placeholder="-48.876667" onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')} required />
								{isLatitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
							<label htmlFor="cityLongitude">Longitude
								<input type="number" name="cityLongitude" min="-180" max="180" placeholder="-123.393333" onChange={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')} required />
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
						<input type="submit" value="Ajouter la ville"/>
					</form>}

				{/* administrer une ville */}
				{adminTabCities === "admin-city" &&
					<div className="backoffice-container">
						<label htmlFor="select-ville">Choisissez une ville à éditer
							<select name="select-ville" onChange={(e) => editCityHandler(e.target.value)}>
								{allCitiesData?.getAllCities.map((city) => (
									<option value={city.cityId} key={city.cityId} defaultValue=''>{city.cityName}</option>
								))}
							</select>
						</label>
						{editCity === true &&
							<div className='backoffice-container relative'>
								<h4>Editer la ville : {editCityName}</h4>
								<div className="close" onClick={() => { setEditCity(false); setEditCityName('') }}>
									<svg height={15} width={15}>
										<line x1="2" y1="2" x2="10" y2="10" style={{ stroke: "red", strokeWidth: 1 }} />
										<line x1="
									2" y1="10" x2="10" y2="2" style={{ stroke: "red", strokeWidth: 1 }} />
									</svg>
								</div>
								<form onSubmit={updateCityHandler}>
									<label htmlFor='cityName'>Nom de la ville :
										<input type="text" defaultValue={editCityName} name='cityName' />
									</label>
									<label htmlFor='description'>Description de la ville
										<textarea 
											className='description-field' 
											value={descriptionUpdate}
											name="description" 
											minLength={ 10 } 
											maxLength={ 80 } 
											// onChange={ (e) => { handleCharCountUpdate(e.target.value) }}
											onChange={handleDescriptionUpdateChange}
										/>
										<p>{ charCountUpdate } / 80</p>
									</label>
									<label htmlFor='imageUrl' className='vertical'>Image de la ville
										{editImageUrl !== '' && <img src={editImageUrl} height="300px" width="500px" />}
										<span>URL de l'image actuelle : {editImageUrl}</span>
										<input type="file" name="imageUrl" placeholder="Image" id="image-update-file" accept="image/jpeg, image/png, image/jpg, image/webp" onChange={validateCityImage} />
										<span>ou</span>
										<input type="url" name="imageUrl" onBlur={(e) => validateCityImageUrl(e.target.value)} />
									</label>
									<h5>Coordonnées</h5>
									<label htmlFor='cityLatitude'>Latitude
										<span>Ancienne valeure : {editCityLatitude}</span>
										<input type="number" defaultValue={editCityLatitude} name="cityLatitude" onChange={(e) => { setNewCityLatitudeHandler(Number(e.target.value)) }} />
									</label>
									<label htmlFor='cityLongitude'>Longitude
										<span>Ancienne valeure : {editCityLongitude}</span>
										<input type="number" defaultValue={editCityLongitude} name="cityLongitude" onChange={(e) => { setNewCityLongitudeHandler(Number(e.target.value)) }} />
									</label>
									<MapContainer
										center={[newCityLatitude, newCityLongitude]}
										zoom={13}
										style={{ height: '300px', width: '100%' }}
									>
										<ChangeMapView center={[newCityLatitude, newCityLongitude]} zoom={13} />
										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution="&copy; OpenStreetMap contributors"
										/>
										<Marker position={[newCityLatitude, newCityLongitude]}>
										</Marker>
									</MapContainer>
									<input type="submit" value="Modifier la ville" />
								</form>
							</div>
						}
					</div>}
			</div>

		</>
	)
}
import { useState, type FormEvent } from "react";
import { useCreatePoiMutation, useDeletePoiMutation, useEditPoiMutation, useGetAllCategoriesQuery, useGetAllCitiesQuery, useGetPoiByIdQuery, useGetPoisByCityQuery } from "../generated/graphql-types";
import "../scss/pages/backoffice.scss";
import useImageVerificationAndUpload from "../hooks/imageVerificationAndUpload";
import { GET_ALL_POIS } from "../graphql/operations";
import { useCheckCordinates } from "../hooks/useCheckCordinates";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function BackofficePoi() {

	// All mutation request and queries
	const { data: cityData } = useGetAllCitiesQuery();
	const { data: allCategoriesData } = useGetAllCategoriesQuery();

	const [createPoi] = useCreatePoiMutation();
	const [updatePoi] = useEditPoiMutation();
	const [deletePoi] = useDeletePoiMutation();

	const {
		cordinatesUseState,
		checkCoordinateInput,
	} = useCheckCordinates()
	const {
		mapLatitude,
		isLatitudeValid,
		mapLongitude,
		isLongitudeValid,
		showMap,
		coordinateFormatError,
		setIsLatitudeValid,
		setIsLongitudeValid,
		setShowMap
	} = cordinatesUseState()


	// Handle the tabs : create a poi or edit/delete a poi
	type IsWhatTab = 'creation-tab' | 'edition-tab'
	const [isCreationPoiTab, setIsCreationPoiTab] = useState<IsWhatTab>('creation-tab')
	const changingTabHandler = (e: string) => {
		if (e === 'edition-tab') return setIsCreationPoiTab('edition-tab');
		return setIsCreationPoiTab('creation-tab')
	}

	// Use the micro-service of image upload to verify and upload the image (frontend and backend)
	const { resetUseState, imageUploadUseState, validateImageFrontEndSide } = useImageVerificationAndUpload()
	const { isImageValid, displayImage, imgSrc, imageError } = imageUploadUseState();

	const validatePoiImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		resetUseState();

		if (!file) {
			throw new Error('Erreur lors du chargement du fichier')
		}
		validateImageFrontEndSide(file)
	}

	// validate the URL so that the backend validator accept it
	type UrlIsFQDN = '' | 'http' | 'trailing-slash' | 'simply-invalid' | 'valid';
	const [urlIsFQDN, setUrlIsFQDN] = useState<UrlIsFQDN>('');
	const validateTheDomain = (e: string) => {
		const string = e
		setUrlIsFQDN('');

		if (urlIsFQDN === '') return setUrlIsFQDN('');

		const isProtocol = new RegExp(/^(http:\/\/|https:\/\/)/)
		if (isProtocol.exec(string)) {
			setUrlIsFQDN('http')
			return
		}

		const hasInvalidTrailingCharact = new RegExp(/\/$/)
		if (hasInvalidTrailingCharact.exec(string)) {
			setUrlIsFQDN('trailing-slash')
			return
		}

		const isInvalidUrl = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/)
		if (!isInvalidUrl.exec(string)) {
			setUrlIsFQDN('simply-invalid')
			return
		}

		setUrlIsFQDN('valid');
		return
	}


	// Add a new poi mutation
	const handleAddPoi = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formAddPoiData = new FormData(form as HTMLFormElement);
		const formJsonAddPoi = Object.fromEntries(formAddPoiData.entries())

		const destructuredData = {
			address: formJsonAddPoi['address'] as string,
			externalLink: formJsonAddPoi['externalLink'] !== '' ? formJsonAddPoi['externalLink'] as string : '' as string,
			imageUrl: imgSrc,
			poiCategory: Number(formJsonAddPoi['poiCategory']),
			poiCity: Number(formJsonAddPoi['poiCity']),
			poiDescription: formJsonAddPoi['poiDescription'] as string,
			poiLatitude: Number(formJsonAddPoi['poiLatitude']),
			poiLongitude: Number(formJsonAddPoi['poiLongitude']),
			poiName: formJsonAddPoi['poiName'] as string
		}

		if (!destructuredData.poiCity || isNaN(destructuredData.poiCity)) {
			alert('Veuillez sélectionner une ville');
			return;
		}

		if (!destructuredData.poiCategory || isNaN(destructuredData.poiCategory)) {
			alert('Veuillez sélectionner une catégorie');
			return;
		}

		if (!imgSrc) {
			alert('Veuillez télécharger une image');
			return;
		}

		try {
			const result = await createPoi({
				variables: {
					data: { ...destructuredData }
				},
				refetchQueries: [
					{
						query: GET_ALL_POIS
					}
				]
			})
			if (!result) throw new Error('Missing data');

			alert('Point d\'intérêt créé avec succès !');
			form.reset();
			resetUseState();

		} catch (error) {
			console.error('Erreur lors de la création du point d\'intérêt', error);
			alert('Erreur lors de la création du point d\'intérêt');
		}
	}


	// Edit the POI
	type EditPoiStep = 1 | 2 | 3
	const [editPoiStep, setEditPoiStep] = useState<EditPoiStep>(1)

	const handlePoiStep = (step: EditPoiStep) => {
		if (step >= 1 && step <= 3) return setEditPoiStep(step)
		return setEditPoiStep(1)
	}
	const [editPoiCity, setEditPoiCity] = useState(0);
	const { data: allPoiFromCityData } = useGetPoisByCityQuery({
		variables: { cityId: editPoiCity },
		skip: editPoiCity === 0, // Don't run query if no city selected
	});

	const [selectedPoiId, setSelectedPoiId] = useState(0);
	const { data: poiByIdData } = useGetPoiByIdQuery({
		variables: {
			getPoiByIdId: selectedPoiId
		},
		skip: selectedPoiId === 0
	})
	const handleEditPoi = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget; 
		const formEditPoi = new FormData(form);
		const formJsonEditPoi = Object.fromEntries(formEditPoi.entries())

		try {

			const newPoiInformations = {
				address: formJsonEditPoi['newAddress'] !== '' ? formJsonEditPoi['newAddress'] as string : poiByIdData?.getPoiById.address as string, 
				externalLink: formJsonEditPoi['newExternalLink'] !== '' ? formJsonEditPoi['newExternalLink'] as string : poiByIdData?.getPoiById.externalLink as string, 
				imageUrl: imgSrc !== '' ? imgSrc : poiByIdData?.getPoiById.imageUrl as string, 
				poiDescription: formJsonEditPoi['newPoiDescription'] !== '' ? formJsonEditPoi['newPoiDescription'] as string : poiByIdData?.getPoiById.poiDescription as string, 
				poiName: formJsonEditPoi['newPoiName'] !== '' ? formJsonEditPoi['newPoiName'] as string : poiByIdData?.getPoiById.poiName as string, 
				poiCity: editPoiCity !== 0 ? editPoiCity : poiByIdData?.getPoiById.poiCity.cityId as number, 
				poiCategory: formJsonEditPoi['newPoiCategory'] !== '' ? Number(formJsonEditPoi['newPoiCategory']) : (poiByIdData?.getPoiById.poiCategory?.categoryId as number),
				poiLatitude: formJsonEditPoi['newPoiLatitude'] !== '' ? Number(formJsonEditPoi['newPoiLatitude']) : poiByIdData?.getPoiById.poiLatitude as number,
				poiLongitude: formJsonEditPoi['newPoiLongitude'] !== '' ? Number(formJsonEditPoi['newPoiLongitude']) : poiByIdData?.getPoiById.poiLongitude as number,
			}

			if (!poiByIdData?.getPoiById.poiId) {
				throw new Error('ID du POI manquant');
			}

			const { data } = await updatePoi({
				variables : {  
					data: newPoiInformations,
  				 	poiId: poiByIdData.getPoiById.poiId
				},
				refetchQueries: [
					{ query: GET_ALL_POIS}
				], 
				awaitRefetchQueries: true
			})
			if (!data) {
				throw new Error("Erreur lors de la requête d'update du Poi");
			}
			alert('Point d\'intérêt modifié avec succès !');
			form.reset(); 
			setEditPoiStep(1); 
			setEditPoiCity(0); 
			setSelectedPoiId(0); 
		} catch (error) {
			alert("Une erreur est survenue lors de l'édition du point d'intérêt")
			console.error("Une erreur est survenue lors de l'édition du POI", error)
		}

	}

	// Delete the poi
	type DeletePoiConfirmation = "no" | 'wish' | "yes"
	const [userConfirmDeletion, setUserConfirmDeletion] = useState<DeletePoiConfirmation>('no')
	const handleDeletePoi = async (id:number) => {
		setUserConfirmDeletion('yes');
		try {
			if (id === 0) throw new Error("Une erreur est survenue lors de la suppression du POI");
			
			const { data } = await deletePoi({
				variables: {
					poiId: id
				}, 
				refetchQueries: [
					{query:GET_ALL_POIS}
				], 
				awaitRefetchQueries: true
			})
			if (!data) throw new Error(`Une erreur est survenue lors de la suppression du POI ${poiByIdData?.getPoiById.poiName}`)

			alert('Suppression du POI effectué avec succès !'); 
			setEditPoiStep(1); 
			setEditPoiCity(0); 
			setSelectedPoiId(0); 
		} catch (error) {
			console.error('Une erreur inattendue est survenue lors de la suppression du POI', error)
		}
	}

	return (
		<>
			<h2>Points d'intêret</h2>
			<div className="tab__container">
				<div className={"tab__btn " + (isCreationPoiTab === 'creation-tab' ? 'active' : '')} onClick={() => changingTabHandler('creation-tab')}>
					<h3>Créer un nouveau POI</h3>
				</div>
				<div className={"tab__btn " + (isCreationPoiTab === 'edition-tab' ? 'active' : '')} onClick={() => changingTabHandler('edition-tab')}>
					<h3>Administrer un Poi</h3>
				</div>
			</div>

			<div className="backoffice-container">

				{/* Create a new POI */}
				{isCreationPoiTab === 'creation-tab' &&
					<form onSubmit={handleAddPoi}>
						<label htmlFor="poiCity">Sélectionner la ville dans laquelle se trouve le POI à modifier
							<select name="poiCity" required>
								<option value="">Sélectionnez une ville</option>
								{cityData?.getAllCities.map((city) => (
									<option value={city.cityId} key={city.cityId}>{city.cityName}</option>
								))}
							</select>
						</label>

						<label htmlFor="poiName">Nom du point d'intérêt
							<input type="text" name="poiName" placeholder="Lieu intéressant" required minLength={2} />
						</label>

						<label htmlFor="imageUrl" className='vertical' >Image
							<div>
								<input
									type="file"
									name="imageUrl"
									id="imageUrl-file"
									placeholder="Image"
									accept="image/jpeg, image/png, image/jpg, image/webp"
									onChange={validatePoiImage}
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

						<label htmlFor="address">Adresse du point d'intêret
							<input type="text" name="address" placeholder="123 Chemin de la Route, Ville-la-ville 012345 France" required minLength={10} />
						</label>

						<label htmlFor="externalLink">Lien vers le site officiel du point d'intérêt
							<input type="text" name="externalLink" placeholder="www.official-website.fr" onBlur={(e) => validateTheDomain(e.target.value)} />
							{
								urlIsFQDN === 'http' && <span>L'URL ne doit pas contenir : https:// ou http://. Veuillez simplement taper dans le format mondomaine.fr ou www.url.fr</span>
							}
							{
								urlIsFQDN === "trailing-slash" && <span>Veuillez enlever le '/' à la fin de votre URL.</span>
							}
							{
								urlIsFQDN === "simply-invalid" && <span>Format de l'URL invalide. Veuillez entrer une URL valide.</span>
							}
							{
								urlIsFQDN === 'valid' && <span>
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
									</svg> URL valide</span>
							}
						</label>

						<label htmlFor="poiCategory">Catégorie du point d'intérêt
							<select name="poiCategory" required>
								<option value="">Sélectionnez une catégorie</option>
								{allCategoriesData?.getAllCategories.map((cat) => (
									<option value={cat.categoryId} key={cat.categoryId}>{cat.categoryName}</option>
								))}
							</select>
						</label>

						<div>
							<h3>Coordonnées</h3>
							<label htmlFor="poiLongitude">Longitude
								<input type="number" name="poiLongitude" placeholder="48,8575" step="0.000001" required min="-180" max="180" onBlur={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')} />
								{isLongitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
							<label htmlFor="poiLatitude">Latitude
								<input type="number" name="poiLatitude" placeholder="2.3514" step="0.000001" required min="-90" max="90" onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')} />
								{isLatitudeValid === false && <p>{coordinateFormatError}</p>}
							</label>
							{showMap &&
								<MapContainer
									center={[mapLatitude, mapLongitude]}
									zoom={13}
									style={{ height: '300px', width: '70%', alignSelf: 'center' }}
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
						</div>
						<div>
							<h3>
								Description
							</h3>
							<label htmlFor="poiDescription">
								<textarea name="poiDescription" required minLength={10} cols={135}></textarea>
							</label>
						</div>
						<input type="submit" value="valider" />

					</form>
				}

				{/* Edition et suppression de POI */}
				{
					isCreationPoiTab === "edition-tab" &&
					<>
						<form onSubmit={handleEditPoi}>
							<label htmlFor="poiCity">Ajouter un point d'intêret (POI) la ville :
								<select name="poiCity" required onChange={(e) => {
									const cityId = Number(e.target.value);
									setEditPoiCity(cityId);
									if (cityId > 0) handlePoiStep(2); // Only advance if valid city selected
								}}>
									<option value="">Sélectionnez une ville</option>
									{cityData?.getAllCities.map((city) => (
										<option value={city.cityId} key={city.cityId}>{city.cityName}</option>
									))}
								</select>
							</label>

							{
								editPoiStep >= 2 &&
								<label htmlFor="poiId">Point d'intérêt à modifier
									<select name="poiId" onChange={(e) => {
										const poiId = Number(e.target.value);
										setSelectedPoiId(poiId);
										if (poiId > 0) handlePoiStep(3);
									}}>
										<option value=''>Sélectionnez le point d'intérêt</option>
										{
											allPoiFromCityData?.getPoisByCity.map((poi) => (
												<option key={poi.poiId} value={poi.poiId} >
													{poi.poiName}
												</option>
											))
										}
									</select></label>
							}


							{
								editPoiStep === 3 &&
								<>
									<label htmlFor="newPoiName">Nouveau nom
										<input type="text" name="newPoiName" placeholder="Nouveau nom" minLength={2} />
										<span>Ancien nom : {poiByIdData?.getPoiById.poiName}</span>
									</label>

									<label htmlFor="newImageUrl" className='vertical' >Nouvelle image

										<div>
											<input
												type="file"
												name="newImageUrl"
												id="imageUrl-file"
												placeholder="Image"
												accept="image/jpeg, image/png, image/jpg, image/webp"
												onChange={validatePoiImage}
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
										<div>Image actuelle
											<img src={poiByIdData?.getPoiById.imageUrl} height="300" />
										</div>
									</label>

									<label htmlFor="newAddress">Nouvelle adresse du point d'intêret
										<input type="text" name="newAddress" placeholder="123 Chemin de la Route, Ville-la-ville 012345 France" minLength={10} />
										<p>Ancienne adress : {poiByIdData?.getPoiById.address}</p>
									</label>

									<label htmlFor="newExternalLink">Nouveau lien vers le site officiel du point d'intérêt
										<input type="text" name="newExternalLink" placeholder="www.official-website.fr" onBlur={(e) => validateTheDomain(e.target.value)} />
										{
											urlIsFQDN === 'http' && <span>L'URL ne doit pas contenir : https:// ou http://. Veuillez simplement taper dans le format mondomaine.fr ou www.url.fr</span>
										}
										{
											urlIsFQDN === "trailing-slash" && <span>Veuillez enlever le '/' à la fin de votre URL.</span>
										}
										{
											urlIsFQDN === "simply-invalid" && <span>Format de l'URL invalide. Veuillez entrer une URL valide.</span>
										}
										{
											urlIsFQDN === 'valid' && <span>
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
												</svg> URL valide</span>
										}
										<span>Ancien lien : {poiByIdData?.getPoiById.externalLink}</span>
									</label>

									<label htmlFor="newPoiCategory">Catégorie du point d'intérêt
										<select name="newPoiCategory">
											<option value="">Sélectionnez une catégorie</option>
											{allCategoriesData?.getAllCategories.map((cat) => (
												<option value={cat.categoryId} key={cat.categoryId}>{cat.categoryName}</option>
											))}
										</select>
										<span>Ancienne catégorie : {poiByIdData?.getPoiById.poiCategory?.categoryName}</span>
									</label>

									<div>
										<h3>Coordonnées</h3>
										<label htmlFor="newPoiLongitude">Nouvelle longitude
											<input type="number" name="newPoiLongitude" placeholder="01234" step="any" min="-180" max="180" onBlur={(e) => checkCoordinateInput(e, setIsLongitudeValid, 'longitude')} />
											<span>Ancienne longitude : {poiByIdData?.getPoiById.poiLongitude}</span>
											{isLongitudeValid === false && <p>{coordinateFormatError}</p>}
										</label>
										<label htmlFor="newPoiLatitude">Nouvelle latitude
											<input type="number" name="newPoiLatitude" placeholder="01234" step="any" min="-90" max="90" onBlur={(e) => checkCoordinateInput(e, setIsLatitudeValid, 'latitude')} />
											<span>Ancienne latitude : {poiByIdData?.getPoiById.poiLatitude}</span>
											{isLatitudeValid === false && <p>{coordinateFormatError}</p>}
										</label>
										{showMap &&
											<MapContainer
												center={[mapLatitude, mapLongitude]}
												zoom={13}
												style={{ height: '300px', width: '70%', alignSelf: 'center' }}
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
									</div>
									<div>
										<h3>
											Description
										</h3>
										<label htmlFor="newPoiDescription">
											<textarea name="newPoiDescription" minLength={10}></textarea>
											<p>Ancienne description : {poiByIdData?.getPoiById.poiDescription}</p>
										</label>
									</div>
									<input type="submit" value="valider" />
								</>
							}
						</form>

						{
							editPoiStep === 3 &&
							<>
								<p>Or</p>
								<button onClick={() => setUserConfirmDeletion('wish')}>Supprimer le point d'intérêt</button>
								{
									userConfirmDeletion === 'wish' &&
									<>
										<p>Souhaitez-vous supprimer le point d'intérêt ? Attention cette action est irréversible.</p>
										<button onClick={() => handleDeletePoi(Number(poiByIdData?.getPoiById.poiId))}>Oui, supprimer le point d'intérêt</button>
										<button onClick={() => setUserConfirmDeletion('no')}>Annuler la suppression</button>
									</>
								}
							</>
						}
					</>
				}
			</div>
		</>
	)
}
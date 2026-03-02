import { useState, type FormEvent } from "react";
import { useCreatePoiMutation, useDeletePoiMutation, useGetAllCategoriesQuery, useGetAllCitiesQuery, useGetAllPoisQuery } from "../generated/graphql-types";
import "../scss/pages/backoffice.scss";
import useImageVerificationAndUpload from "../pages/backofficeHandler/imageVerificationAndUpload";
import { GET_ALL_POIS } from "../graphql/operations";

export default function BackofficePoi() {

	const { data: cityData, loading: cityLoading, error: cityError } = useGetAllCitiesQuery();
	const { data: allCategoriesData, loading: allCategoriesLoading, error: allCategoriesError } = useGetAllCategoriesQuery();

	const [createPoi] = useCreatePoiMutation();
	const [deletePoi] = useDeletePoiMutation();

	const {resetUseState, imageUploadUseState, validateImageFrontEndSide } = useImageVerificationAndUpload()
	const { isImageValid, displayImage, imgSrc, imageError} = imageUploadUseState(); 

	const validatePoiImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null; 

		resetUseState(); 

		if (!file) {
			throw new Error('Erreur lors du chargement du fichier')
		}
		validateImageFrontEndSide(file)
	}

	type UrlIsFQDN = ''|'http'|'trailing-slash'|'simply-invalid'|'valid'
	const [urlIsFQDN, setUrlIsFQDN] = useState<UrlIsFQDN>(''); 
	const validateTheDomain = (e: string ) => {
		const string = e 
		setUrlIsFQDN(''); 

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
		if (!isInvalidUrl.exec(string)){
			setUrlIsFQDN('simply-invalid')
			return
		}

		setUrlIsFQDN('valid'); 
		return
	}
	
	const handleAddPoi = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formAddPoiData = new FormData(form as HTMLFormElement);
		const formJsonAddPoi = Object.fromEntries(formAddPoiData.entries())
		
		const destructuredData = {
			address: formJsonAddPoi['address'] as string,
			externalLink: formJsonAddPoi['externalLink'] as string,
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
		const result  = await createPoi({
				variables: {
					data: {...destructuredData}
				}, 
				refetchQueries: [
					{
						query: GET_ALL_POIS
					}
				]
			})
			if (!result) throw new Error('Missing data'); 

			alert('Point d\'intérêt créer avec suscès !'); 
			form.reset(); 
			resetUseState(); 
		} catch (error) {
			console.error('Erreur lors de la création du point d\'intérêt', error); 
			alert('Erreur lors de la création du point d\'intérêt')
		}
	}

	return (
		<>
			<h2>Points d'intêret</h2>
			<div className="backoffice-container">

				<form onSubmit={handleAddPoi}>
					<label htmlFor="poiCity">Ajouter un point d'intêret (POI) la ville :
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
									onChange={ validatePoiImage }
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
					<input type="text" name="externalLink" placeholder="www.official-website.fr" required onBlur={(e) => validateTheDomain(e.target.value)}/>
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
					<input type="number" name="poiLongitude" placeholder="01234" step="any" required min="-180" max="180" />
					</label>
					<label htmlFor="poiLatitude">Latitude
					<input type="number" name="poiLatitude" placeholder="01234" step="any" required min="-90" max="90" />
						</label>
					</div>
					<div>
						<h3>
							Description
						</h3>
						<label htmlFor="poiDescription">
						<textarea name="poiDescription" required minLength={10}></textarea>
						</label>
					</div>
					<input type="submit" value="valider" />

				</form>
			</div>
		</>
	)
}
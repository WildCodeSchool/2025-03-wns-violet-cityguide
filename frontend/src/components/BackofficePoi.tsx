import "../scss/pages/backoffice.scss";

export default function BackofficePoi() {
	return (
		<>
			<h2>Points d'intêret</h2>
			<div className="backoffice-container">
				<h3>Ville concernée : </h3>
				<hr></hr>
				<h3>Liste des POI existant</h3>
				<ul>
					<li>Ceci est un poi 1</li>
					<li>Ceci est un poi 2</li>
					<li>Ceci est un poi 3</li>
				</ul>
				<hr></hr>
				<h3>Ajouter un nouveau POI</h3>
				<form>
					<label htmlFor="poiCity">Point d'intérêt de la ville
						<span> For-For-Lointain</span>
					</label>

					<label htmlFor="poiName">Nom du point d'intérêt
						<input type="text" name="poiName" placeholder="Lieu intéressant" />
					</label>

					<label htmlFor="imageUrl">Image d'illustration
						<input type="file" name="imageUrl" />
					</label>

					<label htmlFor="address">Adresse du point d'intêret
						<input type="text" placeholder="123 Chemin de la Route, Ville-la-ville 012345 France" />
					</label>

					<label htmlFor="externalLink">Lien vers le site officiel du point d'intérêt
						<input type="url" placeholder="https://official-website.fr" />
					</label>
					<label htmlFor="poiCategory">Catégorie du point d'intérêt
						<select>
							<option>Ceci est la première cat</option>
							<option>Ceci est la seconde cat</option>
							<option>Ceci est la troisième cat</option>
						</select>
					</label>

					<div>
						<h3>Coordonnées</h3>
						<label htmlFor="poiLongitude">Longitude
							<input type="number" placeholder="01234" />
						</label>
						<label htmlFor="poiLatitude">Latitude
							<input type="number" placeholder="01234" />
						</label>
					</div>
					<div>
						<h3>
							Description
						</h3>
						<label htmlFor="poiDescription">
							<textarea></textarea>
						</label>
					</div>
					<input type="submit" value="valider" />

				</form>
			</div>
		</>
	)
}
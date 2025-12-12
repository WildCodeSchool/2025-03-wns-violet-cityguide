import { useState } from "react";

export default function BackofficeUser() {
	const [isValidUser, setIsValidUser] = useState(false);
	let validatedUserName = 'U
	return (
		<>
			<h2>Utilisateurs</h2>
			<form className="section-part">
				<label htmlFor="nom-utilisateur">Chercher le nom de l'utilisateur
					<input type="text" name="nom-utilisateur" placeholder="Jean-Miche" required />
				</label>
				<input type="submit" name="isNameValid" value="Vérifier utilisateur" />
			</form>
			{!isValidUser &&
				<div className="section-part">
					<h3>Utilisateur '{validatedUserName}' trouvé</h3>
					<ul>Rôle de cet utilisateur :
						<li>Utilisateur standard</li>
						<li>Créateur de point d'intérêt</li>
					</ul>
					<p>Voulez-vous ...</p>
					<button>Administrer un rôle</button>
					<button>Désactivé</button>
					<button>Supprimer l'utilisateur</button>

				</div>}
		</>

	)
}
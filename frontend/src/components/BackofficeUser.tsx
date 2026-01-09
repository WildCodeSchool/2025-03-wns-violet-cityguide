import { useEffect, useState, type FormEvent } from "react";
import { useGetAllUsersQuery } from "../generated/graphql-types";
import { useCurrentUser } from "../zustand/userStore";

type User = {
	userId: number, 
	email: string, 
}

export default function BackofficeUser() {
	
	const { data: allUserData } = useGetAllUsersQuery()
	// const [ query, setQuery ] = useState(allUserData?.getAllUsers ?? "")

	// useEffect(() => {
	// 	setQuery(allUserData?.getAllUsers ?? '')
	// }, [allUserData])

	// const handleSearchUser = (e: FormEvent) => {
	// 	e.preventDefault()
	// 	const trimmed = query.email
	// 	.trim()
	// 	.toLowerCase()

	// 	if (!trimmed) return 
	// }


	return (
		<>
			<h2>Utilisateurs</h2>
			{/* <form className="section-part">
				<label htmlFor="nom-utilisateur">Chercher le nom de l'utilisateur
					<input type="text" name="nom-utilisateur" placeholder="Jean-Miche" required />
				</label>
				<input type="submit" name="isNameValid" value="Vérifier utilisateur" />
			</form> */}
			<div className="user-mail section-part">
				<label htmlFor="user_searchbar">
					<input type="text" placeholder="user@mail.com" onChange={() => handleSearchUser}/>
				</label>
				<div className="user-mail__content">
					{allUserData &&
					allUserData?.getAllUsers.map((user:User, i:number) => (
						<div className="user-mail__item" key={i}>{user.email}</div>
					))
					}
				</div>
				
			</div>
			{/* {!isValidUser &&
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

				</div>} */}
		</>

	)
}
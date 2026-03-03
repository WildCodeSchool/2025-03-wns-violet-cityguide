import { Fragment, useRef, useState } from "react";
import { 
	useDeleteUserByIdMutation,
	useGetAllUsersQuery,
	Role,
	useUpdateUserRoleMutation,
	useUpdateUserDataMutation,
	useUpdateUserInfoMutation,
	type UpdateUserEveryDetailsInput,
	type UserInfoInput,
	useGetAllUserInfosQuery
} from "../generated/graphql-types";
import { useCurrentUser } from "../zustand/userStore";
import { GET_ALL_USER_INFO, GET_ALL_USERS } from "../graphql/operations";

export default function BackofficeUser() {

	// formRef est le formulaire contenu dans le DOM
	const formRef = useRef< HTMLFormElement | null >(null);

	// Opérations à la validation du formulaire
	const [updateUserRole] = useUpdateUserRoleMutation();
	const [updateUserData] = useUpdateUserDataMutation();
	const [ updateUserInfo ] = useUpdateUserInfoMutation();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

		// On empêche la page d'être rechargée au clic sur le bouton de validation des modifications
		e.preventDefault();

		// Données du formulaire
		if (!formRef.current || !userToUpdate) return;
		const formData = new FormData(formRef.current);

		// Composition des données User modifiées
		const roles: Role[] = [Role.User];

		// gestion des roles
		if (formData.get("admin-city-role")) {
			roles.push(Role.AdminCity);
		}
		if (formData.get("admin-poi-role")) {
			roles.push(Role.PoiCreator);
		}

		const email = formData.get("email") as string;
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		let avatarUrl = "";
		if (formData.get("avatarUrl") as string != "") {
			avatarUrl = formData.get("avatarUrl") as string
		}

		try {

			// Update Role OK
			await updateUserRole({
				variables: {
					data: {
						roles: roles,
					},
					userId: userToUpdate.userId,
				},
				refetchQueries : [
					{ query: GET_ALL_USERS }
				]
			});

			// Update Mail OK
			await updateUserData({
				variables: {
						data: {
							email: email,
						},
						userId: userToUpdate.userId
				},
				refetchQueries : [
					{ query: GET_ALL_USERS }
				]
			});

			// Update userInfo OK
			await updateUserInfo({
				variables: {
					data: {
						firstName: firstName,
						lastName:lastName,
						avatarUrl: avatarUrl,
					},
					userInfoId: userToUpdate.userId
				},
				refetchQueries : [
					{ query: GET_ALL_USER_INFO }
				]
			});

			setUserBeingUpdated(null);
		} catch {
		console.error("Erreur lors de la modification de l'utilisateur :", Error);
	}
	}

	// Utilisateur connecté
	const connectedUser = useCurrentUser();
	const rolesAllowedToUpdateUsersRoles = [Role.AdminSite, Role.AdminCity];
	const isAllowedToAdministrateUsers = connectedUser?.roles?.some(role => rolesAllowedToUpdateUsersRoles.includes(role));

	// Récupération des utilisateurs
	const {data: dataUser, loading: loadingUser, error: errorUser} = useGetAllUsersQuery();

	// Récupération des informations utilisateur
	const {data: dataUserinfo, loading: loadingUserInfo, error: errorUserInfo} = useGetAllUserInfosQuery();

	// Modification d'un utilisateur
	const [userToUpdate, setUserToUpdate] = useState<null | UpdateUserEveryDetailsInput>(null);
	const [userInfoToUpdate, setUserInfoToUpdate] = useState<null | UserInfoInput> (null);

	const editUserHandler = (userToUpdateId: number) => {

		// Récupération de l'utilisateur à modifier
		const userToBeUpdated = dataUser?.getAllUsers.find(user => user.userId === userToUpdateId);
		
		// Récupération du userInfo associé à l'utilisateur à modifier
		const userInfoToUpdate = dataUserinfo?.getAllUserInfos.find(userInfo => userInfo.user.userId === userToUpdateId);

		// Si pas d'utilisateur trouvé, arrêt du traitement
		if (!userToBeUpdated) return;

		// Si pas de user info trouvé, arrêt du traitement
		if(!userInfoToUpdate) return;

		// Sinon, set de l'utilisateur à modifier et du user info
		setUserToUpdate(userToBeUpdated);
		setUserInfoToUpdate(userInfoToUpdate);

		// stockage de l'id de l'utilisateur à modifier
		setUserBeingUpdated(userToUpdateId);
	}

	// Gestion de l'affichage du formulaire de modification
	const [ userBeingUpdated, setUserBeingUpdated ] = useState<number | null>(null);

	// Supression d'un utilisateur
	const [ deleteUser ] = useDeleteUserByIdMutation({
		refetchQueries: ['GetAllUsers']
	})

	// Gestion de l'affichage des boutons de suppression
	const [userIdBeingDeleted, setUserIdBeingDeleted] = useState<number | null>(null);

	// Suppression de l'utilisateur
	const handleDeleteUserMutation = async(userId: number) => {
		try {
			const deletionResult = await deleteUser({
					variables: {
						userId: userId,
					}
			})

			if (deletionResult.data) alert("Utilisateur supprimé !");
			if (deletionResult.errors) throw new Error(deletionResult.errors[0].message);
			setUserIdBeingDeleted(null);
		} catch (error) {
			console.error("L'utilisateur n'a pas pu être supprimé", error);
		}
	}

	// Gestion du chargement ou des erreurs de récupération des données utilisateurs
	if (loadingUser) return <p>Loading User...</p>;
	if (errorUser) return <p>Error 😔</p>;
		if (loadingUserInfo) return <p>Loading User Infos...</p>;
	if (errorUserInfo) return <p>Error 😔</p>;
	if (dataUser?.getAllUsers === undefined) {
		return <p>Erreur : Pas d'utilisateurs trouvés</p>
	}

	return (
		<>
			{ isAllowedToAdministrateUsers && (
				<>
					<h2>Utilisateurs</h2>
					<table className="admin-table-users">
						<thead>
							<tr>
								<th>Adresse mail</th>
								<th>Role</th>
								<th>Prénom</th>
								<th>Nom</th>
								<th>Photo de profil</th>
								<th>Modifier / Supprimer</th>
							</tr>
						</thead>
						<tbody>
							{ dataUser?.getAllUsers ? (
								dataUser?.getAllUsers.map((currUser) => (
									<tr key={ currUser.userId }>
										<td>{ currUser.email }</td>
										<td>{ currUser.roles.join(', ') }</td>
										
										{/* FirstName et lastName doivent venir de dataUserInfo et correspondre à l'utilisateur courant (currUser) */}
										{ dataUserinfo?.getAllUserInfos.filter(currUserInfo => 
											currUserInfo.user.userId === currUser.userId).map((currUserInfoMap) => (

												// La syntaxe longue <Fragment> au lieu de <> est obligatoire pour pouvoir lui attribuer une key
												<Fragment key={currUserInfoMap.user.userId}>
													<td>{currUserInfoMap.firstName}</td>
													<td>{currUserInfoMap.lastName}</td>
													<td className="td-image"><img className="miniature-pp" src={ currUserInfoMap.avatarUrl.length ? currUserInfoMap.avatarUrl : "/src/assets/img/pp_user_std_carre.jpg"} alt="Photo de profil standard" /></td>
												</Fragment>
											))
										}

										{/* Boutons de modification / Suppression d'utlisateurs */}
										<td>
											<div className="admin-user-td-buttons">
												<button className="admin-user-button" onClick={() => editUserHandler(currUser.userId)}>🖊️</button>

												{ connectedUser?.roles?.includes(Role.AdminSite) && (
													<>
														{ !currUser.roles.includes(Role.AdminSite) &&
															<>
																{ userIdBeingDeleted !== currUser.userId && (
																		<button className="admin-user-button" onClick={() => setUserIdBeingDeleted(currUser.userId)}>🗑️</button>
																)}

																{ userIdBeingDeleted === currUser.userId && (
																	<>
																			<button className="delete-alert delete-cancel" onClick={() => setUserIdBeingDeleted(null)}>Annuler la suppression</button>
																			<button className="delete-alert delete-confirm" onClick={() => handleDeleteUserMutation(currUser.userId)}>Confirmer la suppression</button>
																	</>
															)}
															</>
														}
													</>
												)}
											</div>
										</td>
									</tr>
								))
							) : (<p>Erreur : Pas d'utilisateurs trouvés</p>)}
						</tbody>
					</table>

					{ userBeingUpdated != null && (
						<form 
							ref={ formRef }
							onSubmit={ handleSubmit }
							className="form-update-user"
							>

								{/* Header du formulaire */}
								<div className="form-update-user__form-header">
									<h3 className="form-update-user__form-header__form-header-title">Modification de l'utilisateur {userInfoToUpdate?.firstName} {userInfoToUpdate?.lastName}</h3>
									<button
										className="form-update-user__form-header__form-header-button user-admin-button"
										onClick={ () => {setUserBeingUpdated(null)} }
									>Abandonner les modifications</button>
								</div>
								
								{/* Corps du formulaire */}
								<div className="form-update-user__form-body">
									<div className="form-update-user__form-body__infos-without-avatar">

										{/* Mail */}
										<div className="form-update-user__form-body__infos-without-avatar__form-inputs">
											<label
											className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-label"
											htmlFor="userEmail">Email : 
											</label>
											<input
												type="email"
												defaultValue={userToUpdate?.email}
												name="email"
												className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-input email-input"
											/>
										</div>

										{/* Prénom */}
										<div className="form-update-user__form-body__infos-without-avatar__form-inputs">
											<label
												className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-label"
												htmlFor="userFirstName">Prénom : 
											</label>
											<input
												type="text"
												defaultValue={userInfoToUpdate?.firstName}
												name="firstName"
												className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-input"
											/>
										</div>

										{/* Nom */}
										<div className="form-update-user__form-body__infos-without-avatar__form-inputs">
											<label
												className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-label"
												htmlFor="userLastName">Nom : 
											</label>
											<input
												type="text"
												defaultValue={userInfoToUpdate?.lastName}
												name="lastName"
												className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-input"
											/>
										</div>

										{/* Role */}
										{!userToUpdate?.roles.includes(Role.AdminSite) && (
											<div className="form-update-user__form-body__infos-without-avatar__form-inputs">
												<p className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-label">Role(s) :</p>

												<div className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-checkboxes">
													
													{/* Administrateur de ville */}
													{connectedUser?.roles?.includes(Role.AdminSite) && (
														<label
															htmlFor="admin-city-role"
															className="form-update-user__form-body__infos-without-avatar__form-inputs__form-body-checkboxes__form-body-checboxes-label"
														>
															<input 
																type="checkbox" 
																id="admin-city-role" 
																name="admin-city-role" 
																defaultChecked={userToUpdate?.roles?.includes(Role.AdminCity)} 
															/>Administrateur de ville
														</label>
													)}
													
													{/* Administrateur de points d'intérêt */}
													<label
														htmlFor="admin-poi-role">
														<input
															type="checkbox"
															id="admin-poi-role"
															name="admin-poi-role"
															defaultChecked={userToUpdate?.roles?.includes(Role.PoiCreator)}
														/>Administrateur de points d'intérêts
													</label>
												</div>
											</div>
										)}
									</div>

									{/* Avatar */}
									<div className="form-update-user__form-body__avatar-inputs">

										{/* Affichage des images */}
										<div className="form-update-user__form-body__avatar-inputs__avatars-display">
											<div className="form-update-user__form-body__avatar-inputs__avatars-display__avatar-block">
												<div className="form-update-user__form-body__avatar-inputs__avatars-display__avatar-block__curr-old-info">Avatar actuel</div>
												<img className="miniature-pp" src={ userInfoToUpdate?.avatarUrl.length ? userInfoToUpdate?.avatarUrl : "/src/assets/img/pp_user_std_carre.jpg"} alt="Photo de profil standard" />
												<div className="form-update-user__form-body__avatar-inputs__avatars-display__avatar-block__is-success"> </div>
											</div>
										</div>

										{/* Champ saisie nouvelle image */}
										<div className="form-update-user__form-body__avatar-inputs__form-inputs">
											<label
												className="form-update-user__form-body__avatar-inputs__form-inputs__form-body-label"
												htmlFor="avatarUrl">Avatar : 
											</label>
											<input
												type="url"
												defaultValue={userInfoToUpdate?.avatarUrl}
												name="avatarUrl"
												className="form-update-user__form-body__avatar-inputs__form-inputs__form-body-input"
											/>
										</div>
									</div>

								</div>

								{/* Footer du formulaire */}
								<div className="form-update-user__form-footer">
									<button
										type="submit"
										className="form-update-user__form-footer__form-footer-button user-admin-button"
									>Valider les modifications</button>
								</div>

						</form>
					)}
				</>
			)}
		</>
	)
};


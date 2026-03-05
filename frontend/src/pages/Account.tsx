// Zustand - Context
import { useCurrentUser } from "../zustand/userStore";
import CookieSettings from "../components/CookieSettings";

import { useGetAllUserInfosQuery, useUpdateUserInfoMutation } from "../generated/graphql-types";
import { useEffect, useState } from "react";
import { GET_ALL_USER_INFO } from "../graphql/operations";

export default function Account() {
	const user = useCurrentUser();

	const { data, loading, error } = useGetAllUserInfosQuery({
		skip: !user?.userId,
	});

	const [modifyInformation] = useUpdateUserInfoMutation()

	const [userInfo, setUserInfo] = useState({
		userInfoId: 0,
		firstName: '',
		lastName: '',
		avatarUrl: ''
	});

	type UserModification = '' | 'firstname' | 'lastname' | 'avatar' | 'yes-avatar'
	const [userModify, setUserModify] = useState<UserModification>('');

	useEffect(() => {
		if (!user?.userId || !data?.getAllUserInfos) return;

		const currentUserInfo = data.getAllUserInfos.find(
			(info) => info.user.userId === user.userId
		);

		if (!currentUserInfo) return;

		setUserInfo({
			userInfoId: currentUserInfo.userInfoId,
			firstName: currentUserInfo.firstName,
			lastName: currentUserInfo.lastName,
			avatarUrl: currentUserInfo.avatarUrl,
		});
	}, [data, user?.userId]);

	const cancelModification = () => {

		setUserModify('');
		if (!user?.userId || !data?.getAllUserInfos) return;

		const currentUserInfo = data.getAllUserInfos.find(
			(info) => info.user.userId === user.userId
		);

		if (!currentUserInfo) return;

		setUserInfo({
			userInfoId: currentUserInfo.userInfoId,
			firstName: currentUserInfo.firstName,
			lastName: currentUserInfo.lastName,
			avatarUrl: currentUserInfo.avatarUrl,
		});
	}

	async function filteredInfoToModify(data: {
		firstName: string,
		lastName: string,
		avatarUrl: string
	}) {
		try {

			const result = await modifyInformation({
				variables: {
					data: data,
					userInfoId: userInfo.userInfoId
				},
				refetchQueries: [
					{ query: GET_ALL_USER_INFO }
				]
			});

			if (!result) throw new Error('Une erreure est survenu lors de cette modification')
		} catch (error) {
			console.error("Erreur lors de la modification de l'utilisateur :", error);
		}
	}

	const changeUserFirstname = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formModifyInfo = new FormData(form as HTMLFormElement);

		filteredInfoToModify({
			firstName: formModifyInfo.get('firstName') as string || userInfo.firstName,
			lastName: userInfo.lastName,
			avatarUrl: userInfo.avatarUrl
		})
		form.reset()
		setUserModify('')
	}

	const changeUserLastname = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formModifyInfo = new FormData(form as HTMLFormElement);

		filteredInfoToModify({
			firstName: userInfo.firstName,
			lastName: formModifyInfo.get('lastName') as string || userInfo.lastName,
			avatarUrl: userInfo.avatarUrl
		})
		form.reset()
		setUserModify('')
	}

	const changeUserAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formModifyInfo = new FormData(form as HTMLFormElement);

		filteredInfoToModify({
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			avatarUrl: formModifyInfo.get('avatarUrl') as string || userInfo.avatarUrl
		})
		form.reset()
		setUserModify('')
	}


	return (
		<div className="account">
			<div className="account__wrapper">
				<h1>Mon compte</h1>
				<h2>Bonjour {userInfo.firstName || user?.email}</h2>
				<div className="account__avatar" onMouseEnter={() => setUserModify('avatar')}>
					<button className="admin-user-button avatar-btn" onClick={() => setUserModify('yes-avatar')}>🖊️</button>
					<img
						src={userInfo.avatarUrl || "/src/assets/img/pp_user_std_carre.jpg"}
						alt={`Avatar de ${userInfo.firstName || user?.email || "utilisateur"}`}
					/>
				</div>
				{
					userModify === 'yes-avatar' &&
					<>
						<form onSubmit={changeUserAvatar}>
							<label htmlFor="avatarUrl">URL de l'image</label>
							<input
								type="text"
								name="avatarUrl"
								placeholder={userInfo.avatarUrl}
							/>
							<input type="submit" value="Confirmer la modification" className="admin-user-button" />
						</form>
						<button className="admin-user-button" onClick={() => cancelModification()}> Annuler la modification</button>
					</>
				}
				{loading && <p>Chargement des informations...</p>}
				{error && <p>Impossible de recuperer les informations utilisateur.</p>}

				<table>
					<caption>Mes informations</caption>
					<tbody>
						<tr>
							<th scope="row">Prénom</th>
							<td>{userModify !== 'firstname' && userInfo.firstName}
								{
									userModify === "firstname" &&
									<form onSubmit={changeUserFirstname}>
										<label htmlFor="firstName">
											<input type="text" name="firstName" placeholder={userInfo.firstName} />
										</label>
										<input type="submit" value="Confirmer la modification" className="admin-user-button" />
									</form>

								}</td>
							<td>
								{
									userModify !== "firstname" &&
									<button className="admin-user-button" onClick={() => setUserModify('firstname')}>🖊️</button>
								}
								{userModify === "firstname" &&
									<>
										<button className="admin-user-button" onClick={() => cancelModification()}> Annuler la modification</button>
									</>
								}
							</td>
						</tr>
						<tr>
							<th scope="row">Nom</th>
							<td>{userModify !== 'lastname' && userInfo.lastName}
								{
									userModify === "lastname" &&
									<form onSubmit={changeUserLastname}>
										<label htmlFor="lastName">
											<input type="text" name="lastName" placeholder={userInfo.lastName} />
										</label>
										<input type="submit" value="Confirmer la modification" className="admin-user-button" />
									</form>

								}</td>
							<td>
								{
									userModify !== "lastname" &&
									<button className="admin-user-button" onClick={() => setUserModify('lastname')}>🖊️</button>
								}
								{userModify === "lastname" &&
									<>
										<button className="admin-user-button" onClick={() => cancelModification()}> Annuler la modification</button>
									</>
								}
							</td>
						</tr>
						<tr>
							<th scope="row">Mail</th>
							<td>{user?.email}
							</td>
							<td>
								<span onClick={() => cancelModification()}> [WIP]</span>
							</td>
						</tr>
						<tr>
							<td scope="row" colSpan={2}>Paramètres de  confidentialité</td>
							<td><CookieSettings /></td>
						</tr>
					</tbody>
				</table>
				<div className="deleteAccount">
					<button>Supprimer mon compte [WIP]</button>
				</div>

			</div>
		</div>
	)
}
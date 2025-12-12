import { 
	Arg, 
	Authorized, 
	Field, 
	ID, 
	InputType, 
	Mutation, 
	Query, 
	Resolver,
	Ctx,
} from "type-graphql";

import { IsString } from "class-validator";

import { Context } from "../types/Context";

// Entité
import { UserInfo } from "../entities/UserInfo";

@InputType()
class UserInfoInput {

	@Field()
	@IsString({ message: "Le nom doit être un texte." })
	lastName: string;

	@Field()
	@IsString({ message: "Le prénom doit être un texte." })
	firstName: string;

	@Field()
	@IsString()
	avatarUrl: string;
}

@Resolver(UserInfo)
export default class UserInfoResolver {

	// Pas de création d'élément UserInfo ici : à chaque inscription d'un utilisateur, son UserInfo associé est créé
	// Pas de suppression de UserInfo ici : à chaque suppression d'un User, son UserInfo associé est supprimé grâce à l'utilisation de onDelete: "CASCADE"

	@Query(() => [UserInfo])
	async getAllUserInfos() {
		return await UserInfo.find({
			relations: ["user"]
		});
	}

	// Récupérer un UserInfo en fonction de l'utilisataut auquel il est lié
	@Query(() => UserInfo)
	async getUserInfoByUserId(@Arg("userId") userId: number) {
		return await UserInfo.findOne({
			where: {
				user: { userId }
			},
			relations: ["user"],
		})
	}

	// Modifier un UserInfo (Prévoir de rendre possible à l'utilisateur de modifier ses informations)
	@Authorized("ADMIN_SITE","USER")
	@Mutation(() => ID)
	async updateUserInfo(
		@Arg("userInfoId") userInfoId: number, 
		@Arg("data") data: UserInfoInput,
		@Ctx() ctx: Context,
	) {

		// Récupérer le UserInfo à modifier
		let userInfo = await UserInfo.findOneByOrFail({ userInfoId });

		// Récupération de l'utilisateur connecté
		const currentUser = ctx.user;

		// Est-ce que l'utilisateur connecté est administrateur site ?
		const isAdmin = currentUser?.roles.includes("ADMIN_SITE");

		// Est-ce que l'utilisateur connecté est propriétaire du UserInfo ?
		const isOwner = currentUser?.id === userInfoId;

		// Si l'utilisateur n'est ni administrateur site ni le propriétaire du UserInfo
		if(!isAdmin && !isOwner) {
			throw new Error ("Vous n'êtes pas autorisé à faire cette modification");
		}

		// Assigner les nouvelles valeurs au UserInfo
		userInfo = Object.assign(userInfo, data);

		// Enregistrer le UserInfo modifié
		await userInfo.save();
		return userInfo.userInfoId;
	}
}
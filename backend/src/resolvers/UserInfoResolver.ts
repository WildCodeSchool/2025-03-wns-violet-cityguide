import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { UserInfo } from "../entities/UserInfo";

@InputType()
class UserInfoInput {

	@Field()
	lastName: string;

	@Field()
	firstName: string;

	@Field()
	avatarUrl: string;
}

@Resolver(UserInfo)
export default class UserInfoResolver {

	@Query(() => [UserInfo])
	async getAllUserInfos() {
		return await UserInfo.find({
			relations: ["user"]
		});
	}


	// Get UserInfo by User

	// On ne crée pas d'élément UserInfo ici : à chaque inscription d'un utilisateur, son UserInfo associé est créé
	// On ne supprime pas non plus de UserInfo ici : à chaque suppression d'un User, son UserInfo associé est supprimé grâce à l'utilisation de onDelete: "CASCADE"
	
	// Modifier un UserInfo
	// @Authorized("USER", "ADMIN") TODO décommenter @Authorized("USER", "ADMIN") lorsque ce sera testable 
	// + verifier que USER id == UserInfo.user si pas ADMIN
	@Mutation(() => ID)
	async updateUserInfo(@Arg("userInfoId") userInfoId: number, @Arg("data") data: UserInfoInput) {

		// Récupérer le UserInfo à modifier
		let userInfo = await UserInfo.findOneByOrFail({ userInfoId });

		// Assigner les nouvelles valeurs au UserInfo
		userInfo = Object.assign(userInfo, data);

		// Enregistrer le UserInfo modifié
		await userInfo.save();
		return userInfo.userInfoId;
	}

}
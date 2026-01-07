/**
 * import { Arg, Field, ID, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";

@InputType()
class CreateCommentInput {
	@Field()
	title: string;

	@Field()
	content: string;

	@Field(() => ID)
	poi: Poi;

	@Field(() => ID)
	createdBy: User;
}

@Resolver(Comment)
export default class CommentResolver {
	
	// Récupérer les commentaires liés à un POI

	// Créer un commentaire
	@Mutation(() => ID)
	async createPoiComment(@Arg("data") data: CreateCommentInput) {
		const comment = Comment.create({ ...data });
		await comment.save();
		return comment.commentId;
	}

	// Modifier un commentaire
	
	// Supprimer un commentaire
}
 */
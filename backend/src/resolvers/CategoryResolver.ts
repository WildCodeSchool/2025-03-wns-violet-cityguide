import { 
		InputType,
		Field,
		Resolver,
		Query,
		Mutation,
		ID,
		Arg
} from "type-graphql";
import { Category } from "../entities/Category";


@InputType()
class CategoryInput {
		
		@Field()
		categoryName: string;

		@Field()
		style: string; 
}

@Resolver(Category)
export default class CategoryResolver {

		// Utilisateur (tous) => peut consulter les categories 
		// Adminstrateur site => peut ajouter/modifier categories

		// Récupérer toutes les catégories en base
		@Query(() => [Category])
		async getAllCategories() {
				return await Category.find();
		}
		
		//Créer une catégorie
		@Mutation(() => ID)
		async createCategory(@Arg("data") data: CategoryInput) {
				const category = Category.create({ ...data });
				await category.save();
				return category.categoryId;
		}

		// @Authorized("ADMIN") TODO décommenter @Authorized("ADMIN") lorsque ce sera testable
		// Modifier une catégorie
		@Mutation(() => ID)
		async updateCategory(@Arg("categoryId") categoryId: number, @Arg("data") data: CategoryInput) {

			// Récupérer la catégorie à modifier
			let category = await Category.findOneByOrFail({categoryId});

			// Assigner les nouvelles données à la catégorie à modifier
			category = Object.assign(category, data);

			// Enregistrer les nouvelles données de la catégorie
			await category.save();
			return category.categoryId;
		}

		// @Authorized("ADMIN") TODO décommenter @Authorized("ADMIN") lorsque ce sera testable
		// Supprimer une catégorie
		@Mutation(() => ID)
		async deleteCategory(@Arg("categoryId") categoryId: number) {
			await Category.delete({ categoryId });
			return categoryId;
		}
}
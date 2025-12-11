import { 
		InputType,
		Field,
		Resolver,
		Query,
		Mutation,
		ID,
		Arg,
		Authorized
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

		// Récupérer toutes les catégories en base
		@Query(() => [Category])
		async getAllCategories() {
				return await Category.find({
					relations: ["categoryPois"],
				}
				);
		}

		// Récupérer une catégorie par son id
		@Query(() => Category)
		async getCategoryById(@Arg("categoryId") categoryId: number) {
			return await Category.findOneOrFail({ 
				where: { categoryId: categoryId },
				relations: ["categoryPois"],
			});
		}

		// Créer une catégorie
		@Authorized("ADMIN_SITE")
		@Mutation(() => ID)
		async createCategory(@Arg("data") data: CategoryInput) {
				const category = Category.create({ ...data });
				await category.save();
				return category.categoryId;
		}

		// Modifier une catégorie
		@Authorized("ADMIN_SITE")
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

		// Supprimer une catégorie
		@Authorized("ADMIN_SITE")
		@Mutation(() => ID)
		async deleteCategory(@Arg("categoryId") categoryId: number) {
			await Category.delete({ categoryId });
			return categoryId;
		}
}
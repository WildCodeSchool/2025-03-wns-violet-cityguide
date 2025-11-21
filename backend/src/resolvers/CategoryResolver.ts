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

    // Modifier une catégorie

    // Supprimer une catégorie      
}
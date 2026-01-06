// Librairies
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

import { 
	IsFQDN, 
	IsNumber, 
	IsString, 
	Max, 
	Min, 
	MinLength
} from "class-validator";

// Entités
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

@InputType()
class PoiInput {
	@Field()
	@IsString({ message: "Le nom du point d'intérêt doit être un texte." })
	@MinLength(2, { message: "Le nom du point d'intérêt doit comporter au moins 2 caractères." })
	poiName!: string;

	@Field()
	@IsString({ message: "La description du point d'intérêt doit être un texte." })
	@MinLength(10, { message: "La descritpion du point d'intérêt doit compter au moins 10 caractères." })
	poiDescription: string;

	@Field()
	@IsString()
	imageUrl: string;

	@Field()
	@IsString({ message: "L'adresse du point d'intérêt doit être un texte."})
	@MinLength(10, { message: "L'adresse du point d'intérêt doit comporter au moins 10 caractères." })
	address: string;

	@Field()
	@IsNumber()
	@Min(-90, { message: "La latitude doit être supérieure à -90." })
	@Max(90, { message: "La longitude doit être inférieure à 90." })
	poiLatitude!: number;

	@Field()
	@IsNumber()
	@Min(-180, { message: "La latitude doit être supérieure à -180." })
	@Max(180, { message: "La longitude doit être inférieure à 180." })
	poiLongitude!: number;

	@Field()
	@IsFQDN()
	externalLink: string;

	@Field(() => ID)
	@IsNumber()
	poiCity: City;

	@Field(() => ID)
	@IsNumber()
	poiCategory: Category;
}

@Resolver(Poi)
export default class PoiResolver {

	// On récupère tous les pois
	@Query(() => [Poi])
	async getAllPois() {
			return await Poi.find({
					relations: ["poiCategory", "poiCity"],
			});
	}

	// On récupère un poi en fonction de son id
	@Query(() => Poi)
	async getPoiById(@Arg("id") id: number) {
		const poi = await Poi.findOneOrFail({
			where: { poiId: id },
			relations: ["poiCity", "poiCategory"],
		});
		return poi;
	}

	// On récupère les pois en fonction d'une catégorie
	@Query(() => [Poi])
	async getPoisByCategory(@Arg("categoryId") categoryId: number): Promise<Poi[]> {
		return await Poi.find({
			where: {
				poiCategory: { categoryId }
			},

			relations: ["poiCategory", "poiCity"],
		})
	}

	// On récupère les pois en fonction d'une ville
	@Query(() => [Poi])
	async getPoisByCity(@Arg("cityId") cityId: number): Promise<Poi[]> {
		return await Poi.find({
			where: {
				poiCity: { cityId }
			},

			relations: ["poiCategory", "poiCity"],
		})
	}

	// On récupère les pois en fonction d'une ville et d'une catégorie
	@Query(() => [Poi])
	async getPoisByCityAndCategory(@Arg("cityId") cityId: number, @Arg("categoryId") categoryId: number): Promise<Poi[]> {
		return await Poi.find({
			where: {
				poiCity: { cityId },
				poiCategory: { categoryId }
			},

			relations: ["poiCategory", "poiCity"]
		})
	}

	// Créer un poi
	@Authorized("ADMIN_SITE", "ADMIN_CITY", "POI_CREATOR")
	@Mutation(() => ID)
	async createPoi(@Arg("data") data: PoiInput) {
		const poi = Poi.create({...data});
		await poi.save();
		return poi.poiId;
	}

	// Modifier un poi
	@Authorized("ADMIN_SITE", "ADMIN_CITY")
	@Mutation(() => ID)
	async updatePoi(@Arg("poiId") poiId: number, @Arg("data") data: PoiInput) {

		// Récupérer le Poi
		let poi = await Poi.findOneByOrFail({poiId});

		// Assigner les nouvelles valeurs au Poi
		poi = Object.assign(poi, data);
		
		// Enregistrer le Poi
		await poi.save();
		return poi.poiId;
	}

	// Supprimer un poi
	@Authorized("ADMIN_SITE", "ADMIN_CITY")
	@Mutation(() => ID)
	async deletePoi(@Arg("poiId") poiId: number) {
		await Poi.delete({ poiId });
		return poiId;
	}
}






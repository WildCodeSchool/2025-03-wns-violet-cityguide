import { InputType, Field, Resolver, Query, Mutation, ID, Arg, Args, Authorized } from "type-graphql";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

@InputType()
class PoiInput {
	@Field()
	poiName: string;
	
	@Field()
	poiDescription: string;

	@Field()
	imageUrl: string;

	@Field()
	address: string;

	@Field()
	// @IsNumber()
	// @Min(-90)
	// @Max(90)
	poiLatitude!: number;

	@Field()
	// @IsNumber()
	// @Min(-180)
	// @Max(180)
	poiLongitude!: number;

	@Field()
	externalLink: string;

	@Field(() => ID)
	poiCity: City;

	@Field(() => ID)
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






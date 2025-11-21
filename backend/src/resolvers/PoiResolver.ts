import { InputType, Field, Resolver, Query, Mutation, ID, Arg } from "type-graphql";
import { Poi } from "../entities/Poi";
import { User } from "../entities/User";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

@InputType()
class CreatePoiInput {
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
	cityId: City;

	@Field(() => [ID])
	poiCategory: Category[];		

}

@Resolver(Poi)
export default class PoiResolver {

    // On récupère tous les pois
    @Query(() => [Poi])
    async getAllPois() {
        return await Poi.find({
            relations: ["categoryPois"],
        });
    }

	// On récupère un poi en fonction de son id
	@Query(() => Poi)
	async getPoiById(@Arg("id") id: number) {
		const poi = await Poi.findOneByOrFail({poiId: id});
		return poi;
	}

	// On récupère les pois en fonction d'une catégorie 

	// On récupère les pois en fonction d'une ville

	// On récupère les pois en fonction d'une ville et d'une catégorie

	// On récupère l'id de la ville associée au POI via cityId


	// Créer un poi
	@Mutation(() => ID)
	async createPoi(@Arg("data") data: CreatePoiInput) {
		const poi = Poi.create({...data});
		await poi.save();
		return poi.poiId;
	}

	// Modifier un poi

	// Supprimer un poi

	
}






import {
		Arg,
		Field,
		Ctx,
		ID,
		InputType,
		Mutation,
		Query,
		Resolver,
		Authorized,
		Args,
} from "type-graphql";

import { City } from "../entities/City";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";

// Lors de la création d'une ville il est impératif de fourni son nom, sa description, une image et l'utilisateur qui la crée
@InputType()
class CreateCityInput {
		@Field()
		cityName: string;

		@Field()
		description: string;
		
		@Field()
		imageUrl: string;

		// @Field(() => ID) 
		// createdBy: User;

		@Field()
		// @IsNumber()
		// @Min(-90)
		// @Max(90)
		cityLatitude!: number;

		@Field()
		// @IsNumber()
		// @Min(-180)
		// @Max(180)
		cityLongitude!: number;
}

// Lors de la modification de la ville, on NE doit PAS modifier l'utilisateur créateur de la ville
@InputType()
class UpdateCityInput {
		@Field()
		description: string;

		@Field()
		imageUrl: string;
}

@Resolver(City)
export default class CityResolver {

		// Utilisateur (tous) => peut consulter les villes 
		// Administrateur ville => peut ajouter des points d'intêret à une ville
		// Adminstrateur site => peut ajouter/modifier ville

		// Récupérer toutes les villes en base
		@Query(() => [City])
		async getAllCities() {
				return await City.find();
		}

		// Récupérer une ville à partir de son id
		@Query(() => City) 
		async getCityById(@Arg("id") id: number) {
				const city = await City.findOneByOrFail({cityId: id});
				return city;
		}

		// Créer une ville
		@Mutation(() => ID)
		async createCity(@Arg("data") data: CreateCityInput) {
				const city = City.create({ ...data });
				await city.save();
				return city.cityId;
		}

		// @Authorized("ADMIN") TODO décommenter @Authorized("ADMIN") lorsque ce sera testable
		// Modifier une ville
		@Mutation(() => ID)
		async updateCity(@Arg("cityId") cityId: number, @Arg("data") data: UpdateCityInput) {

				// Récupérer la ville à partir de l'id fourni
				let city = await City.findOneByOrFail({cityId});

				// Assigner les nouvelles données à la ville trouvée en base
				city = Object.assign(city, data);

				// Sauvegarder les modifications
				await city.save();
				return city.cityId;
		}

		// Supprimer une ville
		// @Authorized("ADMIN") TODO décommenter @Authorized("ADMIN") lorsque ce sera testable
		@Mutation(() => ID)
		async deleteCity(@Arg("cityId") cityId: number) {
				await City.delete({ cityId });
				return cityId;
		}
}
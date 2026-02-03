// Librairies
import {
	Arg,
	Field,
	ID,
	InputType,
	Mutation,
	Query,
	Resolver,
	Authorized,
} from "type-graphql";

import { 
	IsNumber, 
	IsString, 
	Max, 
	MaxLength, 
	Min, 
	MinLength
} from "class-validator";

// Entités
import { City } from "../entities/City";

// Lors de la création d'une ville il est impératif de fourni son nom, sa description, une image et l'utilisateur qui la crée
@InputType()
class CreateCityInput {
	@Field()
	@IsString({ message: "Le nom de la ville doit être un texte." })
	@MinLength(2, { message: "Le nom de la ville doit comporter au moins 2 caractères." })
	cityName!: string;

	@Field()
	@IsString({ message: "La description de la ville doit être un texte." })
	@MinLength(10, { message: "La descritpion de la ville doit compter au moins 10 caractères." })
	@MaxLength(80, { message: "La descritpion de la ville doit compter au maximum 80 caractères." })
	description!: string;
	
	@Field()
	@IsString()
	imageUrl: string;

	@Field()
	@IsNumber()
	@Min(-90, { message: "La latitude doit être supérieure à -90." })
	@Max(90, { message: "La longitude doit être inférieure à 90." })
	cityLatitude!: number;
	
	@Field()
	@IsNumber()
	@Min(-180, { message: "La latitude doit être supérieure à -180." })
	@Max(180, { message: "La longitude doit être inférieure à 180." })
	cityLongitude!: number;

	// @Field(() => ID) 
	// createdBy: User;
}

// Lors de la modification de la ville, on NE doit PAS modifier l'utilisateur créateur de la ville
@InputType()
class UpdateCityInput {
	@Field()
	@IsString({ message: "La description de la ville doit être un texte." })
	@MinLength(10, { message: "La descritpion de la ville doit compter au moins 10 caractères." })
	description: string;
	
	@Field()
	@IsString()
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
			return await City.find({
				relations: ["cityPois"],
			});
	}

	// Récupérer une ville à partir de son id
	@Query(() => City) 
	async getCityById(@Arg("cityId") cityId: number) {
		return await City.findOneOrFail({
			where: { cityId: cityId },
			relations: ["cityPois"],
		})
	}

	// Créer une ville
	@Authorized("ADMIN_SITE", "ADMIN_CITY")
	@Mutation(() => ID)
	async createCity(@Arg("data") data: CreateCityInput) {
			const city = City.create({ ...data });
			await city.save();
			return city.cityId;
	}

	// Modifier une ville
	@Authorized("ADMIN_SITE", "ADMIN_CITY")
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
	@Authorized("ADMIN_SITE")
	@Mutation(() => ID)
	async deleteCity(@Arg("cityId") cityId: number) {
			await City.delete({ cityId });
			return cityId;
	}
}
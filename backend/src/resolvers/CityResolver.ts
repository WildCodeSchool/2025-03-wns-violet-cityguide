import {
    Arg,
    Field,
    Ctx,
    ID,
    InputType,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { City } from "../entities/City";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";
import { Rate } from "../entities/Rate";

@InputType()
class CityInput {
    @Field()
    cityName: string;

    @Field()
    description: string;
    
    @Field()
    imageUrl: string;
    
    // @Field(() => [ID])
    // cityPois: Poi[];

    // @Field(() => [ID])
    // cityRate: Rate[];

    // @Field(() => ID) 
    // createdBy: User;

    // @Field()
    // createdAt: Date;

    // @Field()
    // updatedAt: Date;
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

    // Créer une ville
    @Mutation(() => ID)
    async createCity(@Arg("data") data: CityInput) {
        const city = City.create({ ...data });
        await city.save();
        return city.cityId;
    }

    // Modifier une ville
    @Mutation(() => ID)
    async updateCity(@Arg("cityId") cityId: number, @Arg("data") data: CityInput) {

        // Récupérer la ville à partir de l'id fourni
        let city = await City.findOneByOrFail({cityId});

        // Assigner les nouvelles données à la ville trouvée en base
        city = Object.assign(city, data);

        // Sauvegarder les modifications
        await city.save();
        return city.cityId;
    }

    // Supprimer une ville
    @Mutation(() => ID)
    async deleteCity(@Arg("cityId") cityId: number) {
        await City.delete({ cityId });
        return cityId;
    }
}
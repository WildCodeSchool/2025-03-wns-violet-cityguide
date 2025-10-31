import { 
  Arg,
  Field,
  InputType,
  ID,
  Resolver,
  Query,
  Mutation
} from "type-graphql";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { Rate } from "../entities/Rate";


@InputType()
class CreateCityRateInput {
  @Field()
  rate: number;

  @Field(() => ID)
  rateCity: City;

  @Field(() => ID)
  rateUser: User;
}

@InputType()
class CreatePoiRateInput {
  @Field()
  rate: number;

  @Field(() => ID)
  ratePoi: Poi;

  @Field(() => ID)
  rateUser: User;
}

@Resolver(Rate)
export default class RateResolver {

  // Récupérer les notes liées à une ville
  @Query(() => [Rate])
  async getRatesByCity(@Arg("cityId") cityId: number): Promise<Rate[]> {
    return await Rate.findBy({
      rateCity: cityId
    });
  }

  // Récupérer les notes liées à un POI
  // Récupérer les notes déposées par un utilisateur
  // Créer une note pour une ville
  @Mutation(() => ID)
  async createCityRate(@Arg("data") data: CreateCityRateInput) {
    const rate = Rate.create({...data});
    await rate.save();
    return rate.rateId;
  }

  // Créer une note pour un POI
  @Mutation(() => ID)
  async createPoiRate(@Arg("data") data: CreatePoiRateInput) {
    const rate = Rate.create({...data});
    await rate.save();
    return rate.rateId;
  }

  // Supprimer une note
}
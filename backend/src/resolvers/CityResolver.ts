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
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Context } from "../types/Context";
import {City} from "../entities/City";

@InputType()
class CityInput {
    @Field()
    cityName: string;

    @Field()
    country: string;

    @Field()
    description: string;
    
    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field({ nullable: true })
    deletedAt?: Date;

    @Field()
    imageUrl: string;
    
    @Field()
    pois: any[];

}

@InputType()
class PoiInput {
    @Field()
    id: number

    @Field()
    poi: object
}


// type PublicProfile = {
//     email: string;
//     // name: string;
//     // avatar: string;
//     roles: Role[];
// }

@Resolver(City)
export default class CityResolver {

    // Utilisateur (tous) => peut consulter les villes 
    // Administrateur ville => peut ajouter des points d'intêret à une ville
    // Adminstrateur site => peut ajouter/modifier ville


    @Query(() => City)
    async getAllUsers() {
        // return await CityInput.find();
    }

    @Mutation(() => ID)
    async addPoi(@Arg("data") data : PoiInput, @Ctx('ctx') ctx: Context ) {
        // const associatedPoi = await Poi.find(poi {id : Poi.id})
        // if (associatedPoi) return 
    }

    
    // @Mutation(() => String)
    // async signup(@Arg("data") data: NewUserInput, @Ctx('ctx') ctx: Context) {
    //     const hashedPassword = await argon2.hash(data.password);
    //     const user = User.create({...data, hashedPassword});
    //     await user.save();

    //     const payload = createUserToken(user);

    //     const token = createJwt(payload)

    //     setCookie(ctx, token);

    //     const publicProfile = {
    //         email: user.email,
    //         // name: user.name,
    //         // avatar: user.avatar,
    //         roles: user.roles,

    //     }

    //     return JSON.stringify(publicProfile);
    // }

    // @Mutation(() => ID)
    // async login(@Arg("data") data: UserInput, @Ctx('ctx') ctx: Context) {
    //     const user = await User.findOneOrFail({where: {email: data.email}});
    //     const isValid = await argon2.verify(user.hashedPassword, data.password);
    //     if (!isValid) throw new Error("Invalid password");

    //     const payload = createUserToken(user);

    //     const token = createJwt(payload)

    //     setCookie(ctx, token);

    //     return token;
    // }

    // @Mutation(() => ID)
    // async logout(@Ctx('ctx') ctx: Context) {
    //     setCookie(ctx, "");
    //     return "See you next time";
    // }

    // @Authorized("ADMIN")
}
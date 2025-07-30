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
import User from "../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import {Context, UserToken} from "../types/Context";

@InputType()
class NewUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
class UserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

function setCookie(ctx: Context, token: string) {
    // mon context contient le req et le res, je set le cookie dans mon header
    // secure 🔐 Protège contre attaque sur HTTP
    // HttpOnly 🔐 Protège contre XSS
    // SameSite=Strict 🔐 Protège contre le CSRF
    // expires 🔐 Permet de définir une date d'expiration, ici 24h en ms
    ctx.res.setHeader(
        "Set-Cookie",
        `cityGuide-auth=${token};secure;HttpOnly;SameSite=Strict;expires=${new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()};`
    );
}

function createJwt(payload: string | object | Buffer) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});
    return token;
}

function createUserToken(user: User) {
    const profile: UserToken = {
        id: user.id,
    };
    return profile;
}

@Resolver(User)
export default class UserResolver {

    @Query(() => [User])
    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    @Mutation(() => ID)
    async signup(@Arg("data") data: NewUserInput, @Ctx('ctx') ctx: Context) {
        const hashedPassword = await argon2.hash(data.password);
        const user = User.create({...data, hashedPassword});
        await user.save();

        const payload = createUserToken(user);

        const token = createJwt(payload)

        setCookie(ctx, token);

        return token;
    }

    @Mutation(() => ID)
    async login(@Arg("data") data: UserInput, @Ctx('ctx') ctx: Context) {
        const user = await User.findOneOrFail({where: {email: data.email}});
        const isValid = await argon2.verify(user.hashedPassword, data.password);
        if (!isValid) throw new Error("Invalid password");

        const payload = createUserToken(user);

        const token = createJwt(payload)

        setCookie(ctx, token);

        return token;
    }

    @Mutation(() => ID)
    async logout(@Ctx('ctx') ctx: Context) {
        setCookie(ctx, "");
        return "Done";
    }
}
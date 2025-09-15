import {
  Arg,
  Field,
  Ctx,
  ID, // Alias spécifique à Apollo server qui indique que le retour typé par ID sera une string ou un number
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {User, Role } from "../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Context, UserToken } from "../types/Context";

// Déclaration des types utilisés dans ce Resolver
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

// type PublicProfile = {
//     email: string;
//     // name: string;
//     // avatar: string;
//     roles: Role[];
// }

// Déclaration des fonctions qui seront uttilisées dans les Query et/ou Mutation de ce Resolver
function setCookie(ctx: Context, token: string) {
  // mon context contient le req et le res, je set le cookie dans mon header
  // secure 🔐 Protège contre attaque sur HTTP
  // HttpOnly 🔐 Protège contre XSS
  // SameSite=Strict 🔐 Protège contre le CSRF
  // expires 🔐 Permet de définir une date d'expiration, ici 24h en ms
  ctx.res.setHeader(
    "Set-Cookie",
    `cityGuide-auth=${token};secure;HttpOnly;SameSite=Strict;expires=${new Date(
      Date.now() + 1000 * 60 * 60 * 24
    ).toUTCString()};`
  );
}

function createJwt(payload: UserToken) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

function createUserToken(user: User): UserToken {
  const profile: UserToken = {
    id: user.id,
    roles: user.roles,
  };
  return profile;
}

// Grâce au décorateur @Resolver on indique à Apollo serveur et graphql qu'on entre dans le Resolver à proprement parler
@Resolver(User)
export default class UserResolver {
  // ## QUERY GET ALL USERS ##
  // Le décorateur @Query permet d'indiquer à graphql et Apollo server que nous allons demander à récupérer des informations
  // (() => [User]) => type le retour de la query : en l'occurrence unn tableau d'éléments de type User
  @Query(() => [User])

  // Déclaration de la fonction asynchrone qui permet de récupérer les utilisateurs et de donner le nom "getAllUsers" à la Query utilisée via Apollo server
  async getAllUsers() {
    return await User.find();
  }

  // ## MUTATION SIGNUP ##
  // Le décorateur @Mutation permet d'inndiquer à graphql et Apolle Server que nous allons demander des actions sur les données
  // create, update et delete ou d'autres types d'actions ex: vérification de la validité des données pour un login
  @Mutation(() => String)

  // Dans la fonction asynchrone signup, on spécifie :
  // @Arg("data") => décorateur graphql/apollo pour indiquer le nom de l'objet qui contiendra les données nécessaire à la mutation
  // Le type d'arguments : ici data doit être de type NewUserInput
  // @Ctx() => décorateur graphql/apollo pour indiquer qu'on va stocker des informations dans un context
  // Un contexte étant une sortte de panier contenant des informations rendues accessibles à tout le backend
  async signup(@Arg("data") data: NewUserInput, @Ctx() ctx: Context) {
    // On utilise argon2 pour hasher le password fourni : c'est celui-ci qui sera stocké en base
    const hashedPassword = await argon2.hash(data.password);
    const user = User.create({ ...data, hashedPassword });
    await user.save();

    const payload = createUserToken(user);

    const token = createJwt(payload);

    setCookie(ctx, token);

    const publicProfile = {
      email: user.email,
      // name: user.name,
      // avatar: user.avatar,
      roles: user.roles,
    };

    return JSON.stringify(publicProfile);
  }

  // ## MUTATION LOGIN ##
  @Mutation(() => String)
  async login(@Arg("data") data: UserInput, @Ctx() ctx: Context) {
    // Récupération de l'utilisateur à partir de son email (qui est son identifiant de connexion et est unique dans la db)
    const user = await User.findOneOrFail({ where: { email: data.email } });

    // Argon2 permet de vérifier si le password fourni une fois hashé correspond au password hashé stocké en db
    const isValid = await argon2.verify(user.hashedPassword, data.password);
    if (!isValid) throw new Error("Invalid password");

    const payload = createUserToken(user);

    const token = createJwt(payload);

    setCookie(ctx, token);

    return token;
  }

  // ## MUTATION LOGOUT ##
  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    setCookie(ctx, "");
    return "See you next time";
  }

  // @Authorized("ADMIN")
}

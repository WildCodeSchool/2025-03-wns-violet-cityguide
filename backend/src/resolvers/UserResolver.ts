import {
	Arg,
	Field,
	Ctx,
	ID, 
	InputType,
	Mutation,
	Query,
	Resolver,
	ObjectType,
	Authorized,
} from "type-graphql";
import { User, Role } from "../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Context, UserToken } from "../types/Context";
import { UserInfo } from "../entities/UserInfo";

// Input de création d'un nouvel utilisateur
@InputType()
class NewUserInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

// Input de "sélection" d'un nouvel utilisateur (pour le login)
@InputType()
class UserInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

// Input de retour attendu pour les mutations (signup, login, logout)
@ObjectType()
class UserResponse {
	@Field(() => String)
	token: string;
	
	@Field(() => User, { nullable: true })
	user?: User;
	
	@Field(() => String, { nullable: true })
	message?: string;
}

// Input pour les modifications du role d'un utilisateur
@InputType()
class UpdateUserRoleInput {
	@Field(() => [Role])
	roles: Role[];
}

@InputType()
class UpdateUserDataInput {
	@Field()
	email: string;
	// TODO voir pour le mot de passe dans un second temps
}

/* Création d'un cookie qui sera stocké dans le header de la réponse reçue et qui va rester stocké dans le navigateur
Le cookie possède une date d'expiration (expires=XXX) : après l'expiration du cookie l'utilisateur sera obligé de se re-connecter pour accéder à l'application */
function setCookie(ctx: Context, token: string) {
	ctx.res.setHeader(
		"Set-Cookie",
		`cityGuide-auth=${token};secure;HttpOnly;SameSite=Strict;expires=${new Date(
			Date.now() + 1000 * 60 * 60 * 24
		).toUTCString()};`
	);
}

// Définition d'une focntion pour la création d'un JWT (JSon Web Token)
function createJwt(payload: UserToken) {

	// JWT_SECRET est défini dans le .env && process.env.JWT_SECRET est fourni par NodeJS
	const JWT_SECRET = process.env.JWT_SECRET;

	// Si JWT_SECRET n'est pas défini dans le .env -> envoi d'une erreur
	if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");

	// Crée le token à partir des informations fournies (pour notre cas, un email et un password), du JWT_SECRET et ajout d'une durée d'expiration
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// Crée un élément de type UserToken qui sera utilisé pour fournir les payloads dans les mutations signup et login
function createUserPayload(user: User): UserToken {
	const profile: UserToken = {
		id: user.userId,
		firstname: user.userInfo?.firstName as string,
		roles: user.roles,
	};
	return profile;
}

@Resolver(User)
export default class UserResolver {

	// Récupérer tous les utilisateurs
	@Query(() => [User])
	async getAllUsers() {
		return await User.find({
			relations: ["userInfo"],
		});
	}

	// Récupère un utilisateur à partir de son id
	@Query(() => User, { nullable: true })
	async getUserById(@Arg("userId", () => ID) userId: number) {
		return await User.findOne({
			where: { userId },
			relations: ["userInfo"]
		});
	}

	// Enregistre un nouvel utilisateur
	@Mutation(() => UserResponse)
	async signup(@Arg("data") data: NewUserInput, @Ctx() ctx: Context) {

		// Vérification de la validité du champ email (on considère que si un "@" présent, l'utilisateur a bien fourni un email)
		if (!data.email.includes('@')) throw new Error("Invalid email format");

		// Vérification que la longueur du password fourni par l'utilisateur est suffisamment longue
		if (data.password.length < 7) throw new Error("Password must be at least 7 characters");

		// On vérifie si l'utilisateur n'existe pas déjà en base (l'email est un identifiant unique)
		const existingUser = await User.findOne({ where: { email: data.email } });

		// Si l'utilisateur existe déjà, envoi d'une erreur et arrêt du processus
		if (existingUser) throw new Error("Email already in use");
		
		// Hashage du password (la librairie argon2 fourni la fonction de hash)
		const hashedPassword = await argon2.hash(data.password);

		// Création de l'utilisateur
		const user = User.create({ ...data, hashedPassword });

		// Enregistrement du nouvel utilisateur
		await user.save();
		
		/* Les utilisateurs ont la possibilité de fournir d'autres informations les concernant ultérieurement
		Toutefois, on crée ces informations avec des valeurs par défaut pour qu'elles soient associées avec le nouvel utilisateur */
		const userInfo = UserInfo.create({
			firstName: "",
			lastName: "",
			avatarUrl: "https://example.com/default-avatar.png",
			user: user
		});
		await userInfo.save();

		// Ajouter le userInfo qu'on vient de créer à l'utilisateur qu'on vient de créer
		user.userInfo = userInfo;
		user.save();

		// Fabrication du payload
		const payload = createUserPayload(user);

		// utilisation du payload pour la fabrication du token
		const token = createJwt(payload);

		// Fabrication du cookie et ajout de celui-ci dans le navigateur
		setCookie(ctx, token);

		return {
			token,
			user,
			message: "User created successfully"
		};
	}

	// Permet à un utilisateur de se connecter
	@Mutation(() => UserResponse)
	async login(@Arg("data") data: UserInput, @Ctx() ctx: Context) {

		// Rechercher en base un utilisateur avec le mail fourni
		try {
			const user = await User.findOneOrFail({ 
				where: { email: data.email },
				relations: ["userInfo"]
			});

			// Vérifier si le mot de passe fourni hashé et mot de passe hashé en base sont identiques
			const isValid = await argon2.verify(user.hashedPassword, data.password);

			// Si la vérification du mot de passe échoue, envoie d'une erreur et arrêt du processus
			if (!isValid) throw new Error("Invalid password");

			// Fabrication du payload puis du token à partir de celui-ci.
			const payload = createUserPayload(user);
			const token = createJwt(payload);

			// Création et ajout du cookie dans le navigateur
			setCookie(ctx, token);

			// L'utilisateur est connecté
			return {
				token,
				user,
				message: "Login successful"
			};
		} catch (error) {
			return {
				token: "",
				message: error instanceof Error ? error.message : "Invalid credentials"
			};
		}
	}

	// Déconnexion de l'utilisateur
	@Mutation(() => UserResponse)
	async logout(@Ctx() ctx: Context) {

		// Fabrication d'un cookie vide et stockage de celui-ci dans le navigateur : l'utilisateur n'est plus connecté
		setCookie(ctx, "");
		return {
			token: "",
			message: "Logged out successfully"
		};
	}

	// Modification du role d'un utilisateur (Prévoir de rendre possible à l'utilisateur de modifier son mot de passe)
	@Authorized("ADMIN_SITE")
	@Mutation(() => ID)
	async updateUserRole(@Arg("userId") userId: number, @Arg("data") data: UpdateUserRoleInput) {

		// Récupérer l'utilisateur à modifier
		let user = await User.findOneByOrFail({ userId });

		// Assigner les nouvelles données à l'utilisateur
		user = Object.assign(user, data);

		// Enregistrer l'utilisateur modifié
		await user.save();
		return user.userId;
	}

	// Modification du mail d'un utilisateur
	@Authorized("ADMIN_SITE", "USER")
		@Mutation(() => ID)
	async updateUserData(
		@Arg("userId") userId: number, 
		@Arg("data") data: UpdateUserDataInput,
		@Ctx() ctx: Context) {

		// Récupérer l'utilisateur à modifier
		let user = await User.findOneByOrFail({ userId });

		// Récupération de l'utilisateur connecté
		const currentUser = ctx.user;

		// Est-ce que l'utilisateur connecté est ADMIN_SITE
		const isAdmin = currentUser?.roles.includes("ADMIN_SITE");

		// Est-ce que l'utilisateur connecté est "lui-même" (aka l'id de l'utilisateur connecté correspond-il à l'id de l'utilisateur à modifier)
		const isSelf = currentUser?.id === userId;

		// Si l'utilisateur n'est ni administrateur site ni "lui-même"
		if (!isAdmin && !isSelf) {
			throw new Error ("Vous n'êtes pas autorisé à faire cette modification");
		}

		// Assigner les nouvelles données à l'utilisateur
		user = Object.assign(user, data);

		// Enregistrer l'utilisateur modifié
		await user.save();
		return user.userId;
	}

	// Suppression d'un utilisateur
	@Authorized("ADMIN_SITE")
	@Mutation(() => ID)
	async deleteUser(@Arg("userId") userId: number) {
		await User.delete({ userId });
		return userId;
	}
}
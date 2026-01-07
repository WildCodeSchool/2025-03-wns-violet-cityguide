import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import * as jwt from "jsonwebtoken";
import {UserToken} from "./types/Context";
import { Role } from "./entities/User";
import UserResolver from "./resolvers/UserResolver";
import CityResolver from "./resolvers/CityResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import PoiResolver from "./resolvers/PoiResolver";
import UserInfoResolver from "./resolvers/UserInfoResolver";
import { seedDatabase } from "./config/seed";

const port = 3000;

async function startServer() {

	// Initialisation de la connexion à la DB
	await dataSource.initialize();

	// Seed de la base de données en développement
	if (process.env.NODE_ENV !== 'production') {
		try {
			console.log('🌱 Seeding database in development mode...');
			await seedDatabase(dataSource);
		} catch (error) {
			console.error('❌ Seeding failed:', error);
			// Ne pas stopper le serveur si le seeding échoue
		}
	}

	// Construction du schema à partir des Resolvers (permet à QraphQL d'utiliser les requêtes écrites dans els resolvers pour manipuler les données)
	const schema = await buildSchema({

		// Resolvers ajoutés au schema
		resolvers: [
			UserResolver,
			CityResolver, 
			CategoryResolver, 
			PoiResolver,
			UserInfoResolver,
		],

		// Permet d'utiliser les outils de validation de class-validator
		validate: true,

		authChecker: ({context: { user } }, neededRoles: Role[]) => {

			// si pas authentifié, on retourne false
			if (!user) return false;

			// si neededRoles est vide, on retourne true
			if (!neededRoles.length) return true;

			// si user a ADMIN_SITE, on retourne true
			if (user.roles.includes(Role.ADMIN_SITE)) return true;

			// si user a au moins un role inclus dans neededRoles, on retourne true
			// sinon on retourne false
			return neededRoles.some((neededRole) => user.roles.includes(neededRole));
		}
	});

	// Création du serveur apollo à partir du schema
	const apolloServer = new ApolloServer({ schema });

	// Démarrage du serveur apollo
	const { url } = await startStandaloneServer(apolloServer, {
		listen: { port },
		context: async ({ req, res }) => {

			// Initialisation de user à null
			let user: string | jwt.JwtPayload | null = null;

			// Compare le cookie trouvé dans le header de la requête avec le format (cf regexp) que doivent avoir les cookie de notre appli
			const match = req.headers.cookie?.match(/cityGuide-auth=([^;]+)/);

			// Si match n'est pas null et que process.env.JWT_SECRET donne un résultat
			if (match && process.env.JWT_SECRET) {

				// Récupération du token dans le tableau match
				const token = match[1]

				/* verify verifie l'adéquation entre le token et le résultat de process.env.JWT_TOKEN.
				Verify renvoie une string si invalide, un payload si valide*/
				user = jwt.verify(token, process.env.JWT_SECRET);

				// Si user est une string, l'utilisateur est null
				if (typeof user === "string") user = null;
			}

			return { req, res, user: user as UserToken };
		},
	});
	console.info("Server started on " + url);
}
startServer();
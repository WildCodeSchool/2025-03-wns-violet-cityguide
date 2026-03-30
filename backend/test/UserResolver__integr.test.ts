// import { describe, it, expect, afterAll, beforeEach, beforeAll, afterEach } from "@jest/globals";
//
// // Import des entitées necessaires aux tests unitaires
// import { Poi } from "../src/entities/Poi";
// import { City } from "../src/entities/City";
// import { Category } from "../src/entities/Category";
// import { Role, User } from "../src/entities/User";
// import { UserInfo } from "../src/entities/UserInfo";
//
// // Import de DataSource de TypeORM pour la connexion à la base de données
// // Nécessaire afin d'isoler les tests de base de données sans affecter les données de prod
// import { DataSource } from "typeorm";
//
// // Import  des schéma GraphQL type pour la création des tests
// import { graphql, GraphQLSchema } from "graphql";
//
// // Import des schema type-graphql pour construire les type GraphQL des resolvers
// import { buildSchema } from "type-graphql";
//
// // Import du Resolver qui est testé
// import UserResolver from "../src/resolvers/UserResolver";
//
// // Import du jsonwebtoken pour tester la génération de celui-ci
// import * as jwt from "jsonwebtoken";
// import * as argon2 from "argon2";
// import { Context } from "../src/types/Context";
//
// let testDataSource: DataSource; // Connexion à la BDD
// let schema: GraphQLSchema; //Schema GraphQL utilisée lors de l'initialisation de la BDD
// let testUser: User; // Mock user pour les test d'authentification;
//
// function createMockContext(user?: {
// 	id: number,
// 	firstname : string,
// 	roles: Role[]
// }) {
// 	return {
// 		res: { setHeader: jest.fn() } as any,
// 		req: {} as any,
// 		user:user
// 	};
// }
// const mockCtx = createMockContext();
// const sysadminCtx = createMockContext({
// 	id: 1,
// 	firstname: 'sysadmin',
// 	roles: [Role.ADMIN_SITE]
// })
// const cityAdminCtx = createMockContext({
// 	id: 2,
// 	firstname: 'célemairedelaville',
// 	roles: [Role.ADMIN_CITY]
// })
// const poiCreatorCtx = createMockContext({
// 	id: 3,
// 	firstname: 'victor_the_creator_of_poi',
// 	roles: [Role.POI_CREATOR]
// })
// const userLambdaCtx = createMockContext({
// 	id: 4,
// 	firstname: 'user_lambda',
// 	roles: [Role.USER]
// })
//
// describe("User Resolver test", () => {
//
// 	// Se lance avant tous les test pour initialiser l'environnement
// 	beforeAll(async () => {
//
// 		// Genère une clé de génération jwt-token
// 		process.env.JWT_SECRET = "test-secret-key-for-jwt-generation";
//
// 		testDataSource = new DataSource({
// 			type: "postgres",
// 			database: ":memory:",
// 			synchronize: true,
// 			entities: [User, UserInfo, Poi, City, Category],
// 			logging: false,
// 		});
//
// 		await testDataSource.initialize();
//
// 		schema = await buildSchema({
// 			resolvers: [UserResolver],
// 			authChecker: ({ context }, roles) => {
// 				// If no roles required, allow access
// 				if (!roles || roles.length === 0) return true;
//
// 				// If no user in context, deny access
// 				if (!context.user) return false;
//
// 				// Check if user has any of the required roles
// 				return roles.some((role: Role) => context.user.roles.includes(role));
// 			}
// 		});
// 	});
//
// 	beforeEach(async () => {
//
// 		const hashedPassword = await argon2.hash('hashedPassword123')
//
// 		// Utilisateur sys admin
// 		const adminUser = User.create({
// 			userId: 1,
// 			email: "admin@example.com",
// 			roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
// 			hashedPassword: hashedPassword,
// 		});
// 		await adminUser.save();
//
// 		// Admin de ville
// 		const cityUser = User.create({
// 			userId: 2,
// 			email: "city-user@example.com",
// 			roles: [Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
// 			hashedPassword: hashedPassword,
// 		});
// 		await cityUser.save();
//
// 		// POI creator
// 		const poiCreator = User.create({
// 			userId: 3,
// 			email: "poi-creator@example.com",
// 			roles: [Role.POI_CREATOR, Role.USER],
// 			hashedPassword: hashedPassword,
// 		});
// 		await poiCreator.save();
//
// 		// Simple utilisateur
// 		testUser = User.create({
// 			userId: 4,
// 			email: "simple-user@example.com",
// 			roles: [Role.USER],
// 			hashedPassword: hashedPassword,
// 		});
// 		await testUser.save();
// 	});
//
// 	afterEach(async () => {
// 		//Nettoie la base de données après chaque test
// 		if (testDataSource.isInitialized) {
// 			// Laissez impérativement dans cette ordre pour éviter les contraintes des clés étrangères
// 			await testDataSource.getRepository(User).clear();
// 			await testDataSource.getRepository(UserInfo).clear();
// 		}
// 	});
//
// 	afterAll(async () => {
// 		// Destruit la connexion une fois tous les tests termées
// 		if (testDataSource.isInitialized) {
// 			await testDataSource.destroy();
// 		}
// 	});
//
//
// 	describe("User sign in, login, logout", () => {
// 		it("Signin, then login, then logout", async () => {
// 			const userResolver = new UserResolver();
//
// 			// Nouvelle utilisateur s'enregistre
// 			const newUser = {
// 				email: "new@user-test.com",
// 				password: "Password123"
// 			}
//
// 			const signedIn = await userResolver.signup(
// 				{ email: newUser.email, password: newUser.password },
// 				mockCtx)
//
// 			expect(signedIn).toBeDefined();
// 			expect(signedIn.message).toBe('User created successfully')
// 			expect(signedIn.token).not.toBe('');
//
// 			const allUsers = await User.find();
// 			expect(allUsers.length).toBe(5);
//
// 			// Nouvelle utilisateur se connecte
// 			const loggedIn = await userResolver.login(
// 				{ email: 'new@user-test.com', password: 'Password123' }, mockCtx
// 			)
//
// 			expect(loggedIn).toBeDefined();
// 			expect(loggedIn.message).toBe("Login successful");
// 			expect(loggedIn.token).not.toBe('');
// 			expect(loggedIn.user?.email).toBe('new@user-test.com');
//
// 			// Nouvelle utilisateur se déconnecte
// 			const loggedOut = await userResolver.logout(mockCtx);
// 			expect(loggedOut).toBeDefined();
// 			expect(loggedOut.token).toBe('');
//
// 			// L'admin site se connecte, attribut des rôles, modife des informations;
// 				// userId: 1,
// 				// email: "admin@example.com",
// 				// roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
// 				// hashedPassword: hashedPassword,
// 			const adminLogIn = await userResolver.login(
// 				{email: 'admin@example.com', password: 'hashedPassword123'}, sysadminCtx
// 			)
// 			expect(adminLogIn).toBeDefined();
// 			expect(adminLogIn.message).toBe("Login successful");
// 			expect(adminLogIn.token).not.toBe('');
// 			expect(adminLogIn.user?.email).toBe('admin@example.com');
//
// 			// L'admin modifie les roles du user nouvellement créer
// 			const changeRoleMutation = `
// 				mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
//   					updateUserRole(data: $data, userId: $userId)
// 				}`;
// 			const modifyRole = await graphql({
// 				schema,
// 				source: changeRoleMutation,
// 				variableValues: {
// 					userId: 5,
// 					data: {
// 						roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY]
// 					}
// 				},
// 				contextValue: sysadminCtx
// 			})
// 			expect(modifyRole).toBeDefined()
// 			const modifiedUser = await User.findOne({ where : { userId : 5}})
// 			expect(modifiedUser?.email).toBe('new@user-test.com')
// 			expect(modifiedUser?.roles).toContain(Role.USER)
// 			expect(modifiedUser?.roles).toContain(Role.POI_CREATOR)
//
// 			// L'admin site supprime cet utilisateurs
// 			const deleteUserMutation = `mutation Mutation($userId: Float!) {
// 					deleteUser(userId: $userId)
// 				}`;
//
// 			const deleteUser = await graphql({
// 				schema,
// 				source: deleteUserMutation,
// 				variableValues: {
// 					userId: 5
// 				},
// 				contextValue: sysadminCtx
// 			})
// 			expect(deleteUser.errors).toBeUndefined()
// 			const deletedUser = await User.findOne({ where: { userId: 5 } });
// 			expect(deletedUser).toBeNull();
//
// 			// L'utilisateur tente de se connecter,
//
// 			// L'admin tente de modifier les informations de l'utilisateur
//
// 		})
// 	})
// });
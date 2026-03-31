import "reflect-metadata";

// Import des entitées necessaires aux tests unitaires
import { Poi } from "../src/entities/Poi";
import { City } from "../src/entities/City";
import { Category } from "../src/entities/Category";
import { Role, User } from "../src/entities/User";
import { UserInfo } from "../src/entities/UserInfo";

// Import de DataSource de TypeORM pour la connexion à la base de données
// Nécessaire afin d'isoler les tests de base de données sans affecter les données de prod
import { DataSource } from "typeorm";

// Import  des schéma GraphQL type pour la création des tests
import { graphql, GraphQLSchema } from "graphql";

// Import des schema type-graphql pour construire les type GraphQL des resolvers 
import { buildSchema } from "type-graphql";

// Import du Resolver qui est testé
import UserResolver from "../src/resolvers/UserResolver";

// Import du jsonwebtoken pour tester la génération de celui-ci
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { Context } from "../src/types/Context";

// fichier env
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env.test"), });

let testDataSource: DataSource; // Connexion à la BDD
let schema: GraphQLSchema; //Schema GraphQL utilisée lors de l'initialisation de la BDD
let testUser: User; // Mock user pour les test d'authentification; 

function createMockContext(user?: {
	id: number,
	firstname: string,
	roles: Role[]
}) {
	return {
		res: { setHeader: jest.fn() } as any,
		req: {} as any,
		user: user
	};
}
const mockCtx = createMockContext();
const sysadminCtx = createMockContext({
	id: 1,
	firstname: 'sysadmin',
	roles: [Role.ADMIN_SITE]
})
const cityAdminCtx = createMockContext({
	id: 2,
	firstname: 'célemairedelaville',
	roles: [Role.ADMIN_CITY]
})
const poiCreatorCtx = createMockContext({
	id: 3,
	firstname: 'victor_the_creator_of_poi',
	roles: [Role.POI_CREATOR]
})
const userLambdaCtx = createMockContext({
	id: 4,
	firstname: 'user_lambda',
	roles: [Role.USER]
})

describe("User Resolver test", () => {

	// Se lance avant tous les test pour initialiser l'environnement
	beforeAll(async () => {

		// Genère une clé de génération jwt-token
		process.env.JWT_SECRET = "test-secret-key-for-jwt-generation";

		testDataSource = new DataSource({
			type: "postgres",
			host: process.env.TEST_DB_HOST || "127.0.0.1",
			port: Number(process.env.TEST_DB_PORT || 5432),
			username: process.env.TEST_DB_USER || "toto",
			password: process.env.TEST_DB_PASSWORD || "toto",
			database: process.env.TEST_DB_NAME || "city_guide_test",
			synchronize: true,
			dropSchema: true,
			entities: [User, UserInfo, Poi, City, Category],
			logging: false,
		});

		await testDataSource.initialize();

		schema = await buildSchema({
			resolvers: [UserResolver],
			authChecker: ({ context }, roles) => {
				// If no roles required, allow access
				if (!roles || roles.length === 0) return true;

				// If no user in context, deny access
				if (!context.user) return false;

				// Check if user has any of the required roles
				return roles.some((role: Role) => context.user.roles.includes(role));
			}
		});
	});

	beforeEach(async () => {

		const hashedPassword = await argon2.hash('hashedPassword123')

		// Utilisateur sys admin
		const adminUser = User.create({
			userId: 1,
			email: "admin@example.com",
			roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await adminUser.save();

		// Admin de ville
		const cityUser = User.create({
			userId: 2,
			email: "city-user@example.com",
			roles: [Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await cityUser.save();

		// POI creator 
		const poiCreator = User.create({
			userId: 3,
			email: "poi-creator@example.com",
			roles: [Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await poiCreator.save();

		// Simple utilisateur
		testUser = User.create({
			userId: 4,
			email: "simple-user@example.com",
			roles: [Role.USER],
			hashedPassword: hashedPassword,
		});
		await testUser.save();
	});

	afterEach(async () => {
		//Nettoie la base de données après chaque test
		if (testDataSource.isInitialized) {
			// Laissez impérativement dans cette ordre pour éviter les contraintes des clés étrangères
			await testDataSource.getRepository(User).clear();
			await testDataSource.getRepository(UserInfo).clear();
		}
	});

	afterAll(async () => {
		// Destruit la connexion une fois tous les tests termées
		if (testDataSource.isInitialized) {
			await testDataSource.destroy();
		}
	});

	describe("User resolver Queries", () => {

		it("getAllUsers : return tous les Users avec leur informations", async () => {
			const userResolver = new UserResolver();

			const result = await userResolver.getAllUsers();

			expect(result).toBeDefined();
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(4);

			expect(result[0].email).toBe("admin@example.com");
			expect(result[1].email).toBe("city-user@example.com");
			expect(result[2].email).toBe("poi-creator@example.com");
			expect(result[3].email).toBe("simple-user@example.com");

			expect(result[0].roles).toContain(Role.ADMIN_SITE);
			expect(result[3].roles).toEqual([Role.USER]);

			expect(result[0])
		});

		it('getAllUsersById : return un utilisateur à partir de son id (valid)', async () => {
			const userResolver = new UserResolver();

			const result = await userResolver.getUserById(2);

			expect(result).toBeDefined();
			expect(result?.email).toBe('city-user@example.com');
			expect(result?.roles).toEqual([Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER]);
		});

		it('getAllUsersById : return un utilisateur à partir de son id (invalid)', async () => {
			const userResolver = new UserResolver();

			const result = await userResolver.getUserById(5);

			expect(result).toBe(null);
		})
	});

	describe("Signup Mutation", () => {

		it('User entre des informations correctes : signup = success', async () => {
			const userResolver = new UserResolver();

			const newUser = {
				email: "jean@michel.com",
				password: 'abcDEF123',
			}

			const result = await userResolver.signup(
				{ email: newUser.email, password: newUser.password },
				mockCtx
			);

			expect(result).toBeDefined();
			expect(result.token).toBeDefined();
			expect(result.token).not.toBe("");
			expect(result.user).toBeDefined();
			expect(result.user?.email).toBe("jean@michel.com");
			expect(result.user?.roles).toContain(Role.USER);
			expect(result.user.hashedPassword).not.toBe('abcDEF123');
			expect(result.message).toBe("User created successfully");

			expect(mockCtx.res.setHeader).toHaveBeenCalledWith(
				"Set-Cookie",
				expect.stringContaining("cityGuide-auth=")
			);

			const checkUserHasBeenCreated = await userResolver.getUserById(5)
			expect(checkUserHasBeenCreated).toBeDefined();
			expect(checkUserHasBeenCreated?.email).toBe("jean@michel.com");
		});

		it('User entre des informations incorrectes (email sans @) : signup = fail', async () => {
			const userResolver = new UserResolver();

			const newUser = {
				email: "jeanmichel.com",
				password: 'abcDEF123',
			}

			await expect(
				userResolver.signup(
					{ email: newUser.email, password: newUser.password },
					mockCtx
				)
			).rejects.toThrow("Invalid email format");

			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();

			const allUsers = await User.find();
			expect(allUsers.length).toBe(4);
		});

		it('User entre des informations incorrectes (mot de passe incorrect) : signup = fail', async () => {
			const userResolver = new UserResolver();

			const newUser = {
				email: "invalid@password.com",
				password: 'abc123',
			}

			await expect(
				userResolver.signup(
					{ email: newUser.email, password: newUser.password },
					mockCtx
				)
			).rejects.toThrow("Password must be at least 7 characters");

			const allUsers = await User.find();
			expect(allUsers.length).toBe(4);
		});

		it('User entre des informations incorrectes (email déjà utilisé) : signup = fail', async () => {
			const userResolver = new UserResolver();

			const newUser = {
				email: "simple-user@example.com",
				password: 'abc123DEF',
			}

			await expect(
				userResolver.signup(
					{ email: newUser.email, password: newUser.password },
					mockCtx
				)
			).rejects.toThrow("Email already in use");

			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();

			const allUsers = await User.find();
			expect(allUsers.length).toBe(4);
		});
	});

	describe("Login Mutation", () => {
		it("User s'authentifie : info correct = success", async () => {
			const userResolver = new UserResolver();

			const authUser = {
				email: 'simple-user@example.com',
				password: 'hashedPassword123'
			}

			const result = await userResolver.login(
				{ email: authUser.email, password: authUser.password },
				mockCtx
			);

			expect(result).toBeDefined();
			expect(result.message).toContain('Login successful');
			expect(result.user?.email).toContain('simple-user@example.com');
			expect(result.token).not.toBe('');

		});

		it("User s'authentifie : info incorrectes (email) = fail", async () => {
			const userResolver = new UserResolver();

			const authUser = {
				email: 'simple-not-user@example.com',
				password: 'hashedPassword123'
			}

			const result = await userResolver.login(
				{ email: authUser.email, password: authUser.password },
				mockCtx
			);


			expect(result).toBeDefined();
			expect(result.message).not.toBe('Login successful');
			expect(result.token).toBe('');
		});

		it("User s'authentifie : info incorrectes (password) = fail", async () => {
			const userResolver = new UserResolver();

			const authUser = {
				email: 'simple-user@example.com',
				password: 'wrongPassword123'
			}

			const result = await userResolver.login(
				{ email: authUser.email, password: authUser.password },
				mockCtx
			);

			// Assert the error response
			expect(result.token).toBe("");
			expect(result.message).toBe("Invalid password");
			expect(result.user).toBeUndefined();

			// Verify NO cookie was set
			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();
		});
	});

	describe("Logout Mutation", () => {
		it("User se déconnecte de sa session = success", async () => {
			const userResolver = new UserResolver();

			const authUser = {
				email: 'simple-user@example.com',
				password: 'hashedPassword123',
			}

			const result = await userResolver.logout(mockCtx);

			expect(result).toBeDefined();
			expect(result.message).toBe('Logged out successfully')
			expect(result.token).toBe('');
		});

		it("User se déconnecte avec un contexte invalide (setHeader throws) = fail", async () => {
			const failingCtx = {
				res: {
					setHeader: jest.fn(() => {
						throw new Error("Headers already sent");
					})
				} as any,
				req: {} as any,
				user: {
					id: 4,
					firstname: 'test-user',
					roles: [Role.USER]
				}
			};

			const userResolver = new UserResolver();

			await expect(userResolver.logout(failingCtx)).rejects.toThrow('Logout failed');
		})
	});

	describe("UpdateUserEveryDetail Mutation", () => {
		it("ADMIN_SITE change des roles = success", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)


			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
        mutation UpdateUser($userId: Float!, $data: UpdateUserEveryDetailsInput!) {
            updateUserEveryDetail(userId: $userId, data: $data) {
                userId
                email
                roles
            }
        }`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						userId: 4,
						email: "new-email@example.com",
						roles: [Role.USER, Role.POI_CREATOR]
					}
				},
				contextValue: sysadminCtx
			});

			expect(result.errors).toBeUndefined();
			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toContain("new-email@example.com");
		});

		it("ADMIN_CITY change des roles = success", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
        	mutation UpdateUser($userId: Float!, $data: UpdateUserEveryDetailsInput!) {
				updateUserEveryDetail(userId: $userId, data: $data) {
					userId
					email
					roles
				}
       		 }`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						userId: 4,
						email: "new-email@example.com",
						roles: [Role.USER, Role.POI_CREATOR]
					}
				},
				contextValue: cityAdminCtx
			});

			expect(result.errors).toBeUndefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("new-email@example.com");
			expect(modifiedUser?.roles).toContain(Role.POI_CREATOR)

		});

		it("Poi creator change des roles = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
        	mutation UpdateUser($userId: Float!, $data: UpdateUserEveryDetailsInput!) {
				updateUserEveryDetail(userId: $userId, data: $data) {
					userId
					email
					roles
				}
       		 }`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						userId: 4,
						email: "new-email@example.com",
						roles: [Role.USER, Role.POI_CREATOR]
					}
				},
				contextValue: poiCreatorCtx
			});

			expect(result.errors).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)
		});

		it("User (simple) change des roles = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
        	mutation UpdateUser($userId: Float!, $data: UpdateUserEveryDetailsInput!) {
				updateUserEveryDetail(userId: $userId, data: $data) {
					userId
					email
					roles
				}
       		 }`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						userId: 4,
						email: "new-email@example.com",
						roles: [Role.USER, Role.POI_CREATOR]
					}
				},
				contextValue: userLambdaCtx
			});

			expect(result.errors).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)

		});

		it('Le user change ses informations (mauvais Id) = fail', async () => {
			// Nous réutilisons le userResolver car nous ne testons plus les rôles ici
			const userResolver = new UserResolver();

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			const newData = {
				userId: 10,
				email: "new-email@example.com",
				roles: [Role.USER, Role.POI_CREATOR]
			}

			await expect(
				userResolver.updateUserEveryDetail(10, newData)
			).rejects.toThrow('Could not find any entity of type "User"');
		})
	});

	describe("UpdateUserRole Mutation", () => {
		it("ADMIN_SITE is changing user role = success", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
  				updateUserRole(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY]
					}
				},
				contextValue: sysadminCtx
			});

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).toContain(Role.POI_CREATOR)
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).toContain(Role.ADMIN_CITY)
		});

		it("ADMIN_CITY is changing user role = success", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
  				updateUserRole(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY]
					}
				},
				contextValue: sysadminCtx
			});

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).toContain(Role.POI_CREATOR)
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).toContain(Role.ADMIN_CITY)

		});

		it("POI_CREATOR is changing user role = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
  				updateUserRole(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY]
					}
				},
				contextValue: poiCreatorCtx
			});

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)
			expect(modifiedUser?.roles).not.toContain(Role.ADMIN_CITY)
		});

		it("USER (lambda) is changing user role = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
  				updateUserRole(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY]
					}
				},
				contextValue: userLambdaCtx
			});

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("simple-user@example.com");
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)
			expect(modifiedUser?.roles).not.toContain(Role.ADMIN_CITY)
		});

		it(" user role with incorrect id = fail", async () => {

			const userResolver = new UserResolver(); // on ne test plus en fonction du rôle mais de la fonction => alors on retourne sur le resolver standard

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			await expect(userResolver.updateUserRole(
				10,
				{ roles: [Role.ADMIN_SITE] }
			)).rejects.toThrow(Error)
		});
	});

	describe("UpdateUserData Mutation", () => {

		it("ADMIN_SITE change les informations du user = success", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($data: UpdateUserDataInput!, $userId: Float!) {
  					updateUserData(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						email: 'new-email@test.com'
					}
				},
				contextValue: sysadminCtx
			});

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("new-email@test.com");
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)
		});

		it("ADMIN_CITY change les informations du user = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($data: UpdateUserDataInput!, $userId: Float!) {
  					updateUserData(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						email: 'new-email@test.com'
					}
				},
				contextValue: cityAdminCtx
			})


			expect(result.data).toBeNull();
			expect(result.errors).toBeDefined();
			expect(result.errors?.[0].message).toContain("Access denied");
		});

		it("POI_CREATOR change les informations du user = fail", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($data: UpdateUserDataInput!, $userId: Float!) {
  					updateUserData(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						email: 'new-email@test.com'
					}
				},
				contextValue: poiCreatorCtx
			})

			expect(result.data).toBeNull();
			expect(result.errors).toBeDefined();
			expect(result.errors?.[0].message).toContain("Access denied");
		});

		it("USER (pas bon id) change les informations du user = fail", async () => {

			// userId: 3,
			// email: "poi-creator@example.com",
			// roles: [Role.POI_CREATOR, Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 3 } })
			expect(initialInformations?.email).toBe('poi-creator@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($data: UpdateUserDataInput!, $userId: Float!) {
  					updateUserData(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 3,
					data: {
						email: 'new-email@test.com'
					}
				},
				contextValue: userLambdaCtx
			})

			expect(result.data).toBeNull();
			expect(result.errors).toBeDefined();
			expect(result.errors?.[0].message).toContain("Vous n'êtes pas autorisé à faire cette modification");
		});

		it("USER (bon id) change les informations du user = success", async () => {

					// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toContain(Role.USER)
			expect(initialInformations?.roles).not.toContain(Role.POI_CREATOR)

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($data: UpdateUserDataInput!, $userId: Float!) {
  					updateUserData(data: $data, userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
					data: {
						email: 'new-email@test.com'
					}
				},
				contextValue: userLambdaCtx
			})

			expect(result).toBeDefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("new-email@test.com");
			expect(modifiedUser?.roles).toContain(Role.USER)
			expect(modifiedUser?.roles).not.toContain(Role.POI_CREATOR)
		});
	});

	describe("DeleteUser Mutation", () => {

		it("ADMIN_SITE, supprime un utilisateur", async () => {
			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toBeDefined()

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($userId: Float!) {
					deleteUser(userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
				},
				contextValue: sysadminCtx
			});

			expect(result.errors).toBeUndefined();
			const deletedUser = await User.findOne({ where: { userId: 4 } });
			expect(deletedUser).toBeNull();
		})

		it("ADMIN_SITE, supprime un utilisateur", async () => {

			// userId: 4,
			// email: "simple-user@example.com",
			// roles: [Role.USER],
			// hashedPassword: hashedPassword,

			const initialInformations = await User.findOne({ where: { userId: 4 } })
			expect(initialInformations?.email).toBe('simple-user@example.com');
			expect(initialInformations?.roles).toBeDefined()

			// Ici, on utilise la mutation et pas le userResolver pour pouvoir faire appelle à l'autorization 
			const mutation = `
				mutation Mutation($userId: Float!) {
					deleteUser(userId: $userId)
				}`;

			const result = await graphql({
				schema,
				source: mutation,
				variableValues: {
					userId: 4,
				},
				contextValue: sysadminCtx
			});

			expect(result.errors).toBeUndefined();
			const deletedUser = await User.findOne({ where: { userId: 4 } });
			expect(deletedUser).toBeNull();
		})
	});
});

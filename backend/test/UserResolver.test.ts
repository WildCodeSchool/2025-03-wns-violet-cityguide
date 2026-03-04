import { describe, it, expect, afterAll, beforeEach, beforeAll, afterEach } from "@jest/globals";

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

let testDataSource: DataSource; // Connexion à la BDD
let schema: GraphQLSchema; //Schema GraphQL utilisée lors de l'initialisation de la BDD
let testUser: User; // Mock user pour les test d'authentification; 

const mockCtx: Context = {
	res: {
		setHeader: jest.fn(),
	} as any,
	req: {} as any,
	user: undefined,
};

describe("User Resolver test", () => {

	// IMPORTANT SETUP NOTES:
	// 4. Mock ctx (Context) object for testing cookies and authenticated user
	// 5. Set JWT_SECRET in test environment for token generation tests

	beforeAll(async () => {

		// Set JWT_SECRET for token generation in tests
		process.env.JWT_SECRET = "test-secret-key-for-jwt-generation";

		testDataSource = new DataSource({
			type: "better-sqlite3",
			database: ":memory:",
			synchronize: true,
			entities: [User, UserInfo, Poi, City, Category],
			logging: false,
		});

		await testDataSource.initialize();

		// User.useDataSource(testDataSource);
		// UserInfo.useDataSource(testDataSource);
		// Poi.useDataSource(testDataSource);
		// City.useDataSource(testDataSource);
		// Category.useDataSource(testDataSource);

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

		// Admin user
		const adminUser = User.create({
			userId: 1,
			email: "admin@example.com",
			roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await adminUser.save();

		// City admin user
		const cityUser = User.create({
			userId: 2,
			email: "city-user@example.com",
			roles: [Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await cityUser.save();

		// POI creator user
		const poiCreator = User.create({
			userId: 3,
			email: "poi-creator@example.com",
			roles: [Role.POI_CREATOR, Role.USER],
			hashedPassword: hashedPassword,
		});
		await poiCreator.save();

		// Simple user with basic role
		testUser = User.create({
			userId: 4,
			email: "simple-user@example.com",
			roles: [Role.USER],
			hashedPassword: hashedPassword,
		});
		await testUser.save();
	});

	afterEach(async () => {
		// Clear database after each test - only if connection is still active
		if (testDataSource.isInitialized) {
			// Clear in reverse order to avoid foreign key constraints
			await testDataSource.getRepository(User).clear();
			await testDataSource.getRepository(UserInfo).clear();
		}
	});

	afterAll(async () => {
		// Destroy connection only if it's still active
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

		it('User entre des informations correctes : signup = succes', async () => {
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
	}),

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
		it("User se déconnecte de sa session", async () => {
			const userResolver = new UserResolver();

			const authUser = {
				email: 'simple-user@example.com',
				password: 'hashedPassword123',
			}

			const result = await userResolver.logout(mockCtx);

			expect(result).toBeDefined();
			expect(result.message).toBe('Logged out successfully')
			expect(result.token).toBe('');
		})
	});

	describe("User sign in, login, logout", () => {
		it("Signin, then login, then logout", async () => {
			const userResolver = new UserResolver();

			const newUser = {
				email: "new@user-test.com",
				password: "Password123"
			}


			const signedIn = await userResolver.signup(
				{ email: newUser.email, password: newUser.password },
				mockCtx)

			expect(signedIn).toBeDefined();
			expect(signedIn.message).toBe('User created successfully')
			expect(signedIn.token).not.toBe('');

			const allUsers = await User.find();
			expect(allUsers.length).toBe(5);

			const loggedIn = await userResolver.login(
				{ email: 'new@user-test.com', password: 'Password123' }, mockCtx
			)
			expect(loggedIn).toBeDefined();
			expect(loggedIn.message).toBe("Login successful");
			expect(loggedIn.token).not.toBe('');
			expect(loggedIn.user?.email).toBe('new@user-test.com');

			const loggedOut = await userResolver.logout(mockCtx);
			expect(loggedOut).toBeDefined();
			expect(loggedOut.token).toBe('')
		})
	})

	describe("UpdateUserEveryDetail Mutation", () => {
		it("User Site change des roles = success", async () => {
			const adminMockCtx: Context = {
				res: { setHeader: jest.fn() } as any,
				req: {} as any,
				user: {
					id: 1,
					firstname: 'sysadmin',
					roles: [Role.ADMIN_SITE]
				}
			};
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
				contextValue: adminMockCtx
			});

			expect(result.errors).toBeUndefined();
			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toContain("new-email@example.com");
		});

		it("User City change des roles = success", async () => {
			const adminCityMockCtx: Context = {
				res: { setHeader: jest.fn() } as any,
				req: {} as any,
				user: {
					id: 1,
					firstname: 'city_admin',
					roles: [Role.ADMIN_CITY]
				}
			};

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
				contextValue: adminCityMockCtx
			});

			expect(result.errors).toBeUndefined();

			const modifiedUser = await User.findOne({ where: { userId: 4 } })
			expect(modifiedUser?.email).toBe("new-email@example.com");
			expect(modifiedUser?.roles).toContain(Role.POI_CREATOR)

		});

		it("Poi creator change des roles = fail", async () => {
			const poiCreatorCtx: Context = {
				res: { setHeader: jest.fn() } as any,
				req: {} as any,
				user: {
					id: 1,
					firstname: 'julien_le_createur_de_poi',
					roles: [Role.POI_CREATOR]
				}
			};

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
			const userLambdaCtx: Context = {
				res: { setHeader: jest.fn() } as any,
				req: {} as any,
				user: {
					id: 1,
					firstname: 'user_lambda',
					roles: [Role.USER]
				}
			};

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

		describe("UpdateUserRole Mutation", () => {

			// TODO: Test successful role update by admin
			// - Should update user roles when called by ADMIN_SITE
			// - Should update user roles when called by ADMIN_CITY
			// - Should return the userId after successful update

			// TODO: Test authorization
			// - Should fail when user doesn't have required admin permissions

			// TODO: Test error handling
			// - Should throw error when userId doesn't exist
			// - Should handle invalid role values
		});

		describe("UpdateUserData Mutation", () => {

			// TODO: Test ADMIN_SITE can update any user
			// - Should allow ADMIN_SITE to update any user's email
			// - Should return userId after successful update

			// TODO: Test USER can update their own data
			// - Should allow user to update their own email (when userId matches ctx.user.id)
			// - Should return userId after successful update

			// TODO: Test authorization failures
			// - Should throw error when USER tries to update another user's data
			// - Should throw "Vous n'êtes pas autorisé à faire cette modification" for unauthorized access

			// TODO: Test error handling
			// - Should throw error when userId doesn't exist
			// - Should validate email format
		});

		describe("DeleteUser Mutation", () => {

			it("ADMIN_SITE, supprime un utilisateur", async () => {
				const sysadminCtx: Context = {
					res: { setHeader: jest.fn() } as any,
					req: {} as any,
					user: {
						id: 1,
						firstname: 'sysadmin',
						roles: [Role.ADMIN_SITE]
					}
				};

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

			// TODO: Test successful user deletion
			// - Should delete user when called by ADMIN_SITE
			// - Should return deleted userId
			// - Should verify user is actually removed from database

			// TODO: Test authorization
			// - Should fail when user doesn't have ADMIN_SITE role

			// TODO: Test error handling
			// - Should handle deletion of non-existent userId gracefully
			// - Should consider cascade deletion of related UserInfo
		});
	});
})
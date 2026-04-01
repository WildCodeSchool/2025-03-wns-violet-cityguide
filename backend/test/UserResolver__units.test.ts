import "reflect-metadata";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// Import du jsonwebtoken pour tester la génération de celui-ci
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";

jest.mock("argon2", () => ({
	hash: jest.fn(),
	verify: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn(),
}));

jest.mock("../src/entities/User", () => {
	const actual = jest.requireActual("../src/entities/User") as Record<string, unknown>;

	class MockUser {
		static find = jest.fn();
		static findOne = jest.fn();
		static findOneOrFail = jest.fn();
		static findOneByOrFail = jest.fn();
		static create = jest.fn();
		static delete = jest.fn();
	}

	return {
		...actual,
		User: MockUser,
	};
});

jest.mock("../src/entities/UserInfo", () => ({
	UserInfo: {
		create: jest.fn(),
	},
}));

let UserResolver: any;
let Role: any;
let User: any;
let MockedUser: {
	find: jest.Mock;
	findOne: jest.Mock;
	findOneOrFail: jest.Mock;
	findOneByOrFail: jest.Mock;
	create: jest.Mock;
	delete: jest.Mock;
};

import { UserInfo } from "../src/entities/UserInfo";

function createMockContext(user?: {
	id: number,
	firstname: string,
	roles: any[]
}) {
	return {
		res: { setHeader: jest.fn() } as any,
		req: {} as any,
		user: user
	};
}

const mockCtx = createMockContext();
let sysadminCtx: any;
let cityAdminCtx: any;
let poiCreatorCtx: any;
let userLambdaCtx: any;

let adminUser: any;
let cityUser: any;
let poiCreator: any;
let simpleUser: any;

const MockedUserInfo = UserInfo as unknown as {
	create: jest.Mock;
};

describe("User Resolver unit test", () => {
	let resolver: any;
	let testUser: any;

	// avant chaque test, mock les données qui vont être testées.
	beforeEach(() => {
		jest.clearAllMocks();

		const userModule = require("../src/entities/User");
		Role = userModule.Role;
		User = userModule.User;
		MockedUser = User as {
			find: jest.Mock;
			findOne: jest.Mock;
			findOneOrFail: jest.Mock;
			findOneByOrFail: jest.Mock;
			create: jest.Mock;
			delete: jest.Mock;
		};
		sysadminCtx = createMockContext({
			id: 1,
			firstname: "sysadmin",
			roles: [Role.ADMIN_SITE],
		});

		cityAdminCtx = createMockContext({
			id: 2,
			firstname: "célemairedelaville",
			roles: [Role.ADMIN_CITY],
		});

		poiCreatorCtx = createMockContext({
			id: 3,
			firstname: "victor_the_creator_of_poi",
			roles: [Role.POI_CREATOR],
		});

		userLambdaCtx = createMockContext({
			id: 4,
			firstname: "user_lambda",
			roles: [Role.USER],
		});

		adminUser = {
			userId: 1,
			email: "admin@example.com",
			roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: "hashed-password",
			save: jest.fn(),
			remove: jest.fn(),
		};

		cityUser = {
			userId: 2,
			email: "city-user@example.com",
			roles: [Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			hashedPassword: "hashed-password",
			save: jest.fn(),
			remove: jest.fn(),
		};

		poiCreator = {
			userId: 3,
			email: "poi-creator@example.com",
			roles: [Role.POI_CREATOR, Role.USER],
			hashedPassword: "hashed-password",
			save: jest.fn(),
			remove: jest.fn(),
		};

		simpleUser = {
			userId: 4,
			email: "simple-user@example.com",
			roles: [Role.USER],
			hashedPassword: "hashed-password",
			save: jest.fn(),
			remove: jest.fn(),
		};
		// MockedUser = User as {
		// 	find: jest.Mock;
		// 	findOne: jest.Mock;
		// 	create: jest.Mock;
		// };

		UserResolver = require("../src/resolvers/UserResolver").default;

		resolver = new UserResolver();
		process.env.JWT_SECRET = "test-secret-key-for-jwt-generation";

		MockedUser.find.mockImplementation(async () => [
			adminUser,
			cityUser,
			poiCreator,
			simpleUser,
		]);

		MockedUser.findOne.mockImplementation(async ({ where }: any) => {
			if (where?.userId === 1) return adminUser;
			if (where?.userId === 2) return cityUser;
			if (where?.userId === 3) return poiCreator;
			if (where?.userId === 4) return simpleUser;
			if (where?.email === "admin@example.com") return adminUser;
			if (where?.email === "city-user@example.com") return cityUser;
			if (where?.email === "poi-creator@example.com") return poiCreator;
			if (where?.email === "simple-user@example.com") return simpleUser;
			return null;
		});

		MockedUser.findOneOrFail.mockImplementation(async ({ where }: any) => {
			if (where?.email === "simple-user@example.com") {
				return {
					...simpleUser,
					userInfo: { firstName: "Michel" },
				};
			}
			throw new Error("User not found");
		});

		(argon2.hash as jest.MockedFunction<typeof argon2.hash>)
			.mockResolvedValue("hashedPassword123");

		(argon2.verify as jest.MockedFunction<typeof argon2.verify>)
			.mockImplementation(async (hash, plain) => {
				if (
					hash === "hashed-password" &&
					(plain === "hashedPassword123" || plain === "Password123")
				) {
					return true;
				}
				return false;
			});

		(jwt.sign as jest.MockedFunction<typeof jwt.sign>)
			.mockReturnValue("fake-jwt-token" as any);
	});

	describe("User resolver Queries", () => {

		it("getAllUsers : return tous les Users avec leur informations", async () => {
			const result = await resolver.getAllUsers();

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
			const result = await resolver.getUserById(2);

			expect(result).toBeDefined();
			expect(result?.email).toBe('city-user@example.com');
			expect(result?.roles).toEqual([Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER]);
		});

		it('getAllUsersById : return un utilisateur à partir de son id (invalid)', async () => {
			const result = await resolver.getUserById(5);

			expect(result).toBe(null);
		})
	});

	describe("Signup Mutation", () => {
		it('User entre des informations correctes : signup = success', async () => {
			const saveUser = jest.fn(async () => undefined);
			const saveUserInfo = jest.fn(async () => undefined);

			const createdUser = {
				userId: 5,
				email: "jean@michel.com",
				roles: [Role.USER],
				hashedPassword: "hashedPassword123",
				save: saveUser,
			} as any;

			const createdUserInfo = {
				firstName: "",
				lastName: "",
				avatarUrl: "",
				user: createdUser,
				save: saveUserInfo,
			} as any;

			MockedUser.findOne.mockImplementation(async ({ where }: any) => {
				if (where?.email === "jean@michel.com") return null;
				return null;
			});

			MockedUser.create.mockReturnValue(createdUser);
			MockedUserInfo.create.mockReturnValue(createdUserInfo);

			const result = await resolver.signup(
				{ email: "jean@michel.com", password: "abcDEF123" },
				mockCtx
			);

			expect(MockedUser.create).toHaveBeenCalled();
			expect(MockedUserInfo.create).toHaveBeenCalled();
			expect(saveUser).toHaveBeenCalled();
			expect(saveUserInfo).toHaveBeenCalled();
			expect(result.message).toBe("User created successfully");
		});

		it('User entre des informations incorrectes (email sans @) : signup = fail', async () => {
			await expect(
				resolver.signup(
					{ email: "jeanmichel.com", password: "abcDEF123" },
					mockCtx
				)
			).rejects.toThrow("Invalid email format");

			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();
		});

		it('User entre des informations incorrectes (mot de passe incorrect) : signup = fail', async () => {
			await expect(
				resolver.signup(
					{ email: "invalid@password.com", password: "abc123" },
					mockCtx
				)
			).rejects.toThrow("Password must be at least 7 characters");
		});

		it('User entre des informations incorrectes (email déjà utilisé) : signup = fail', async () => {
			await expect(
				resolver.signup(
					{ email: "simple-user@example.com", password: "abc123DEF" },
					mockCtx
				)
			).rejects.toThrow("Email already in use");

			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();
		});
	});

	describe("Login Mutation", () => {
		it("User s'authentifie : info correct = success", async () => {
			const result = await resolver.login(
				{
					email: "simple-user@example.com",
					password: "hashedPassword123",
				},
				mockCtx
			);

			expect(result).toBeDefined();
			expect(result.message).toContain("Login successful");
			expect(result.user?.email).toContain("simple-user@example.com");
			expect(result.token).toBe("fake-jwt-token");
			expect(mockCtx.res.setHeader).toHaveBeenCalled();
		});

		it("User s'authentifie : info incorrectes (email) = fail", async () => {
			const result = await resolver.login(
				{
					email: "simple-not-user@example.com",
					password: "hashedPassword123",
				},
				mockCtx
			);

			expect(result).toBeDefined();
			expect(result.message).not.toBe("Login successful");
			expect(result.token).toBe("");
		});

		it("User s'authentifie : info incorrectes (password) = fail", async () => {
			const result = await resolver.login(
				{
					email: "simple-user@example.com",
					password: "wrongPassword123",
				},
				mockCtx
			);

			expect(result.token).toBe("");
			expect(result.message).toBe("Invalid password");
			expect(result.user).toBeUndefined();
			expect(mockCtx.res.setHeader).not.toHaveBeenCalled();
		});
	});

	describe("Logout Mutation", () => {
		it("User se déconnecte de sa session = success", async () => {
			const result = await resolver.logout(mockCtx);

			expect(result).toBeDefined();
			expect(result.message).toBe("Logged out successfully");
			expect(result.token).toBe("");
			expect(mockCtx.res.setHeader).toHaveBeenCalled();
		});

		it("User se déconnecte avec un contexte invalide (setHeader throws) = fail", async () => {
			const failingCtx = {
				res: {
					setHeader: jest.fn(() => {
						throw new Error("Headers already sent");
					}),
				} as any,
				req: {} as any,
				user: {
					id: 4,
					firstname: "test-user",
					roles: [Role.USER],
				},
			};

			await expect(resolver.logout(failingCtx)).rejects.toThrow("Logout failed");
		})
	});

	describe("Méthodes directes de modification", () => {
		let mutableUser: any;

		beforeEach(() => {
			mutableUser = {
				userId: 4,
				email: "simple-user@example.com",
				roles: [Role.USER],
				hashedPassword: "hashed-password",
				save: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
				remove: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
			} as any & { save: jest.Mock; remove: jest.Mock };
		});

		describe("updateUserEveryDetail", () => {
			it("modifie email + rôles si l'utilisateur existe", async () => {
				MockedUser.findOneByOrFail.mockImplementation(async ({ userId }: any) => {
					if (userId === 4) return mutableUser;
					throw new Error("User not found");
				});

				const result = await resolver.updateUserEveryDetail(4, {
					userId: 4,
					email: "new-email@example.com",
					roles: [Role.USER, Role.POI_CREATOR],
				});

				expect(MockedUser.findOneByOrFail).toHaveBeenCalledWith({ userId: 4 });
				expect(mutableUser.email).toBe("new-email@example.com");
				expect(mutableUser.roles).toEqual([Role.USER, Role.POI_CREATOR]);
				expect(mutableUser.save).toHaveBeenCalled();
				expect(result.email).toBe("new-email@example.com");
				expect(result.roles).toContain(Role.POI_CREATOR);
			});

			it("échoue si l'utilisateur n'existe pas", async () => {
				MockedUser.findOne.mockImplementation(async () => null);

				await expect(
					resolver.updateUserEveryDetail(10, {
						userId: 10,
						email: "new-email@example.com",
						roles: [Role.USER, Role.POI_CREATOR],
					})
				).rejects.toThrow();
			});
		});

		describe("updateUserRole", () => {
			it("modifie les rôles si l'utilisateur existe", async () => {
				MockedUser.findOneByOrFail.mockImplementation(async ({ userId }: any) => {
					if (userId === 4) return mutableUser;
					throw new Error("User not found");
				});

				const result = await resolver.updateUserRole(4, {
					roles: [Role.USER, Role.POI_CREATOR, Role.ADMIN_CITY],
				});

				expect(MockedUser.findOneByOrFail).toHaveBeenCalledWith({ userId: 4 });
				expect(result).toBe(4);
				expect(mutableUser.roles).toEqual([
					Role.USER,
					Role.POI_CREATOR,
					Role.ADMIN_CITY,
				]);
				expect(mutableUser.save).toHaveBeenCalled();
			});

			it("échoue si l'utilisateur n'existe pas", async () => {
				MockedUser.findOne.mockImplementation(async () => null);

				await expect(
					resolver.updateUserRole(10, { roles: [Role.ADMIN_SITE] })
				).rejects.toThrow();
			});
		});

		describe("updateUserData", () => {
			it("modifie l'email si l'utilisateur existe", async () => {
				MockedUser.findOneByOrFail.mockImplementation(async ({ userId }: any) => {
					if (userId === 4) return mutableUser;
					throw new Error("User not found");
				});

				const result = await resolver.updateUserData(4, {
					email: "new-email@test.com",
				}, userLambdaCtx);

				expect(MockedUser.findOneByOrFail).toHaveBeenCalledWith({ userId: 4 });
				expect(mutableUser.email).toBe("new-email@test.com");
				expect(mutableUser.save).toHaveBeenCalled();
				expect(result).toBe(4);
			});

			it("échoue si l'utilisateur n'existe pas", async () => {
				MockedUser.findOne.mockImplementation(async () => null);

				await expect(
					resolver.updateUserData(10, { email: "new-email@test.com" }, mockCtx)
				).rejects.toThrow();
			});
		});

		describe("deleteUser", () => {
			it("supprime l'utilisateur si trouvé", async () => {
				MockedUser.delete.mockImplementation(async () => ({ affected: 1 }));

				const result = await resolver.deleteUser(4);

				expect(MockedUser.delete).toHaveBeenCalledWith({ userId: 4 });
				expect(result).toBe(4);
			});

			it("retourne l'id même si aucun utilisateur n'est trouvé", async () => {
				MockedUser.delete.mockImplementation(async () => ({ affected: 0 }));

				const result = await resolver.deleteUser(10);

				expect(MockedUser.delete).toHaveBeenCalledWith({ userId: 10 });
				expect(result).toBe(10);
			});
		});
	});
});

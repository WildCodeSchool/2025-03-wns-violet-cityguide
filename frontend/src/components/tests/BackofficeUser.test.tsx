import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { Role } from "../../generated/graphql-types";

describe("Le Backoffice User n'est visible que par les admin site et admin city", () => {
	const ADMIN_ROLES: Role[] = [Role.AdminSite, Role.AdminCity];

	function canSeeUserTable(isAuthenticated: boolean, roles: Role[]) {
		return isAuthenticated && roles.some(role => ADMIN_ROLES.includes(role))
	}

	it("false si l'utilisateur n'est pas authentifié", () => {
		expect(canSeeUserTable(false, [Role.AdminSite])).toBe(false);
	});

	it("true si utilisateur authentifié et possédant au moins un role Admin site", () => {
		expect(canSeeUserTable(true, [Role.AdminCity])).toBe(true);
	});

	it("true si utilisateur authentifié et possédant au moins uun role Admin city", () => {
		expect(canSeeUserTable(true, [Role.AdminCity])).toBe(true);
	});

	it("false si utilisateur authentifié et ne possèdant pas de role autorisé", () => {
		expect(canSeeUserTable(true, [Role.PoiCreator])).toBe(false);
	})
});
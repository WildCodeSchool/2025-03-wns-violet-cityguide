import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Header from '../Header'
import { Role } from "../../generated/graphql-types";

describe('Header', () => {
	const html = renderToString(
		<MemoryRouter>
			<Header />
		</MemoryRouter>
	)
	it('rend le header avec un lien vers /signup', () => {
		// espère voir le header s'afficher
		expect(html).toContain('<header')
		expect(html.replaceAll('&#x27;', "'")).toContain("S'inscrire")
		expect(html).toContain('href="/signup"')
	})
});

describe("canSeeAdminButton", () => {
	const ADMIN_ROLES: Role[] = [Role.AdminCity, Role.AdminSite, Role.PoiCreator];

	function canSeeAdminButton(isAuthenticated: boolean, roles: Role[]) {
		return isAuthenticated && roles.some(r => ADMIN_ROLES.includes(r));
	}

	it("false si pas authentifié", () => {
		expect(canSeeAdminButton(false, [Role.AdminCity])).toBe(false);
	});

	it("true si authentifié + rôle autorisé", () => {
		expect(canSeeAdminButton(true, [Role.AdminCity])).toBe(true);
	});

	it("false si authentifié + rôle non autorisé", () => {
		expect(canSeeAdminButton(true, [Role.User])).toBe(false);
	});
});
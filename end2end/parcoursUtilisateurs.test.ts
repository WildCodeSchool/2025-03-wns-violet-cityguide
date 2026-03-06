import { test, expect } from '@playwright/test';

test('Un visiteur s\'enregistre, et visite le site', async ({ page }) => {
	const userMail = `user-${Date.now()}@test.com`
	// On se rend sur la page d'accueille
	await page.goto('http://localhost:7000/');
	await page.waitForLoadState('networkidle')

	// Le visiteur se rend sur le formulaire d'inscription
	await page.getByRole('button', { name: '🔒 Nécessaires uniquement' }).click(); //La banière de cookies est présente
	await page.getByRole('button', { name: 'Bouton de redirection vers le formulaire d\'inscription' }).click();
	console.log(page.url());
	await page.locator('input[name="email"]').click();
	await page.locator('input[name="email"]').fill(userMail);
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('Password123!');
	await page.getByRole('button', { name: 'S\'inscrire' }).click();
	
	await page.waitForLoadState('networkidle')
	await expect(page).toHaveURL(/\/home-page$/, { timeout: 10000 });

	// Le visiteur arrive sur la page d'accueille du site 
	// on vérifie la présence des liens sur le header
	// await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
	// await expect(page.getByRole('link', { name: 'Mon compte' })).toBeVisible();
	// await expect(page.getByRole('link', { name: 'Déconnexion' })).toBeVisible();
	// await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();

	// On clique sur la cards de Lyon
	await page.getByRole('button', { name: 'Lyon Lyon Ville historique ré' }).click();;
	
	await expect(page).toHaveURL(/\/city\/4$/)
	// On arrive sur la cards de la Basilique de Notre-Dame
	// await page.getByRole('link', { name: 'Basilique Notre-Dame de' }).click();
	 await page.getByRole('button', { name: 'Basilique Notre-Dame de' }).click();
  await expect(page.getByRole('complementary')).toMatchAriaSnapshot(`
    - heading "Basilique Notre-Dame de Fourvière" [level=2]
    - img "image de Basilique Notre-Dame de Fourvière"
    - button "Fermer le menu":
      - img
    - paragraph: "Catégorie: Monument"
    - paragraph: "/📍 Adresse: 8 Pl\\\\. de Fourvière, \\\\d+ Lyon/"
    - paragraph: "Description: Basilique perchée sur la colline de Fourvière"
    - paragraph:
      - text: "Site web:"
      - link "visiter le site":
        - /url: https://www.fourviere.org/
    - text: "/Coordonnées: Lat : \\\\d+\\\\.\\\\d+ — Lng : \\\\d+\\\\.\\\\d+/"
    `);

	// L'utilisateur à cliquer sur le lien pour visiter le site de la ville de Lyon
	const page1Promise = page.waitForEvent('popup');
	await page.getByText('Site web: visiter le site').click();
	const page1 = await page1Promise;
	await page1.close();

	// L'utilisateur ferme la carte
	await page.getByRole('button', { name: 'Fermer le menu' }).click();
	await page.getByRole('link', { name: 'Accueil' }).click();
	await page.getByRole('link', { name: 'Mentions légales' }).click();
	await expect(page.getByText('Adresse e-mailoucontact@')).toBeVisible();
	await expect(page.getByRole('definition').filter({ hasText: 'oucontact@protonmail.com' }).getByRole('link')).toBeVisible();
	await page.getByRole('link', { name: 'FAQ' }).click();
	await page.getByRole('heading', { name: 'Qu’est-ce que Où ?' }).click();
	await page.getByRole('link', { name: 'Accueil' }).click();
	await page.getByRole('button', { name: 'Villes' }).click();
	await page.getByRole('link', { name: 'Mon compte' }).click();
	await page.getByRole('button', { name: 'Déconnexion' }).click();
	await page.getByRole('heading', { name: 'En utilisant Où! vous' }).click();
});

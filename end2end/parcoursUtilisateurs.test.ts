import { test, expect } from '@playwright/test';

test('Un visiteur s\'enregistre, et visite le site', async ({ page }) => {
	const userMail = `user-${Date.now()}@test.com`
	// On se rend sur la page d'accueille
	console.log('Le visiteur arrive sur la page d\'accueil')
	await page.goto('http://localhost:7000/');
	await page.waitForLoadState('networkidle')

	// Le visiteur se rend sur le formulaire d'inscription
	console.log('Le visiteur accepte les cookies nécessaires sur le formulaire de consentement')
	await page.getByRole('button', { name: '🔒 Nécessaires uniquement' }).click(); //La banière de cookies est présente
	
	console.log('Le visiteur s\'enregistre')
	await page.getByRole('button', { name: 'Bouton de redirection vers le formulaire d\'inscription' }).click();
	console.log(page.url());
	await page.locator('input[name="email"]').click();
	await page.locator('input[name="email"]').fill(userMail);
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('Password123!');
	await page.locator('input[name="password"]').press('Tab');
	await expect(page.locator('form')).toMatchAriaSnapshot(`- listitem: Contient au moins 7 caractères`);
	await page.getByText('Contient au moins une').click();
	await page.getByText('Contient au moins un caractè').click();
	await page.getByText('Contient au moins un chiffre').click();
	await page.getByRole('button', { name: 'S\'inscrire' }).scrollIntoViewIfNeeded();
	await page.getByRole('button', { name: 'S\'inscrire' }).click({force: true});
	console.log(page.getByRole('button', { name: 'S\'inscrire' }));
	
	console.log('L\'utilisateur à cliquer sur le bouton s\'enregistrer et est redirigé vers la page d\'accueil authentifiée')
	await page.waitForLoadState('networkidle')
	await expect(page).toHaveURL('http://localhost:7000/home-page');
	
	// Le visiteur arrive sur la page d'accueille du site 
	// on vérifie la présence des liens sur le header
	// await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
	// 	- banner:
	// 	- link:
    //     - /url: /home-page
	// 	- navigation "Navigation principale":
    //     - link "Accueil":
	// 	- /url: /home-page
    //     - button "Villes"
    //     - link "Mon compte":
	// 	- /url: /account
    //     - button "Déconnexion"
	// 	`);
		
	console.log('L\'utilisateur à cliquer sur la cards de la ville de Lyon')
	// On clique sur la cards de Lyon
	await page.getByRole('button', { name: 'Lyon Lyon Ville historique ré' }).click();;
	
	await expect(page).toHaveURL(/\/city\/4$/)
	console.log('L\'utilisateur clique sur le point d\'intérêt de la Basilique de Lyon')
	// On arrive sur la cards de la Basilique de Notre-Dame
	// await page.getByRole('link', { name: 'Basilique Notre-Dame de' }).click();
	await page.getByRole('button', { name: 'Basilique Notre-Dame de' }).first().click();
	// await expect(page.getByRole('complementary')).toMatchAriaSnapshot(`
	// 	- heading "Basilique Notre-Dame de Fourvière" [level=2]
	// 	- img "image de Basilique Notre-Dame de Fourvière"
	// 	- button "Fermer le menu":
	// 	- img
	// 	- paragraph: "Catégorie: Monument"
	// 	- paragraph: "/📍 Adresse: 8 Pl\\\\. de Fourvière, \\\\d+ Lyon/"
	// 	- paragraph: "Description: Basilique perchée sur la colline de Fourvière"
	// 	- paragraph:
	// 	- text: "Site web:"
	// 	- link "visiter le site":
    //     - /url: https://www.fourviere.org/
	// 	- text: "/Coordonnées: Lat : \\\\d+\\\\.\\\\d+ — Lng : \\\\d+\\\\.\\\\d+/"
	// 	`);
		
		console.log('L\'utilisateur à cliquer sur le lien de redirection vers le site officiel')
		// L'utilisateur à cliquer sur le lien pour visiter le site de la ville de Lyon
		const page1Promise = page.waitForEvent('popup');
		await page.getByText('Site web: visiter le site').click();
		const page1 = await page1Promise;
		await page1.close();
		console.log('L\'utilisateur ferme la page qui s\' est ouverte')
		
		// L'utilisateur ferme la carte
		console.log('L\'utilisateur ferme la présentation du point d\'intérêt')
		await page.getByRole('button', { name: 'Fermer le menu' }).click();
		await page.getByRole('link', { name: 'Accueil' }).click();
		console.log('L\'utilisateur se déconnecte')
		
		// L'utilisateur se déconnecte
		await page.getByRole('button', { name: 'Déconnexion' }).click();
		await expect(page.locator('#root')).toMatchAriaSnapshot(`
			- button "Bouton de redirection vers le formulaire de connexion"
			- button "Bouton de redirection vers le formulaire d'inscription"
			`);
			console.log('L\'utilisateur passe maintenant par le formulaire d\'authentification')
  await page.getByRole('button', { name: 'Bouton de redirection vers le formulaire de connexion' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill(userMail);
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Password123!');
  await page.getByRole('button', { name: 'Connexion' }).click();

  await page.waitForLoadState('networkidle')
await expect(page).toHaveURL('http://localhost:7000/home-page');

});

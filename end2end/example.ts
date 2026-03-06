import { test, expect } from '@playwright/test';

test('arrive sur la page d\'accueil', async ({ page }) => {
  await page.goto('http://localhost:7000/');

  // S'attend à ce que la page contiennent "Où" dans le titre
  await expect(page).toHaveTitle(/Où/);
});

test('click sur le bouton de connexion pour se rendre sur la page de connexion', async ({ page }) => {
  await page.goto('http://localhost:7000/');

  // Click sur le bouton "Connexion"
  await page.getByRole('button', { name: 'Connexion' }).click();

  // S'attend à ce que la page contiennent le champs email
  const emailInput = page.locator('input[name="email"]');
  await expect(emailInput).toHaveAttribute('name', 'email');

  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toHaveAttribute('name', 'password');
});

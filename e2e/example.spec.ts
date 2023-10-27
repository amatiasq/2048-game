import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://amatiasq.github.io/2048-game/');
  await expect(page).toHaveTitle(/2048/);
});

test('can start the game', async ({ page }) => {
  await page.goto('https://amatiasq.github.io/2048-game/');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('2')).toBeVisible();
});

test('obstacles are created', async ({ page }) => {
  await page.goto('https://amatiasq.github.io/2048-game/');
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('div[data-value="-1"]')).toHaveCount(4);
});

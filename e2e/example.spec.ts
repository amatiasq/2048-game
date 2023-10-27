import { expect, test } from '@playwright/test';
import { HAS_OBSTACLES } from '../src/config';

test('has title', async ({ page }) => {
  await page.goto('https://amatiasq.github.io/2048-game/');
  await expect(page).toHaveTitle(/2048/);
});

test('can start the game', async ({ page }) => {
  await page.goto('https://amatiasq.github.io/2048-game/');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('2')).toBeVisible();
});

if (HAS_OBSTACLES) {
  test('obstacles are created', async ({ page }) => {
    await page.goto('https://amatiasq.github.io/2048-game/');

    // We select we want 4 obstacles
    await page.getByRole('button', { name: '4' }).click();

    await page.getByRole('button', { name: 'Start' }).click();

    // We should have 4 obstacles, 4 cells with value -1
    await expect(page.locator('div[data-value="-1"]')).toHaveCount(4);
  });
}

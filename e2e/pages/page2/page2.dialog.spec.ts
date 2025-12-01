import { test, expect } from '@playwright/test';

test.describe('Modal Component', () => {
  test('opens and closes correctly', async ({ page }) => {
    await page.goto('/page2'); // Update with your actual route

    // Ensure the modal is not visible initially
    const modal = page.getByRole('dialog');
    await expect(modal).toHaveCount(0);

    // Click the button to open the modal
    const openButton = page.getByRole('button', { name: 'Open Modal' });
    await openButton.click();

    // Modal should now be visible
    await expect(modal).toBeVisible();

    // Check modal title and description
    await expect(
      modal.getByRole('heading', { name: 'Modal Title' }),
    ).toBeVisible();
    await expect(
      modal.getByText('This is a proper modal using Shadcn UI.'),
    ).toBeVisible();

    // Close the modal using the first matching 'Close' button
    const closeButton = modal.getByRole('button', { name: 'Close' }).first();
    await closeButton.click();

    // Modal should no longer be visible
    await expect(modal).toHaveCount(0);
  });
});

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Axe a11y violations (WCAG + Canada)', async ({ page }) => {
  await page.goto('/');

  // Run Axe with WCAG 2.1 AA, best practices, and extra categories
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      'wcag21aa', // WCAG 2.1 Level AA (required by Canada)
      'best-practice', // general best practices
      'cat.keyboard', // keyboard navigation (critical in Canada std)
      'cat.language', // language attribute (Canada requires lang=fr/en)
      'cat.name-role-value', // ARIA name/role requirements
      'cat.parsing', // parsing/HTML validation
      'cat.color', // contrast compliance
      'cat.forms', // form labels & errors
      'cat.tables', // table markup
    ])
    .analyze();

  // remove strict colour contrasts for level 3 accessibility
  const violations = accessibilityScanResults.violations.filter((v) => {
    // Ignore the AAA-only enhanced contrast rule
    if (v.id === 'color-contrast-enhanced') return false;

    // Only keep AA failures for the normal contrast rule
    if (v.id === 'color-contrast' && v.impact === 'serious') {
      return v.nodes.some((node) => {
        const summary = node.failureSummary;
        if (!summary) return true; // keep if no failureSummary
        const match = summary.match(/contrast of (\d+\.?\d*)/);
        if (!match) return true; // keep if cannot parse
        const ratio = parseFloat(match[1]);
        return ratio < 4.5; // keep only if below AA threshold
      });
    }

    // Keep all other violations
    return true;
  });

  if (violations.length > 0) {
    const filePath = path.join(__dirname, 'axe-violations.json');
    fs.writeFileSync(filePath, JSON.stringify(violations, null, 2), 'utf8');
    console.log(`Accessibility failed!! = violations saved to ${filePath}`);
  }

  expect(violations).toEqual([]);
});

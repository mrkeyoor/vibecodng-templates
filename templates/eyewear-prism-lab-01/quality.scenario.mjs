export default [
  {
    name:'mobile optician eye card',viewports:['mobile'],covers:['eye-prev','eye-next'],
    async run({page,assert}){const status=page.locator('.eye-control span');await assert.text(status,/left field/i);await page.getByRole('button',{name:/view right lens/i}).click();await assert.text(status,/right field/i);await page.getByRole('button',{name:/view left lens/i}).click();await assert.text(status,/left field/i)}
  },
  {
    name:'spectrum calibration',viewports:['mobile','desktop'],covers:['frame-select','tint-select','light-select'],
    async run({page,assert,auditA11y,capture}){await page.locator('#lab').scrollIntoViewIfNeeded();await page.locator('[data-qa-action="frame-select"]').filter({hasText:'Orbit'}).click();await page.locator('[data-qa-action="tint-select"]').filter({hasText:'Glass Cyan'}).click();await page.locator('[data-qa-action="light-select"]').filter({hasText:'City'}).click();await assert.text(page.locator('.result'),/Orbit \/ Glass Cyan \/ City/);await auditA11y('spectrum calibrated');await capture('spectrum-calibrated')}
  },
  {
    name:'fitted view validation and completion',viewports:['mobile','desktop'],covers:['size-select','fit-submit','fit-reset'],
    async run({page,assert,auditA11y,capture}){await page.locator('#fit').scrollIntoViewIfNeeded();await page.locator('[data-qa-action="fit-submit"]').click();await assert.visible(page.getByText('Choose a fitted size.'));await auditA11y('fit validation');await page.locator('[data-qa-action="size-select"]').filter({hasText:'M'}).click();await page.locator('input[name="name"]').fill('Ari Noor');await page.locator('input[name="email"]').fill('ari@example.com');await page.locator('[data-qa-action="fit-submit"]').click();await assert.text(page.locator('.issued[role="status"]'),/VIEW FITTED/);await capture('fit-issued');await page.locator('[data-qa-action="fit-reset"]').click();await assert.visible(page.locator('[data-qa-action="fit-submit"]'))}
  }
]

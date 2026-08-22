export default [
  {
    name: 'force chassis separates and phases',
    viewports: ['mobile', 'desktop'],
    covers: ['rig-explode','rig-rotate-left','rig-reset','rig-rotate-right','rig-phase','rig-phase-next','rig-layer'],
    async run({ page, assert, auditA11y, capture }) {
      const separate = page.locator('[data-qa-action="rig-explode"]')
      await separate.click()
      await assert.attribute(separate, 'aria-pressed', 'true')
      const mobile = page.viewportSize().width < 700
      if (mobile) {
        await page.getByRole('button', { name: /next stride phase/i }).click()
      } else {
        await page.getByRole('button', { name: /toe-off/i }).click()
      }
      await page.waitForTimeout(350)
      await assert.text(page.locator('.phase-readout'), /medial wing returns/i)
      const carrier = page.locator('.layer-tabs').getByRole('button', { name: /carrier/i })
      await carrier.click()
      await assert.attribute(carrier, 'aria-pressed', 'true')
      await page.getByRole('button', { name: /rotate model right/i }).click()
      await page.getByRole('button', { name: /reset view/i }).click()
      await page.waitForTimeout(350)
      await assert.text(page.locator('.phase-readout'), /full contact/i)
      await auditA11y('force chassis resolved')
      await capture('force-chassis-resolved')
    },
  },
  {
    name: 'complete gait calibration',
    viewports: ['mobile', 'desktop'],
    covers: ['select-terrain','select-strike','select-ride','calibrate','mobile-terrain','mobile-strike','mobile-ride','mobile-next'],
    async run({ page, assert, auditA11y, capture }) {
      await page.getByRole('link', { name: /calibrate my ride/i }).click()
      const mobile = page.viewportSize().width < 700
      if (mobile) {
        await page.locator('.mobile-questions').getByRole('button', { name: /mixed/i }).click()
        await page.locator('.mobile-questions').getByRole('button', { name: /^next/i }).click()
        await page.locator('.mobile-questions').getByRole('button', { name: /forefoot/i }).click()
        await page.locator('.mobile-questions').getByRole('button', { name: /^next/i }).click()
        await page.locator('.mobile-questions').getByRole('button', { name: /responsive/i }).click()
        await page.getByRole('button', { name: /calibrate/i }).click()
      } else {
        await page.locator('.desktop-questions').getByRole('button', { name: 'Mixed', exact: true }).click()
        await page.locator('.desktop-questions').getByRole('button', { name: 'Forefoot', exact: true }).click()
        await page.locator('.desktop-questions').getByRole('button', { name: 'Responsive', exact: true }).click()
        await page.locator('.desktop-questions').getByRole('button', { name: /calibrate my ride/i }).click()
      }
      await assert.text(page.locator('.result'), /VECTOR ROUTE/i)
      await auditA11y('calibrated gait dossier')
      await capture('calibrated-gait-dossier')
    },
  },
  {
    name: 'anatomy and evidence controls',
    viewports: ['mobile', 'desktop'],
    covers: ['anatomy-layer','anatomy-previous','anatomy-next','terrain-evidence','edition-select'],
    async run({ page, assert, auditA11y, capture }) {
      await page.getByRole('link', { name: /lab/i }).first().click()
      const mobile = page.viewportSize().width < 700
      if (mobile) {
        await page.getByRole('button', { name: /next anatomy layer/i }).click()
      } else {
        await page.locator('.layer-controls').getByRole('button', { name: /chassis/i }).click()
      }
      await page.waitForTimeout(350)
      await assert.text(page.locator('.layer-readout'), /split composite plate/i)
      await page.locator('.terrain-switch').getByRole('button', { name: /track/i }).click()
      await assert.text(page.locator('.evidence'), /38 \/ 42 \/ 20/)
      await page.getByRole('button', { name: /select/i }).nth(1).click()
      await assert.text(page.locator('.mobile-edition-ticket'), /VECTOR TEMPO/i)
      await auditA11y('anatomy and edition selected')
      await capture('anatomy-edition-state')
    },
  },
  {
    name: 'reservation validation and confirmation',
    viewports: ['mobile', 'desktop'],
    covers: ['reserve-submit'],
    async run({ page, assert, auditA11y, capture }) {
      await page.goto(page.url().split('#')[0] + '#fit')
      await page.getByRole('button', { name: /reserve flow/i }).click()
      await assert.visible(page.getByRole('alert'))
      await assert.text(page.getByRole('alert'), /valid email/i)
      await page.getByLabel(/runner name/i).fill('Studio Runner')
      await page.getByLabel(/^email$/i).fill('runner@example.com')
      await page.getByLabel(/preferred size/i).selectOption({ label: 'US 9' })
      await page.getByRole('button', { name: /reserve flow/i }).click()
      await assert.text(page.getByRole('status'), /V01–628/i)
      await auditA11y('reservation confirmation')
      await capture('reservation-confirmed')
    },
  },
]

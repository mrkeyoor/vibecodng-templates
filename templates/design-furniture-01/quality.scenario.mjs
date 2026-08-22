export default [
  {
    name: 'spatial room viewpoints and placement',
    viewports: ['mobile', 'desktop'],
    covers: ['room-view', 'room-position'],
    async run({ page, assert, auditA11y, capture }) {
      if (page.viewportSize().width < 760) await page.getByRole('button', { name: /step 3, place/i }).click()
      const corner = page.locator('.spatial-controls').getByRole('button', { name: /corner/i })
      await corner.click()
      await assert.attribute(corner, 'aria-pressed', 'true')
      const right = page.locator('.spatial-controls').getByRole('button', { name: /^right$/i })
      await right.click()
      await assert.attribute(right, 'aria-pressed', 'true')
      await assert.text(page.locator('.plan-caption'), /current camera: corner/i)
      await auditA11y('spatial room corner placement')
      await capture('spatial room corner placement')
    },
  },
  {
    name: 'folio index keyboard lifecycle',
    viewports: ['mobile', 'desktop'],
    covers: ['catalog-index'],
    async run({ page, assert, auditA11y, capture }) {
      const trigger = page.getByRole('button', { name: /index/i })
      await trigger.focus()
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: /folio destinations/i })
      await assert.visible(dialog)
      await auditA11y('folio index open')
      await capture('folio index open')
      await page.keyboard.press('Escape')
      await assert.hidden(dialog)
      await assert.focused(trigger)
    },
  },
  {
    name: 'compose and reserve a furniture edition',
    viewports: ['mobile', 'desktop'],
    covers: ['mobile-step', 'select-material', 'select-span', 'select-wall', 'open-reservation', 'reservation-submit'],
    async run({ page, assert, auditA11y, capture }) {
      const mobile = page.viewportSize().width < 760
      if (mobile) await page.getByRole('button', { name: /step 1, swatch/i }).click()
      await page.getByRole('button', { name: /select brushed aluminium/i }).click()
      if (mobile) await page.getByRole('button', { name: /step 2, span/i }).click()
      await page.getByRole('button', { name: /select 200 centimetre span/i }).click()
      if (mobile) await page.getByRole('button', { name: /step 3, place/i }).click()
      await page.getByLabel(/clear wall width/i).selectOption('320')

      const result = page.getByRole('status', { name: /placement result/i })
      await assert.text(result, /60 cm each side/i)
      await assert.text(result, /brushed aluminium/i)
      await assert.text(result, /€8,800/i)
      await auditA11y('configured placement')
      await capture('configured placement')

      await page.getByRole('button', { name: /reserve this edition/i }).click()
      const form = page.getByRole('form', { name: /reserve configured edition/i })
      await assert.visible(form)
      await page.getByRole('button', { name: /record reservation/i }).click()
      await assert.visible(page.getByRole('alert', { name: /check reservation details/i }))

      await form.getByLabel(/full name/i).fill('Studio Audit')
      await form.getByLabel(/^email address$/i).fill('audit@example.com')
      await form.getByLabel(/project city or location/i).fill('Antwerp')
      await form.getByLabel(/fictional demonstration reservation/i).check()
      await page.getByRole('button', { name: /record reservation/i }).click()

      const confirmation = page.getByRole('status', { name: /reservation recorded/i })
      await assert.text(confirmation, /VL-02-200-M4/i)
      await assert.text(confirmation, /brushed aluminium/i)
      await auditA11y('reservation recorded')
      await capture('reservation recorded')
    },
  },
  {
    name: 'object ledger updates the selected dossier',
    viewports: ['mobile', 'desktop'],
    covers: ['select-object'],
    async run({ page, assert, auditA11y, capture }) {
      await page.getByRole('button', { name: /view dossier for arc bench 03/i }).click()
      const dossier = page.getByRole('status', { name: /object dossier/i })
      await assert.text(dossier, /Arc Bench 03/i)
      await assert.text(dossier, /Bent ash/i)
      await auditA11y('arc bench dossier')
      await capture('arc bench dossier')
    },
  },
]

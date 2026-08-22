export default [
  {
    name: 'movement score reaches a signed cycle',
    viewports: ['mobile','desktop'],
    covers: ['task-select','cue-select'],
    async run({page,assert,auditA11y,capture}) {
      await page.getByRole('button',{name:/inspect/i}).first().click()
      await page.getByRole('button',{name:/cue reach/i}).click()
      await assert.text(page.locator('.score-pulse'),/reach \/ inspect/i)
      await page.getByRole('button',{name:/cue prove/i}).click()
      await assert.text(page.locator('.score-pulse'),/simulated cycle signed/i)
      await auditA11y('signed movement score')
      await capture('movement-score-signed')
    }
  },
  {
    name: 'sense field changes channel',
    viewports: ['mobile','desktop'],
    covers: ['sensor-select'],
    async run({page,assert,capture}) {
      await page.getByRole('tab',{name:/force/i}).click()
      await assert.text(page.getByRole('tabpanel'),/0.7 N/i)
      await assert.text(page.getByRole('tabpanel'),/contact before grip/i)
      await capture('force-channel')
    }
  },
  {
    name: 'first-shift ticket validation and confirmation',
    viewports: ['mobile','desktop'],
    covers: ['jump-evaluation','profile-floor','profile-object','profile-shift','evaluation-submit'],
    async run({page,assert,auditA11y,capture}) {
      await page.getByRole('link',{name:/first shift/i}).click()
      await page.getByRole('radio',{name:/fixed cell/i}).check()
      await page.getByRole('radio',{name:/inspection tool/i}).check()
      await page.getByRole('radio',{name:/two shifts/i}).check()
      await page.getByRole('button',{name:/log the first shift/i}).click()
      await assert.visible(page.getByText(/add a contact name/i))
      await assert.visible(page.getByText(/add a valid work email/i))
      await page.getByLabel(/contact name/i).fill('Field Audit')
      await page.getByLabel(/work email/i).fill('audit@example.com')
      await page.getByRole('button',{name:/log the first shift/i}).click()
      await assert.text(page.getByRole('status'),/field note logged/i)
      await auditA11y('logged first-shift ticket')
      await capture('first-shift-logged')
    }
  }
]

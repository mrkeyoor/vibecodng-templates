export default [
  {
    name:'care index keyboard lifecycle',
    viewports:['mobile','desktop'],
    covers:['menu'],
    async run({page,assert,auditA11y,capture}){
      const trigger=page.getByRole('button',{name:/care index/i})
      await trigger.focus()
      await trigger.click()
      await assert.visible(page.locator('#care-index'))
      await assert.attribute(trigger,'aria-expanded','true')
      await auditA11y('open care index')
      await capture('care-index-open')
      await page.keyboard.press('Escape')
      await assert.hidden(page.locator('#care-index'))
      await assert.focused(trigger)
    }
  },
  {
    name:'assembled starting brief',
    viewports:['mobile','desktop'],
    covers:['start-brief','brief-priority','brief-pace','brief-setting','brief-cadence','brief-next','assemble-brief'],
    async run({page,assert,auditA11y,capture}){
      await page.getByRole('button',{name:/start your brief/i}).click()
      const mobile=(page.viewportSize()?.width||0)<760
      await page.getByRole('button',{name:/strength/i}).click()
      if(mobile) await page.getByRole('button',{name:/continue/i}).click()
      await page.getByRole('button',{name:/comprehensive/i}).click()
      if(mobile) await page.getByRole('button',{name:/continue/i}).click()
      await page.getByRole('button',{name:/zürich/i}).click()
      if(mobile) await page.getByRole('button',{name:/continue/i}).click()
      await page.getByRole('button',{name:/quarterly/i}).click()
      if(mobile) await page.getByRole('button',{name:/assemble brief/i}).click()
      else await page.getByRole('button',{name:/assemble starting brief/i}).click()
      await assert.visible(page.getByText('Capability over time',{exact:true}))
      await assert.text(page.locator('.brief-result'),/Continuum/)
      await auditA11y('assembled brief')
      await capture('assembled-brief')
    }
  },
  {
    name:'care exploration controls',
    viewports:['mobile','desktop'],
    covers:['context-map','billing-view','pathway-select','cadence-step','faq-toggle'],
    async run({page,assert,auditA11y,capture}){
      await page.getByRole('button',{name:'Recovery',exact:true}).click()
      await assert.text(page.locator('.context-ledger'),/workload and experience/i)
      await page.getByRole('button',{name:/annual context/i}).click()
      await page.locator('th').filter({hasText:'Concierge'}).getByRole('button',{name:/select/i}).click()
      await assert.text(page.locator('.selected-summary'),/Concierge/)
      await page.getByRole('tab',{name:/90 Review/i}).click()
      await assert.text(page.getByRole('tabpanel'),/Read the change/i)
      await page.getByRole('button',{name:/03 \/ Will I receive/i}).click()
      await assert.visible(page.getByText(/qualified clinician recommends only/i))
      await auditA11y('explored care controls')
      await capture('care-controls')
    }
  },
  {
    name:'consultation validation and confirmation',
    viewports:['mobile','desktop'],
    covers:['consultation-submit'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('#consult').scrollIntoViewIfNeeded()
      await page.getByRole('button',{name:/request orientation/i}).click()
      await assert.visible(page.getByRole('alert'))
      await assert.text(page.getByRole('alert'),/complete your name/i)
      await auditA11y('consultation validation')
      await page.getByLabel(/full name/i).fill('Studio Audit')
      await page.getByLabel(/email address/i).fill('audit@example.com')
      await page.getByLabel(/what would make/i).fill('Build a realistic strength baseline.')
      await page.getByLabel(/not urgent or emergency/i).check()
      await page.getByRole('button',{name:/request orientation/i}).click()
      await assert.text(page.getByRole('status'),/NN-2608/)
      await auditA11y('consultation confirmation')
      await capture('consultation-confirmed')
    }
  }
]

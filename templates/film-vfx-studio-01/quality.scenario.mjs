export default [
  {
    name:'live compositing timeline and image stack',
    viewports:['mobile','desktop'],
    covers:['composite-layer','composite-step','composite-frame'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('.composite-lab').scrollIntoViewIfNeeded()
      await page.getByRole('button',{name:/Atmosphere/}).click()
      await assert.attribute(page.getByRole('button',{name:/Atmosphere/}),'aria-pressed','false')
      await page.getByRole('button',{name:'Step forward twelve frames'}).click()
      await assert.text(page.locator('.frame-readout strong'),/084/)
      await page.locator('[data-qa-action="composite-frame"]').fill('118')
      await assert.text(page.locator('.timeline-console>p'),/final grade/i)
      await auditA11y('compositing timeline')
      await capture('live-composite')
    }
  },
  {
    name:'reel timeline and mobile shot controls',
    viewports:['mobile','desktop'],
    covers:['shot-select','timeline-frame','shot-prev','shot-next'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('[data-qa-action="shot-select"]').nth(1).click()
      await assert.text(page.locator('.hero .monitor-caption strong'),/Signal/)
      if((page.viewportSize()?.width||0)<700){
        await page.getByRole('button',{name:'Next shot'}).click()
        await assert.text(page.locator('.selected-shot figcaption>span'),/B07/)
        await page.getByRole('button',{name:'Previous shot'}).click()
      }else{
        await page.locator('[data-qa-action="timeline-frame"]').nth(2).click()
        await assert.text(page.locator('.selected-shot figcaption>span'),/B07/)
      }
      await auditA11y('selected reel frame')
      await capture('reel-selection')
    }
  },
  {
    name:'completed production treatment',
    viewports:['mobile','desktop'],
    covers:['start-treatment','treatment-format','treatment-tone','treatment-need','treatment-next'],
    async run({page,assert,auditA11y,capture}){
      await page.getByRole('button',{name:/Assemble a treatment/i}).click()
      await page.getByRole('button',{name:'Title sequence'}).click()
      await page.getByRole('button',{name:/Next prompt/i}).click()
      await page.getByRole('button',{name:'Physical wonder'}).click()
      await page.getByRole('button',{name:/Next prompt/i}).click()
      await page.getByRole('button',{name:'Full assembly'}).click()
      await page.getByRole('button',{name:/Assemble treatment/i}).click()
      await assert.visible(page.locator('.call-sheet.complete'))
      await assert.text(page.locator('.call-sheet.complete'),/Title sequence/)
      await assert.text(page.locator('.call-sheet.complete'),/Physical wonder/)
      await auditA11y('assembled treatment')
      await capture('assembled-treatment')
    }
  },
  {
    name:'vfx plate comparison',
    viewports:['mobile','desktop'],
    covers:['vfx-view'],
    async run({page,assert,auditA11y,capture}){
      await page.getByRole('button',{name:'Photographed plate'}).click()
      await assert.text(page.locator('.vfx-frame>span'),/PLATE/)
      await page.getByRole('button',{name:'Final composite'}).click()
      await assert.text(page.locator('.vfx-frame>span'),/FINAL/)
      await auditA11y('final composite')
      await capture('vfx-comparison')
    }
  },
  {
    name:'production handoff validation and success',
    viewports:['mobile','desktop'],
    covers:['contact-submit'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('#contact').scrollIntoViewIfNeeded()
      await page.getByRole('button',{name:/Transfer to production/i}).click()
      await assert.visible(page.getByRole('alert'))
      await assert.text(page.getByRole('alert'),/valid email/)
      await page.getByLabel('Name').fill('Studio Audit')
      await page.getByLabel('Email').fill('audit@example.com')
      await page.getByLabel('Production window').selectOption({label:'2—4 months'})
      await page.getByLabel('What remains unresolved?').fill('A practical-light sequence that needs a coherent final environment.')
      await page.getByLabel(/I understand this is a fictional studio template/i).check()
      await page.getByRole('button',{name:/Transfer to production/i}).click()
      await assert.text(page.getByRole('status'),/CA–2608/)
      await auditA11y('production confirmation')
      await capture('production-confirmation')
    }
  }
]

export default [
  {
    name:'contact run changes the developed look',
    viewports:['mobile','desktop'],
    covers:['frame-select','frame-step'],
    async run({page,assert,auditA11y,capture}){
      await page.getByRole('button',{name:/next contact frame/i}).click()
      await assert.text(page.locator('.frame-step'),/developing take 02/i)
      await page.locator('.proof').filter({hasText:/TAKE 03/}).click()
      await assert.text(page.locator('.style-docket h2'),/afterimage shell/i)
      await assert.text(page.locator('.price-line'),/920/)
      await auditA11y('developed contact frame')
      await capture('take-03-developed')
    }
  },
  {
    name:'look hold validates and issues a claim tag',
    viewports:['mobile','desktop'],
    covers:['size-select','hold-submit','hold-reset'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('.proof').filter({hasText:/TAKE 02/}).click()
      await page.getByRole('link',{name:/hold this cut/i}).click()
      await page.getByRole('button',{name:/issue the claim tag/i}).click()
      await assert.visible(page.getByText(/choose a size to hold this look/i))
      await assert.visible(page.getByText(/add a contact name/i))
      await assert.visible(page.getByText(/add a valid email/i))
      await page.getByRole('button',{name:'M',exact:true}).click()
      await page.getByLabel(/contact name/i).fill('Fashion Audit')
      await page.getByLabel(/email/i).fill('audit@example.com')
      await page.getByRole('button',{name:/issue the claim tag/i}).click()
      await assert.text(page.getByRole('status'),/frame\s*claimed/i)
      await assert.text(page.getByRole('status'),/cobalt interval/i)
      await assert.text(page.getByRole('status'),/size\s*m/i)
      await auditA11y('issued claim tag')
      await capture('look-held')
      await page.getByRole('button',{name:/cut another frame/i}).click()
      await assert.visible(page.getByRole('button',{name:/issue the claim tag/i}))
    }
  }
]

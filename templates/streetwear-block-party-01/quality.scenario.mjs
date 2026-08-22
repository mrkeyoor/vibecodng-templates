export default [
  {
    name:'set list keyboard lifecycle',viewports:['mobile','desktop'],covers:['menu'],
    async run({page,assert,auditA11y,capture}){
      const trigger=page.getByRole('button',{name:/set list/i})
      await trigger.focus();await trigger.click()
      const dialog=page.getByRole('dialog',{name:/set list navigation/i})
      await assert.visible(dialog);await auditA11y('set list open');await capture('set-list-open')
      await page.keyboard.press('Escape');await assert.hidden(dialog);await assert.focused(trigger)
    }
  },
  {
    name:'complete crew mixer',viewports:['mobile','desktop'],covers:['crew-slot','tee-select','size-select','crew-next'],
    async run({page,assert,capture}){
      await page.locator('#crew-builder').scrollIntoViewIfNeeded()
      const slots=page.getByRole('tab')
      await slots.nth(0).click();await page.getByRole('button',{name:/choose mango noise/i}).click();await page.getByRole('button',{name:'M',exact:true}).click()
      await page.getByRole('button',{name:/next person/i}).click();await page.getByRole('button',{name:/choose lime high/i}).click();await page.getByRole('button',{name:'L',exact:true}).click()
      await page.getByRole('button',{name:/next person/i}).click();await page.getByRole('button',{name:/choose cobalt bounce/i}).click();await page.getByRole('button',{name:'S',exact:true}).click()
      await assert.text(page.getByRole('status'),/crew ready/i);await capture('crew-ready')
    }
  },
  {
    name:'drop pass validation and completion',viewports:['mobile','desktop'],covers:['pass-submit','pass-reset'],
    async run({page,assert,auditA11y,capture}){
      await page.locator('#drop-pass').scrollIntoViewIfNeeded();await page.getByRole('button',{name:/issue the drop pass/i}).click()
      await assert.visible(page.getByRole('alert'));await auditA11y('pass errors')
      await page.locator('#crew-builder').scrollIntoViewIfNeeded()
      for(let i=0;i<3;i++){await page.getByRole('button',{name:'M',exact:true}).click();if(i<2)await page.getByRole('button',{name:/next person/i}).click()}
      await page.locator('#drop-pass').scrollIntoViewIfNeeded();await page.locator('input[name="name"]').fill('Block Studio');await page.locator('input[name="email"]').fill('crew@example.com');await page.getByRole('button',{name:/issue the drop pass/i}).click()
      await assert.text(page.locator('.issued-pass[role="status"]'),/crew cleared/i);await auditA11y('pass issued');await capture('pass-issued')
      await page.getByRole('button',{name:/build another crew/i}).click();await assert.visible(page.getByRole('button',{name:/issue the drop pass/i}))
    }
  },
  {
    name:'mobile campaign story controls',viewports:['mobile'],covers:['story-prev','story-next'],
    async run({page,assert}){const label=page.locator('.mobile-story span');await assert.text(label,/block open/i);await page.getByRole('button',{name:/next campaign story/i}).click();await assert.text(label,/crew up/i);await page.getByRole('button',{name:/previous campaign story/i}).click();await assert.text(label,/block open/i)}
  }
]

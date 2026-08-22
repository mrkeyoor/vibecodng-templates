export default [
 {name:'interactive globe route planner',viewports:['mobile','desktop'],covers:['globe-route','globe-rotate'],async run({page,assert,auditA11y,capture}){
   await page.locator('.route-orbit').scrollIntoViewIfNeeded()
   await page.getByRole('button',{name:/Dubai/}).click()
   await assert.text(page.locator('.globe-controls strong'),/DWC/)
   await page.getByRole('button',{name:'Rotate globe east'}).click()
   await page.getByRole('button',{name:/Nice/}).click()
   await assert.text(page.locator('.globe-controls strong'),/NCE/)
   await auditA11y('route globe');await capture('route-globe')
 }},
 {name:'complete flight dossier',viewports:['mobile','desktop'],covers:['route-origin','route-destination','party-size','range-profile','flight-priority','dispatch-next','clear-dossier'],async run({page,assert,auditA11y,capture}){
   await page.locator('#dispatch').scrollIntoViewIfNeeded()
   await page.getByLabel('Origin').selectOption({label:'Teterboro'})
   await page.getByLabel('Destination').selectOption({label:'Dubai'})
   const mobile=(page.viewportSize()?.width||0)<700
   if(mobile)await page.getByRole('button',{name:/Next field/i}).click()
   await page.getByRole('button',{name:/12 travellers/i}).click()
   if(mobile)await page.getByRole('button',{name:/Next field/i}).click()
   await page.getByRole('button',{name:'Intercontinental'}).click()
   if(mobile)await page.getByRole('button',{name:/Next field/i}).click()
   await page.getByRole('button',{name:'Nonstop preference'}).click()
   if(mobile)await page.getByRole('button',{name:/Clear dossier/i}).click();else await page.getByRole('button',{name:/Run dispatch match/i}).click()
   await assert.visible(page.locator('.dossier.cleared'))
   await assert.text(page.locator('.dossier.cleared'),/Aster 700/)
   await assert.text(page.locator('.dossier.cleared'),/TEB → DWC/)
   await auditA11y('cleared flight dossier');await capture('cleared-dossier')
 }},
 {name:'fleet mission controls',viewports:['mobile','desktop'],covers:['fleet-prev','fleet-select','fleet-next'],async run({page,assert,auditA11y,capture}){
   await page.locator('#fleet').scrollIntoViewIfNeeded()
   const mobile=(page.viewportSize()?.width||0)<700
   if(mobile){await page.getByRole('button',{name:'Next aircraft'}).click();await assert.text(page.locator('.fleet-stage h3'),/Aster 700/);await page.getByRole('button',{name:'Previous aircraft'}).click()}else{await page.locator('[data-qa-action="fleet-select"]').nth(2).click();await assert.text(page.locator('.fleet-stage h3'),/Aster 700/)}
   await auditA11y('fleet selection');await capture('fleet-selection')
 }},
 {name:'enquiry validation and confirmation',viewports:['mobile','desktop'],covers:['enquiry-submit'],async run({page,assert,auditA11y,capture}){
   await page.locator('#enquire').scrollIntoViewIfNeeded()
   await page.getByRole('button',{name:/Send to flight manager/i}).click()
   await assert.visible(page.getByRole('alert'))
   await page.getByLabel('Name').fill('Studio Audit')
   await page.getByLabel('Email').fill('audit@example.com')
   await page.getByLabel('Preferred departure date').fill('2026-10-14')
   await page.getByLabel('Context for the flight').fill('Six travellers, working cabin and discreet ground transfer required.')
   await page.getByLabel(/I understand this is illustrative/i).check()
   await page.getByRole('button',{name:/Send to flight manager/i}).click()
   await assert.text(page.getByRole('status'),/NL–2608/)
   await auditA11y('dispatch confirmation');await capture('dispatch-confirmation')
 }}
]

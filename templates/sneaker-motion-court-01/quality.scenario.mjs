export default [
  {
    name:'mobile sneaker-box frames',viewports:['mobile'],covers:['frame-prev','frame-next'],
    async run({page,assert}){const label=page.locator('.mobile-box-control span');await assert.text(label,/crossing/i);await page.getByRole('button',{name:/next unboxing frame/i}).click();await assert.text(label,/pivot/i);await page.getByRole('button',{name:/previous unboxing frame/i}).click();await assert.text(label,/crossing/i)}
  },
  {
    name:'lace route and colorway',viewports:['mobile','desktop'],covers:['route-select','color-select'],
    async run({page,assert,capture,auditA11y}){await page.locator('#lace-route').scrollIntoViewIfNeeded();await page.getByRole('button',{name:/dance/i}).click();await assert.text(page.locator('.route-result'),/dance route/i);await page.getByRole('button',{name:/choose signal cobalt/i}).click();await assert.attribute(page.getByRole('button',{name:/choose signal cobalt/i}),'aria-pressed','true');await auditA11y('lace route resolved');await capture('lace-route-ready')}
  },
  {
    name:'first-step validation and completion',viewports:['mobile','desktop'],covers:['size-select','ticket-submit','ticket-reset'],
    async run({page,assert,auditA11y,capture}){await page.locator('#ticket').scrollIntoViewIfNeeded();await page.getByRole('button',{name:/issue first-step ticket/i}).click();await assert.visible(page.getByText(/choose a size for the box label/i));await auditA11y('ticket errors');await page.getByRole('button',{name:'US 9',exact:true}).click();await page.locator('input[name=name]').fill('Route Audit');await page.locator('input[name=email]').fill('route@example.com');await page.getByRole('button',{name:/issue first-step ticket/i}).click();await assert.text(page.locator('.ticket-issued[role=status]'),/step cleared/i);await auditA11y('ticket issued');await capture('ticket-issued');await page.getByRole('button',{name:/lace another route/i}).click();await assert.visible(page.getByRole('button',{name:/issue first-step ticket/i}))}
  }
]

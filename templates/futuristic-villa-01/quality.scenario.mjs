export default [
  {
    name: "villa spatial promenade",
    viewports: ["mobile", "desktop"],
    covers: ["room-coordinate", "itinerary-room"],
    async run({ page, assert, auditA11y, capture }) {
      await page.locator(".promenade").scrollIntoViewIfNeeded();
      await page
        .locator(".level-rail")
        .getByRole("button", { name: /L01 Water court/ })
        .click();
      await assert.text(page.locator(".coordinate-card strong"), /Water court/);
      await page.locator("#itinerary").scrollIntoViewIfNeeded();
      await page
        .locator(".plan-strip")
        .getByRole("button", { name: /L02 Roof horizon/ })
        .click();
      await assert.text(page.locator(".itinerary article h3"), /Roof horizon/);
      await auditA11y("roof coordinate");
      await capture("roof-coordinate");
    },
  },
  {
    name: "daylight and visit brief",
    viewports: ["mobile", "desktop"],
    covers: ["sun-period", "visit-interest", "visit-submit"],
    async run({ page, assert, auditA11y, capture }) {
      await page.locator("#daylight").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: /Evening/ }).click();
      await assert.text(page.locator(".daylight aside>span"), /EVENING MODEL/);
      await page.locator("#visit").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Material craft" }).click();
      await assert.text(page.locator(".visit aside"), /Material craft/);
      await page.getByRole("button", { name: /REQUEST PRIVATE VISIT/ }).click();
      await assert.visible(page.getByRole("alert"));
      await page
        .getByRole("textbox", { name: "Name", exact: true })
        .fill("Spatial Audit");
      await page
        .getByRole("textbox", { name: "Email", exact: true })
        .fill("audit@example.com");
      await page
        .getByLabel("Preferred window")
        .selectOption({ label: "October / Evening" });
      await page.getByLabel(/I understand Casa Nadir/i).check();
      await page.getByRole("button", { name: /REQUEST PRIVATE VISIT/ }).click();
      await assert.text(page.getByRole("status"), /section is prepared/i);
      await auditA11y("visit confirmed");
      await capture("visit-confirmed");
    },
  },
];

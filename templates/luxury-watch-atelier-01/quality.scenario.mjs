export default [
  {
    name: "exploded calibre bench",
    viewports: ["mobile", "desktop"],
    covers: ["calibre-state", "crown-step"],
    async run({ page, assert, auditA11y, capture }) {
      await page.locator(".bench").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: /Open 100/ }).click();
      await assert.text(page.locator(".calibre-hud strong"), /FULLY OPEN/);
      await page.getByRole("button", { name: /WIND CROWN/ }).click();
      await assert.text(page.locator(".calibre-hud"), /CROWN 30°/);
      await page.getByRole("button", { name: /Train 052/ }).click();
      await assert.text(page.locator(".calibre-hud strong"), /TRAIN EXPOSED/);
      await auditA11y("opened calibre");
      await capture("opened-calibre");
    },
  },
  {
    name: "collector materials and allocation",
    viewports: ["mobile", "desktop"],
    covers: ["material-choice", "strap-choice", "config-submit"],
    async run({ page, assert, auditA11y, capture }) {
      await page.locator("#configure").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: /Warm titanium/ }).click();
      await page.getByRole("button", { name: /Graphite textile/ }).click();
      await assert.text(page.locator(".spec-slip"), /Warm titanium/);
      await assert.text(page.locator(".spec-slip"), /Graphite textile/);
      await page.getByRole("button", { name: /REQUEST ALLOCATION/ }).click();
      await assert.visible(page.getByRole("alert"));
      await page.getByRole("textbox", { name: "Name", exact: true }).fill("Collector Audit");
      await page.getByRole("textbox", { name: "Email", exact: true }).fill("collector@example.com");
      await page
        .getByLabel(/I understand this is a fictional atelier/i)
        .check();
      await page.getByRole("button", { name: /REQUEST ALLOCATION/ }).click();
      await assert.text(page.getByRole("status"), /on the bench/i);
      await auditA11y("allocation success");
      await capture("allocation-success");
    },
  },
];

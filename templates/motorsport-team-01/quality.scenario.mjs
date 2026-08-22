export default [
  {
    name: "telemetry track simulation",
    viewports: ["mobile", "desktop"],
    covers: ["telemetry-sector", "telemetry-channel", "telemetry-frame"],
    async run({ page, assert, auditA11y, capture }) {
      await page.locator(".telemetry-lab").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: /S3 COMMIT/i }).click();
      await page.getByRole("button", { name: "Brake", exact: true }).click();
      await assert.text(page.locator(".trace-card strong"), /4.8 G/);
      await page.getByRole("button", { name: "Step race clock forward" }).click();
      await assert.text(page.locator(".race-clock b"), /091/);
      await auditA11y("telemetry simulation");
      await capture("telemetry-simulation");
    },
  },
  {
    name: "complete pit wall strategy call",
    viewports: ["mobile", "desktop"],
    covers: [
      "strategy-compound",
      "strategy-lap",
      "strategy-weather",
      "strategy-traffic",
      "strategy-call",
      "mobile-compound",
      "mobile-lap",
      "mobile-weather",
      "mobile-traffic",
      "radio-next",
    ],
    async run({ page, assert, auditA11y, capture }) {
      await page.getByRole("link", { name: /open strategy channel/i }).click();
      const mobile = page.viewportSize().width < 700;
      if (mobile) {
        const c = page.locator(".mobile-console");
        await c.getByRole("button", { name: /soft/i }).click();
        await c.getByRole("button", { name: /next/i }).click();
        await c.getByRole("button", { name: /lap 24/i }).click();
        await c.getByRole("button", { name: /next/i }).click();
        await c.getByRole("button", { name: /drizzle/i }).click();
        await c.getByRole("button", { name: /next/i }).click();
        await c.getByRole("button", { name: /pack/i }).click();
        await c.getByRole("button", { name: /call/i }).click();
      } else {
        const c = page.locator(".desktop-console");
        await c.getByRole("button", { name: "Soft", exact: true }).click();
        await c.getByRole("button", { name: "LAP 24", exact: true }).click();
        await c.getByRole("button", { name: "Drizzle", exact: true }).click();
        await c.getByRole("button", { name: "Pack", exact: true }).click();
        await c.getByRole("button", { name: /call strategy/i }).click();
      }
      await assert.text(page.locator(".strategy-ticket"), /BOX LAP 22/);
      await assert.text(page.locator(".strategy-ticket"), /INTERMEDIATE/);
      await auditA11y("strategy called");
      await capture("strategy-called");
    },
  },
  {
    name: "radio channel selection",
    viewports: ["mobile", "desktop"],
    covers: ["radio-channel"],
    async run({ page, assert, auditA11y, capture }) {
      await page.getByRole("link", { name: /team/i }).click();
      await page
        .locator(".channel")
        .getByRole("button", { name: /garage/i })
        .click();
      await assert.text(
        page.locator(".transcript"),
        /Blankets set for medium/i,
      );
      await auditA11y("garage radio channel");
      await capture("garage-channel");
    },
  },
  {
    name: "paddock request validation and success",
    viewports: ["mobile", "desktop"],
    covers: ["tier-select", "paddock-submit"],
    async run({ page, assert, auditA11y, capture }) {
      await page.goto(page.url().split("#")[0] + "#paddock");
      await page.getByRole("button", { name: /partner/i }).click();
      await page
        .getByRole("button", { name: /request partner access/i })
        .click();
      await assert.visible(page.getByRole("alert"));
      await page.getByLabel(/full name/i).fill("Race Audit");
      await page.getByLabel(/^email$/i).fill("audit@example.com");
      await page.getByLabel(/home country/i).fill("United Kingdom");
      await page
        .getByRole("button", { name: /request partner access/i })
        .click();
      await assert.text(page.getByRole("status"), /AW–2708/);
      await auditA11y("paddock confirmation");
      await capture("paddock-confirmed");
    },
  },
];

export default [
  {
    name: "product index keyboard lifecycle",
    viewports: ["mobile", "desktop"],
    covers: ["menu"],
    async run({ page, assert, auditA11y, capture }) {
      const trigger = page.getByRole("button", { name: /index/i });
      await trigger.focus();
      await trigger.click();
      await assert.visible(
        page.getByRole("dialog", { name: /product index/i }),
      );
      await auditA11y("product index open");
      await page.keyboard.press("Escape");
      await assert.hidden(page.getByRole("dialog", { name: /product index/i }));
      await assert.focused(trigger);
      await capture("index-closed");
    },
  },
  {
    name: "theme specimen browsing",
    viewports: ["mobile", "desktop"],
    covers: ["theme-select", "theme-cycle"],
    async run({ page, assert, capture }) {
      const section = page.locator("#themes");
      await section.getByRole("button", { name: /ATRIA Stays/ }).click();
      await assert.text(section, /ATRIA Stays/);
      await assert.text(section, /Room collection types/);
      await section.getByRole("button", { name: /next theme/i }).click();
      await assert.text(section, /NOVA Commerce/);
      await capture("theme-browsed");
    },
  },
  {
    name: "plugin stack compilation",
    viewports: ["mobile", "desktop"],
    covers: ["plugin-toggle", "support-select"],
    async run({ page, assert, auditA11y, capture }) {
      const compiler = page.locator("#compiler");
      await compiler.getByRole("button", { name: /Checkout Boost/ }).click();
      await assert.text(compiler, /3 optional modules/);
      await compiler.getByRole("button", { name: /Agency channel/ }).click();
      await assert.text(compiler, /Agency channel/);
      await auditA11y("compiled stack");
      await capture("stack-compiled");
    },
  },
  {
    name: "manifest validation and issue",
    viewports: ["mobile", "desktop"],
    covers: ["manifest-submit", "manifest-reset"],
    async run({ page, assert, auditA11y, capture }) {
      const manifest = page.locator("#manifest");
      await manifest.getByRole("button", { name: /compile manifest/i }).click();
      await assert.text(manifest, /Add your name/);
      await assert.text(manifest, /Add a valid email/);
      await manifest.getByLabel(/^Name$/).fill("Release Studio");
      await manifest.getByLabel(/^Email$/).fill("release@example.com");
      await manifest.getByRole("button", { name: /compile manifest/i }).click();
      await assert.text(manifest, /MANIFEST ISSUED/);
      await assert.text(manifest, /BC-01-2S-216/);
      await auditA11y("manifest issued");
      await capture("manifest-issued");
      await manifest.getByRole("button", { name: /compile another/i }).click();
      await assert.visible(
        manifest.getByRole("button", { name: /compile manifest/i }),
      );
    },
  },
];

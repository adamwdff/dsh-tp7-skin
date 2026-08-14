# 🐬 Turbo Pascal 7.0 Blue-Screen Skin (DSH Web GUI)

English | [简体中文](README.md)

Recreates the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web GUI in the classic **Turbo Pascal 7.0 IDE (1992)** look: deep-blue desktop, striped menu bar, menu-style highlights, DOS 3D beveled controls, block caret, and a TP status bar.

![skin-preview](docs/preview.png)

> Add a screenshot as `docs/preview.png` (~1280×800) to show the actual result in this README.

## ✨ Features

| Area | Effect |
| --- | --- |
| Desktop background | Classic TP blue `#0000AA`, black message surface |
| Header menu bar | TP7.0 diagonal-stripe background + gray divider line |
| chat / trajectory tabs | TP7.0 menu-style highlight: selected tab **inverse white-on-deep-blue**, unselected transparent white, hover deep blue |
| Breadcrumb navigation | Transparent with light text, hover deep blue |
| Top-left brand logo | Transparent menu style, hover deep-blue highlight |
| Sidebar workspace buttons | Search / view options / new — all transparent white icons |
| Plugin config cards | Deep-blue card + white plugin name, readable header |
| Regular buttons / inputs | DOS 3D bevel (raised buttons, recessed inputs, inverted on press) |
| Caret / selection / focus | Bright-green **block caret**, inverse-video selection, yellow focus ring |
| Scrollbars | Square gray thumb + deep-blue track |
| Bottom status bar | `F1 Help \| F2 Save \| F3 Open \| F9 Compile \| F10 Menu` |
| Typography | System sans for legibility (Arial / Segoe UI family), monospace preserved for code |

## 🚀 Installation

This is a **client-side (browser) plugin only** — no Host logic involved. Pick either installation method:

### Option 1: Dynamic plugin (recommended, zero modification)

In your DSH session, ask the agent to:

1. Run `cordis_define` to create a new plugin with `idPrefix` set to `tpsk`;
2. Pass the full contents of [`plugin/dynamic.js`](plugin/dynamic.js) as `code.client` (leave `code.host` empty);
3. Run `cordis_run` to activate, approve, then refresh the page.

> Dynamic plugins are session-scoped and in-memory; they need to be re-loaded after a restart. Great for a quick try.

### Option 2: Fixed plugin (integrate into the DeepSeek Harness repo)

Copy this directory's `src/`, `package.json`, `tsconfig.json`, and `tsdown.config.ts` into the repo as `packages/client/ui-tp7-skin/`, then:

1. Add a row to the browser roster in `packages/bundle/web-app/cordis.patch.yml`:

   ```yaml
   - id: ui-tp7-skin
     name: '@deepseek-ai/dsh-client-ui-tp7-skin'
   ```

2. Add the dependency to `packages/bundle/web-app/package.json`:

   ```json
   "@deepseek-ai/dsh-client-ui-tp7-skin": "workspace:^"
   ```

3. Add the reference in the root `tsconfig.client.json`:

   ```json
   { "path": "./packages/client/ui-tp7-skin" }
   ```

4. Build and restart:

   ```sh
   pnpm install
   pnpm --filter @deepseek-ai/dsh-client-ui-tp7-skin bundle
   pnpm run build:lib:client
   ```

   After restarting `dsh --profile web`, the skin applies automatically and appears under **Settings → Plugins (Plugin list)**.

## 📁 Directory Layout

```
dsh-tp7-skin/
├── README.md                 # This document
├── LICENSE                   # MIT license
├── package.json              # Fixed-plugin package metadata
├── tsconfig.json             # TypeScript config (client)
├── tsdown.config.ts          # tsdown bundle config
├── plugin/
│   └── dynamic.js            # Dynamic-plugin edition (single file for cordis_define)
└── src/
    ├── css-modules.d.ts      # CSS Modules type declarations
    ├── index.ts              # Node half (empty apply)
    ├── invariant.ts          # Invariant companion package
    └── client/
        ├── index.ts          # Browser half: token overrides + status-bar registration
        └── skin.module.css   # Global skin stylesheet (:global rules)
```

## 🧩 How It Works

- **Theme token overrides**: `theme.overrideTokens` locks all 13 `--dsw-alias-*` tokens to the TP7.0 palette (light == dark), so the skin does not follow the OS scheme;
- **Global stylesheet injection**: the CSS ships as `.module.css`; the build pipeline auto-injects a `<style data-plugin-css>` tag that is removed with the plugin fiber. Every rule is wrapped in `:global` and targets regions through slot wrappers (`[data-slot='...']`) instead of hashed class names;
- **Status bar**: registered into the `conversation.composer.dock` slot (list entry `tp7-statusbar`), rendered with `React.createElement`.

## ⚖️ License

[MIT](LICENSE) © 2025

---

**Acknowledgements**: Design homage to the Borland Turbo Pascal 7.0 IDE (1992) — the blue screen that accompanied a generation of programmers.

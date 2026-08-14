/**
 * Turbo Pascal 7.0 blue-screen skin — DYNAMIC PLUGIN EDITION (single file).
 *
 * Use with the DeepSeek Harness dynamic Cordis plugin flow:
 *   1. cordis_define  →  plugin.kind: "new", idPrefix: "tpsk"
 *   2. code.client    →  the full contents of this file
 *      code.host      →  omit / leave empty
 *   3. cordis_run     →  approve, then refresh the page.
 *
 * This is the browser half only (pure presentation). All side effects
 * (token override layer, injected stylesheet, status-bar slot entry) are
 * fiber-owned and removed on stop / update / undefine.
 */
return {
  apply(ctx) {
    // 1) Theme alias tokens locked to the TP7.0 palette (light == dark).
    const theme = ctx.get('theme')
    if (theme !== undefined) {
      const tokens = {
        '--dsw-alias-bg-base': { light: '#0000AA', dark: '#0000AA' },
        '--dsw-alias-bg-layer-1': { light: '#000080', dark: '#000080' },
        '--dsw-alias-bg-layer-2': { light: '#000000', dark: '#000000' },
        '--dsw-alias-bg-overlay': { light: '#000080', dark: '#000080' },
        '--dsw-alias-border-l1': { light: '#AAAAAA', dark: '#AAAAAA' },
        '--dsw-alias-border-l2': { light: '#C0C0C0', dark: '#C0C0C0' },
        '--dsw-alias-brand-primary': { light: '#55FFFF', dark: '#55FFFF' },
        '--dsw-alias-label-primary': { light: '#C0C0C0', dark: '#C0C0C0' },
        '--dsw-alias-label-secondary': { light: '#00AAAA', dark: '#00AAAA' },
        '--dsw-alias-state-error-primary': { light: '#FF5555', dark: '#FF5555' },
        '--dsw-alias-state-success-primary': { light: '#55FF55', dark: '#55FF55' },
        '--dsw-alias-state-warn-primary': { light: '#FFFF55', dark: '#FFFF55' },
        '--dsw-specific-sidebar-fill': { light: '#000080', dark: '#000080' },
      }
      ctx.effect(() => theme.overrideTokens('pascal-tp7-skin', tokens))
    }

    // 2) Global skin stylesheet.
    ctx.effect(() => styles.insert(`
      /* Fonts: system sans for legibility; monospace preserved for code */
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif !important;
        border-radius: 0 !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      code, pre, kbd, samp {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, 'Courier New', monospace !important;
      }

      /* DOS 3D raised buttons */
      button {
        box-shadow: inset -1px -1px 0 #404040, inset 1px 1px 0 #FFFFFF, inset -2px -2px 0 #808080, inset 2px 2px 0 #E8E8E8 !important;
        background-color: #C0C0C0 !important;
        color: #000000 !important;
      }
      button:active {
        box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #FFFFFF !important;
      }
      button:disabled { color: #808080 !important; }

      /* Recessed inputs + block caret */
      input, textarea, select {
        box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #FFFFFF !important;
        background-color: #000000 !important;
        color: #C0C0C0 !important;
        caret-shape: block;
        caret-color: #55FF55;
      }

      /* Square scrollbars */
      ::-webkit-scrollbar { width: 14px; height: 14px; }
      ::-webkit-scrollbar-track { background: #000080; }
      ::-webkit-scrollbar-thumb { background: #C0C0C0; border: 2px solid #000080; }
      ::-webkit-scrollbar-thumb:hover { background: #FFFFFF; }
      ::-webkit-scrollbar-corner { background: #000080; }

      /* Inverse-video selection */
      ::selection { background: #C0C0C0; color: #000000; }

      /* TP-style yellow focus ring */
      :focus-visible { outline: 2px solid #FFFF55 !important; }

      /* ============ TP7.0 menu bar: striped header ============ */
      [data-slot='conversation.session.header'] > header {
        background-color: #0000AA !important;
        background-image: repeating-linear-gradient(
          45deg,
          #0000AA 0px,
          #0000AA 6px,
          #2424C4 6px,
          #2424C4 12px
        ) !important;
        border-bottom: 2px solid #808080 !important;
        padding-bottom: 0 !important;
      }
      [data-slot='conversation.session.header'] > header::after {
        display: none !important;
      }

      /* Breadcrumbs: transparent, light text */
      [data-slot='conversation.session.header'] nav button {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        padding: 4px 8px !important;
        color: #D8D8FF !important;
      }
      [data-slot='conversation.session.header'] nav button:hover:not(:disabled) {
        background: #000080 !important;
      }
      [data-slot='conversation.session.header'] nav button:disabled {
        color: #FFFFFF !important;
      }
      [data-slot='conversation.session.header'] nav span {
        color: #9090E0 !important;
      }

      /* View tabs (chat / trajectory): TP7.0 menu-style highlight */
      [data-slot='conversation.session.header'] [role='tablist'] {
        gap: 4px !important;
        margin-top: 0 !important;
        padding-left: 8px !important;
      }
      [data-slot='conversation.session.header'] [role='tab'] {
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
        padding: 4px 14px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 20px !important;
        color: #FFFFFF !important;
        cursor: pointer;
      }
      [data-slot='conversation.session.header'] [role='tab']:hover:not([aria-selected='true']) {
        background: #000080 !important;
      }
      [data-slot='conversation.session.header'] [role='tab'][aria-selected='true'] {
        background: #FFFFFF !important;
        color: #0000AA !important;
        box-shadow: none !important;
      }
      [data-slot='conversation.session.header'] [role='tab']:active {
        box-shadow: none !important;
      }
      [data-slot='conversation.session.header'] [role='tab']::after {
        display: none !important;
      }

      /* ============ Sidebar: brand logo + collapse toggle ============ */
      [data-slot='sidebar'] button:has(svg[viewBox='0 0 182 24']) {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        color: #FFFFFF !important;
      }
      [data-slot='sidebar'] button:has(svg[viewBox='0 0 182 24']):hover {
        background: #000080 !important;
      }
      [data-slot='sidebar'] button:has(svg[viewBox='0 0 23.16 17.04']) {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        color: #FFFFFF !important;
      }
      [data-slot='sidebar'] button:has(svg[viewBox='0 0 23.16 17.04']):hover {
        background: #000080 !important;
      }

      /* ============ Sidebar workspace header: secondary icon buttons ============ */
      [data-slot='sidebar.workspaces'] > div > div:first-child button {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        color: #FFFFFF !important;
      }
      [data-slot='sidebar.workspaces'] > div > div:first-child button:hover {
        background: #000080 !important;
      }
      [data-slot='sidebar.workspaces'] > div > div:first-child button:active {
        box-shadow: none !important;
      }

      /* ============ Settings: plugin-config card headers readable ============ */
      [data-slot='settings.plugin.item'] li {
        background: #000080 !important;
        border-color: #808080 !important;
      }
      [data-slot='settings.plugin.item'] li > button:first-child {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        color: #FFFFFF !important;
      }
      [data-slot='settings.plugin.item'] li > button:first-child:hover {
        background: #0000AA !important;
      }
      [data-slot='settings.plugin.item'] li > button:first-child span {
        color: #FFFFFF !important;
      }

      /* ============ Settings plugins area: tabs (Plugin list / Plugin configuration) ============ */
      [data-slot='settings.section'] [role='tablist'] {
        gap: 4px !important;
        margin-top: 0 !important;
        padding-left: 8px !important;
      }
      [data-slot='settings.section'] [role='tab'] {
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
        padding: 4px 14px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 20px !important;
        color: #FFFFFF !important;
        cursor: pointer;
      }
      [data-slot='settings.section'] [role='tab']:hover:not([aria-selected='true']) {
        background: #000080 !important;
      }
      [data-slot='settings.section'] [role='tab'][aria-selected='true'] {
        background: #FFFFFF !important;
        color: #0000AA !important;
        box-shadow: none !important;
      }
      [data-slot='settings.section'] [role='tab']:active {
        box-shadow: none !important;
      }
      [data-slot='settings.section'] [role='tab']::after {
        display: none !important;
      }

      /* Plugin list (inventory) cards: deep-blue card, transparent header, white title */
      [data-slot='settings.section'] li[data-plugin-entry] {
        background: #000080 !important;
        border-color: #808080 !important;
      }
      [data-slot='settings.section'] li[data-plugin-entry] > button {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        color: #FFFFFF !important;
      }
      [data-slot='settings.section'] li[data-plugin-entry] > button:hover {
        background: #0000AA !important;
      }
      [data-slot='settings.section'] li[data-plugin-entry] > button strong {
        color: #FFFFFF !important;
      }
      [data-slot='settings.section'] li[data-plugin-entry] > button span {
        color: #C0C0C0 !important;
      }

      /* ============ Settings Appearance row: theme preference cubes ============ */
      [data-slot='settings.general.item'] [aria-pressed] {
        box-shadow: none !important;
        background: transparent !important;
        border: 1px solid #808080 !important;
        border-radius: 0 !important;
        padding: 20px 32px !important;
        color: #C0C0C0 !important;
        font-size: 14px !important;
        line-height: 22px !important;
      }
      [data-slot='settings.general.item'] [aria-pressed]:hover {
        background: #000080 !important;
        color: #FFFFFF !important;
      }
      [data-slot='settings.general.item'] [aria-pressed='true'] {
        background: #FFFFFF !important;
        border-color: #FFFFFF !important;
        color: #0000AA !important;
        box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #E8E8E8 !important;
      }
      [data-slot='settings.general.item'] [aria-pressed]:active {
        box-shadow: none !important;
      }
      [data-slot='settings.general.item'] [aria-pressed] svg {
        color: inherit !important;
      }

      /* ============ TP7.0 status bar ============ */
      .tp7-statusbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #C0C0C0;
        color: #000000;
        border-top: 2px solid #FFFFFF;
        border-left: 1px solid #FFFFFF;
        border-right: 2px solid #404040;
        border-bottom: 2px solid #808080;
        padding: 1px 10px;
        font-size: 13px;
        line-height: 1.6;
        user-select: none;
      }
      .tp7-statusbar .tp7-sb-item { padding: 0 4px; }
      .tp7-statusbar .tp7-sb-sep { color: #000080; padding: 0 6px; }
    `))

    // 3) TP7.0 status bar under the composer.
    const slots = ctx.get('slots')
    if (slots !== undefined) {
      slots.inject('conversation.composer.dock', () => slots.register(
        { name: 'conversation.composer.dock', id: 'tp7-statusbar' },
        () => React.createElement(
          'div',
          { className: 'tp7-statusbar' },
          React.createElement('span', null,
            React.createElement('span', { className: 'tp7-sb-item' }, 'F1 Help'),
            React.createElement('span', { className: 'tp7-sb-sep' }, '|'),
            React.createElement('span', { className: 'tp7-sb-item' }, 'F2 Save'),
            React.createElement('span', { className: 'tp7-sb-sep' }, '|'),
            React.createElement('span', { className: 'tp7-sb-item' }, 'F3 Open'),
            React.createElement('span', { className: 'tp7-sb-sep' }, '|'),
            React.createElement('span', { className: 'tp7-sb-item' }, 'F9 Compile'),
            React.createElement('span', { className: 'tp7-sb-sep' }, '|'),
            React.createElement('span', { className: 'tp7-sb-item' }, 'F10 Menu')
          ),
          React.createElement('span', null,
            React.createElement('span', { className: 'tp7-sb-item' }, 'TP 7.0 Skin'),
            React.createElement('span', { className: 'tp7-sb-sep' }, '|'),
            React.createElement('span', { className: 'tp7-sb-item' }, 'Line 1, Col 1')
          )
        )
      ))
    }
  },
}

/**
 * Turbo Pascal 7.0 blue-screen skin plugin, browser half. Stacks a full
 * alias-token override layer over the active theme (locked to the TP7.0
 * palette in both light and dark), injects the global skin stylesheet via the
 * CSS Modules pipeline, and registers a TP7.0 status bar into the composer
 * dock. Pure presentation: no store, no events, nothing host-side.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the ui-conversation SlotMap merge (the composer.dock entry).
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import { createElement, type ReactElement } from 'react'
// Import the stylesheet for its side effect: the CSS Modules pipeline injects
// one <style data-plugin-css> tag per module file and removes it with the fiber.
import './skin.module.css'

/** TP7.0 palette applied to every alias token (light and dark share it). */
const TP7_TOKENS: ThemeTokenOverrides = {
  '--dsw-alias-bg-base': { light: '#0000AA', dark: '#0000AA' },
  '--dsw-alias-bg-layer-1': { light: '#000080', dark: '#000080' },
  '--dsw-alias-bg-layer-2': { light: '#000080', dark: '#000080' },
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
  // Surfaces that must read as the desktop itself, not white blocks: the
  // composer card around the input and the markdown code / inline-code
  // surfaces behind English text all match the deep-blue base.
  '--dsw-specific-input-major': { light: '#0000AA', dark: '#0000AA' },
  '--dsw-alias-markdown-code-block': { light: '#0000AA', dark: '#0000AA' },
  '--dsw-alias-markdown-code-block-banner': { light: '#000080', dark: '#000080' },
  '--dsw-alias-markdown-inline-code': { light: '#0000AA', dark: '#0000AA' },
}

/**
 * TP7.0 status bar: key hints on the left, skin identity on the right.
 * @returns the status-bar element.
 */
function Tp7StatusBar(): ReactElement {
  return createElement(
    'div',
    { className: 'tp7-statusbar' },
    createElement('span', null,
      createElement('span', { className: 'tp7-sb-item' }, 'F1 Help'),
      createElement('span', { className: 'tp7-sb-sep' }, '|'),
      createElement('span', { className: 'tp7-sb-item' }, 'F2 Save'),
      createElement('span', { className: 'tp7-sb-sep' }, '|'),
      createElement('span', { className: 'tp7-sb-item' }, 'F3 Open'),
      createElement('span', { className: 'tp7-sb-sep' }, '|'),
      createElement('span', { className: 'tp7-sb-item' }, 'F9 Compile'),
      createElement('span', { className: 'tp7-sb-sep' }, '|'),
      createElement('span', { className: 'tp7-sb-item' }, 'F10 Menu'),
    ),
    createElement('span', null,
      createElement('span', { className: 'tp7-sb-item' }, 'TP 7.0 Skin'),
      createElement('span', { className: 'tp7-sb-sep' }, '|'),
      createElement('span', { className: 'tp7-sb-item' }, 'Line 1, Col 1'),
    ),
  )
}

/** Required services: slots for the status-bar dock entry. */
export const inject = ['slots']

/**
 * Client plugin body: stack the token override layer and register the status bar.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  const theme = ctx.get('theme')
  if (theme !== undefined) {
    ctx.effect(() => theme.overrideTokens('ui-tp7-skin', TP7_TOKENS), 'ui-tp7-skin: token override layer')
  }

  ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register(
    { name: 'conversation.composer.dock', id: 'tp7-statusbar' },
    () => Tp7StatusBar(),
  ))
}

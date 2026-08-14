/**
 * Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-tp7-skin`.
 * @module @deepseek-ai/dsh-client-ui-tp7-skin/invariant
 */

/* jscpd:ignore-start */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-tp7-skin'

/** Cordis companion plugin name. */
export const name = 'client-ui-tp7-skin-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: the skin only stacks a token-override layer through
 * the theme registry and registers one composer status-bar dock entry, both
 * of which are removed with the plugin fiber; it owns no store and emits no
 * cordis events.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */

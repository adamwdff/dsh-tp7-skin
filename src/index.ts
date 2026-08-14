/**
 * Turbo Pascal 7.0 blue-screen skin plugin, node half. Pure UI plugin: the
 * empty apply exists so the plugin appears in the host cordis.yml / Loader;
 * the browser half ships via exports["./client"], discovered through the
 * package.json dsh.client declaration.
 */

/** Host plugin body — no host-side behavior for this skin plugin. */
export function apply(): void {}

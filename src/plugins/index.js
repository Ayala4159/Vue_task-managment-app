/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'

export function registerPlugins (app) {
  app
    .use(vuetify)
}
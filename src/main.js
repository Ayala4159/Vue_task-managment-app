/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'

// Pinia
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
registerPlugins(app)

app.mount('#app')

// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GL from '../../components/GL.vue'
export default {
    extends: DefaultTheme,
    async enhanceApp({ app }) {
        // register your custom global components
        app.component("GL", GL)
    }
} satisfies Theme
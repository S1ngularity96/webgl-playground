import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WebGL Playground",
  description: "Notes about experience with WebGL",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Fundamentals',
        items: [
          { text: 'Loading WebGL Context', link: '/sections/fundamentals/webgl-context.md' },
          { text: 'WebGL drawing modes', link: '/sections/fundamentals/webgl-modes.md'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  },
})

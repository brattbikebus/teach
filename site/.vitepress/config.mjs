import { defineConfig, loadEnv } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    vite: {
      css: {
        postcss: {},
      },
      optimizeDeps: {
        include: ["vuetify"],
      },
      ssr: {
        noExternal: ["vuetify"],
      },
    },
    title: "Teach in Brattleboro",
    description: "A project to support tachers in Brattleboro, VT",
    // https://vitepress.dev/guide/deploy#setting-a-public-base-path
    // set the base for GitHub Pages
    base: env.VITE_APP_BASE || '/',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Home", link: "index.md" },
        { text: "Resources", link: "resources.md" },
        { text: "Contact", link: "contact.md" },
        { text: "Contribute", link: "contribute.md" },
      ],
      socialLinks: [
        { icon: "github", link: "https://github.com/brattbikebus/teach" },
      ],

      // https://vitepress.dev/reference/default-theme-search#local-search
      search: {
        provider: "local",
      },
      // https://vitepress.dev/reference/default-theme-edit-link#site-level-config
      editLink: {
        pattern: ({ filePath }) => {
          // trim the .md suffix
          const path = filePath.replace(/\.md$/, "");
          // TODO: use env vars
          // const APP_FULL_URL = env.VITE_APP_FULL_URL || 'https://teach.brattleboro.town'
          const APP_FULL_URL = "https://teach.brattleboro.town";
          return `${APP_FULL_URL}/admin/#/edit/doc/${path}`;
        },
      },
    },
    head: [
      [ 'link', { rel: 'icon', href: '/favicon.ico' } ],
      [ 'script', {},`
        (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
        .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
        n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
        (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
        ml('account', '1867567');
      ` ],
    ],
    ignoreDeadLinks: true,
  };
});

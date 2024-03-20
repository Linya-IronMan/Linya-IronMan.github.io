// import DefaultTheme from 'vitepress/theme';

export default {
    // ...DefaultTheme,
    // Layout: MyLayout,
    enhanceApp({ app }) {
        // app.component('MyComponent', {
        //     template: '<div>My Component</div>',
        // });
    },
    title: 'VitePress',
    description: 'Just playing around.',
    themeConfig: {
        siteTitle: '',
        logo: '/my-logo.svg',
    },
    nav: [
        { text: 'Home', link: '/' },
        { text: 'Configs', link: '/configs' },
        {
            text: 'Dropdown Menu',
            items: [
                { text: 'Item A', link: '/item-1' },
                { text: 'Item B', link: '/item-2' },
                { text: 'Item C', link: '/item-3' },
            ],
        },
    ],
    sidebar: [
        {
            text: 'Guide',
            items: [
                { text: 'Introduction', link: '/introduction' },
                { text: 'Getting Started', link: '/getting-started' },
            ],
        },
    ],
};

import { MainNavItem, SidebarNavItem } from '@/lib/types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Components',
      href: '/docs/components/accordion'
    }
  ],
  sidebarNav: [
    {
      title: 'Blocks',
      items: [
        {
          title: 'Sidebar',
          href: '/docs/sidebar',
          items: []
        },
        // {
        //   title: "Client Data Table",
        //   href: "/docs/client-data-table",
        //   items: [],
        // },
      ]
    },
  ]
}

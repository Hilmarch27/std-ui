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
      title: 'Blocks Components',
      items: [
        {
          title: 'Sidebar',
          href: '/docs/sidebar',
          items: []
        }
      ]
    },
    {
      title: 'UI Components',
      items: [
        {
          title: 'Date Time Picker',
          href: '/docs/date-time-picker',
          items: []
        },
        {
          title: 'Floating Input',
          href: '/docs/floating-input',
          items: []
        },
        {
          title: 'Input File',
          href: '/docs/input-file',
          items: []
        },
        {
          title: 'Modal',
          href: '/docs/modal',
          items: []
        }
      ]
    }
  ]
}

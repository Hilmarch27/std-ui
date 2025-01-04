import { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
  ],
  sidebarNav: [
    {
      title: "Blocks",
      items: [
        {
          title: "Sidebar",
          href: "/docs/sidebar",
          items: [],
        },
      ],
    },
    // {
    //   title: "Bento Grid",
    //   items: [
    //     {
    //       title: "Music Bento Grid",
    //       href: "/docs/bento-grid-01",
    //       items: [],
    //     },
    //   ],
    // },
    // {
    //   title: "Bento Grid Cards",
    //   items: [
    //     {
    //       title: "Sonic Bento Card",
    //       href: "/docs/sonic-bento-card",
    //       items: [],
    //     },
    //     {
    //       title: "Animated Design Board",
    //       href: "/docs/animated-design-board-bento-card",
    //       items: [],
    //     },
    //   ],
    // },
    {
      title: "Components",
      items: [
        {
          title: "Hint",
          href: "/docs/hint",
          items: [],
        },
        {
          title: "Vertical List",
          href: "/docs/vertical-list",
          items: [],
        },
      ],
    },
    {
      title: "Error Page",
      items: [
        {
          title: "Forbidden Error",
          href: "/docs/forbidden-error",
          items: [],
        },
        {
          title: "General Error",
          href: "/docs/general-error",
          items: [],
        },
        {
          title: "Maintenance Error",
          href: "/docs/maintenance-error",
          items: [],
        },
        {
          title: "Not Found Error",
          href: "/docs/not-found-error",
          items: [],
        },
        {
          title: "Unauthorized Error",
          href: "/docs/unauthorized-error",
          items: [],
        },
      ],
    },
  ],
};

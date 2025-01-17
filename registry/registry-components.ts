import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "hint",
    type: "registry:ui",
    registryDependencies: ["tooltip"],
    files: ["ui/hint.tsx"],
  },
  {
    name: "vertical-list",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: ["ui/vertical-list.tsx"],
  },
  {
    name: "sidebar",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "button",
      "collapsible",
      "badge",
      "input",
      "dropdown-menu",
      "avatar",
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/sidebar/app-sidebar.tsx",
      "block/sidebar/data-sidebar.ts",
      "block/sidebar/nav-group.tsx",
      "block/sidebar/nav-user.tsx",
      "block/sidebar/team-switcher.tsx",
      "block/sidebar/types.ts",
    ],
  },
  {
    name: "client-data-table",
    type: "registry:block",
    registryDependencies: [
      "table",
      "button",
      "dropdown-menu",
      "checkbox",
      "badge",
      "command",
      "popover",
      "separator",
      "select",
      "input",
    ],
    dependencies: ["lucide-react", "@tanstack/react-table", "zod"],
    files: [
      "block/client-data-table/data/data.ts",
      "block/client-data-table/data/example.ts",
      "block/client-data-table/data/schema.ts",
      "block/client-data-table/column-header.tsx",
      "block/client-data-table/columns.tsx",
      "block/client-data-table/faceted-filter.tsx",
      "block/client-data-table/index.tsx",
      "block/client-data-table/pagination.tsx",
      "block/client-data-table/row-actions.tsx",
      "block/client-data-table/toolbar.tsx",
      "block/client-data-table/view-options.tsx",
    ],
  },
  {
    name: "forbidden-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: ["ui/forbidden-error.tsx"],
  },
  {
    name: "general-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: ["ui/general-error.tsx"],
  },
  {
    name: "maintenance-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: ["ui/maintenance-error.tsx"],
  },
  {
    name: "not-found-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: ["ui/not-found-error.tsx"],
  },
  {
    name: "unauthorized-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: ["ui/unauthorized-error.tsx"],
  },
];

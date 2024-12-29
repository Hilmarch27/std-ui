import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "tooltip-info",
    type: "registry:block",
    registryDependencies: [
      "tooltip",
    ],
    files: [
      "block/tooltip-info.tsx",
    ],
  },
];

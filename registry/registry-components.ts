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

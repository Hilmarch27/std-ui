import React from "react";

export const components = {
  // ui preview
  hint: {
    name: "hint",
    type: "registry:ui",
    registryDependencies: ["tooltip"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { cn } from "@/lib/utils";\r\nimport {\r\n  Tooltip,\r\n  TooltipContent,\r\n  TooltipProvider,\r\n  TooltipTrigger,\r\n} from "@/components/ui/tooltip";\r\n\r\ntype THint = {\r\n  content: string;\r\n  children: React.ReactNode;\r\n  direction?: "top" | "bottom" | "left" | "right";\r\n  className?: string;\r\n  asChild?: boolean;\r\n  onOpenChange?: (isOpen: boolean) => void;\r\n  enabled?: boolean;\r\n  delay?: number;\r\n};\r\n\r\nexport function Hint({\r\n  content,\r\n  children,\r\n  className,\r\n  direction = "top",\r\n  onOpenChange,\r\n  enabled = true,\r\n  delay = 2,\r\n}: THint) {\r\n  if (!enabled) return <>{children}</>;\r\n  return (\r\n    <>\r\n      <TooltipProvider>\r\n        <Tooltip delayDuration={delay} onOpenChange={onOpenChange}>\r\n          <TooltipTrigger asChild>{children}</TooltipTrigger>\r\n          <TooltipContent side={direction}>\r\n            <p className={cn("text-sm", className)}>{content}</p>\r\n          </TooltipContent>\r\n        </Tooltip>\r\n      </TooltipProvider>\r\n    </>\r\n  );\r\n}\r\n',
        path: "ui/hint.tsx",
        target: "components/ui/hint.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/hint")),
  },
} as const;

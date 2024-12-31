import React from "react";

export const components = {
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
  "vertical-list": {
    name: "vertical-list",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { Slot } from "@radix-ui/react-slot";\r\nimport { cn } from "@/lib/utils";\r\n\r\ntype Item = {\r\n  text: string;\r\n  subItems?: string[];\r\n  icon?: React.ReactNode;\r\n};\r\n\r\ninterface VerticalLineListProps {\r\n  items?: Item[];\r\n  className?: string;\r\n  asChild?: boolean;\r\n}\r\n\r\nexport function VerticalLineList({\r\n  items = [],\r\n  className,\r\n  asChild = false,\r\n}: VerticalLineListProps) {\r\n  const Comp = asChild ? Slot : "ul";\r\n\r\n  if (items.length === 0) {\r\n    return null;\r\n  }\r\n\r\n  return (\r\n    <Comp className={cn("relative", className)}>\r\n      {items.map((item, index) => (\r\n        <li key={index} className="pl-8 relative">\r\n          <div className="absolute left-0 top-[6px] w-4 h-4 bg-primary rounded-full z-10 flex items-center justify-center">\r\n            {item.icon && (\r\n              <span className="text-white text-xs">{item.icon}</span>\r\n            )}\r\n          </div>\r\n          {index < items.length - 1 && (\r\n            <div className="absolute left-2 top-2 h-[105%] bottom-0 w-0.5 bg-primary"></div>\r\n          )}\r\n          <span className="text-primary font-medium text-lg">{item.text}</span>\r\n          {item.subItems && item.subItems.length > 0 && (\r\n            <ul className="space-y-1">\r\n              {item.subItems.map((subItem, subIndex) => (\r\n                <li key={subIndex} className="text-sm text-primary-foreground">\r\n                  {subItem}\r\n                </li>\r\n              ))}\r\n            </ul>\r\n          )}\r\n        </li>\r\n      ))}\r\n    </Comp>\r\n  );\r\n}',
        path: "ui/vertical-list.tsx",
        target: "components/ui/vertical-list.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/vertical-list")),
  },
  "forbidden-error": {
    name: "forbidden-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { Button } from "@/components/ui/button";\r\n\r\nexport default function ForbiddenError() {\r\n  return (\r\n    <div className="h-svh">\r\n      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">\r\n        <h1 className="text-[7rem] font-bold leading-tight">403</h1>\r\n        <span className="font-medium">Access Forbidden</span>\r\n        <p className="text-center text-muted-foreground">\r\n          You don&apos;t have necessary permission <br />\r\n          to view this resource.\r\n        </p>\r\n        <div className="mt-6 flex gap-4">\r\n          <Button variant="outline">Go Back</Button>\r\n          <Button>Back to Home</Button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "ui/forbidden-error.tsx",
        target: "components/ui/forbidden-error.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/forbidden-error")),
  },
  "general-error": {
    name: "general-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { cn } from "@/lib/utils";\r\nimport { Button } from "@/components/ui/button";\r\n\r\ninterface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {\r\n  minimal?: boolean;\r\n}\r\n\r\nexport default function GeneralError({\r\n  className,\r\n  minimal = false,\r\n}: GeneralErrorProps) {\r\n  return (\r\n    <div className={cn("h-svh w-full", className)}>\r\n      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">\r\n        {!minimal && (\r\n          <h1 className="text-[7rem] font-bold leading-tight">500</h1>\r\n        )}\r\n        <span className="font-medium">Oops! Something went wrong {`:\')`}</span>\r\n        <p className="text-center text-muted-foreground">\r\n          We apologize for the inconvenience. <br /> Please try again later.\r\n        </p>\r\n        {!minimal && (\r\n          <div className="mt-6 flex gap-4">\r\n            <Button variant="outline">Go Back</Button>\r\n            <Button>Back to Home</Button>\r\n          </div>\r\n        )}\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "ui/general-error.tsx",
        target: "components/ui/general-error.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/general-error")),
  },
  "maintenance-error": {
    name: "maintenance-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: [
      {
        type: "registry:ui",
        content:
          "import { Button } from '@/components/ui/button'\r\n\r\nexport default function MaintenanceError() {\r\n  return (\r\n    <div className='h-svh'>\r\n      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>\r\n        <h1 className='text-[7rem] font-bold leading-tight'>503</h1>\r\n        <span className='font-medium'>Website is under maintenance!</span>\r\n        <p className='text-center text-muted-foreground'>\r\n          The site is not available at the moment. <br />\r\n          We&apos;ll be back online shortly.\r\n        </p>\r\n        <div className='mt-6 flex gap-4'>\r\n          <Button variant='outline'>Learn more</Button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  )\r\n}\r\n",
        path: "ui/maintenance-error.tsx",
        target: "components/ui/maintenance-error.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/maintenance-error")),
  },
  "not-found-error": {
    name: "not-found-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { Button } from "@/components/ui/button";\r\n\r\nexport default function NotFoundError() {\r\n  return (\r\n    <div className="h-svh">\r\n      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">\r\n        <h1 className="text-[7rem] font-bold leading-tight">404</h1>\r\n        <span className="font-medium">Oops! Page Not Found!</span>\r\n        <p className="text-center text-muted-foreground">\r\n          It seems like the page you&apos;re looking for <br />\r\n          does not exist or might have been removed.\r\n        </p>\r\n        <div className="mt-6 flex gap-4">\r\n          <Button variant="outline">Go Back</Button>\r\n          <Button>Back to Home</Button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "ui/not-found-error.tsx",
        target: "components/ui/not-found-error.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/not-found-error")),
  },
  "unauthorized-error": {
    name: "unauthorized-error",
    type: "registry:ui",
    registryDependencies: ["button"],
    files: [
      {
        type: "registry:ui",
        content:
          'import { Button } from "@/components/ui/button";\r\n\r\nexport default function UnauthorisedError() {\r\n  return (\r\n    <div className="h-svh">\r\n      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">\r\n        <h1 className="text-[7rem] font-bold leading-tight">401</h1>\r\n        <span className="font-medium">Unauthorized Access</span>\r\n        <p className="text-center text-muted-foreground">\r\n          Please log in with the appropriate credentials <br /> to access this\r\n          resource.\r\n        </p>\r\n        <div className="mt-6 flex gap-4">\r\n          <Button variant="outline">Go Back</Button>\r\n          <Button>Back to Home</Button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "ui/unauthorized-error.tsx",
        target: "components/ui/unauthorized-error.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/unauthorized-error")),
  },
} as const;

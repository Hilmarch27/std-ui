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
  sidebar: {
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
      {
        type: "registry:block",
        content:
          '"use client";\r\nimport React from "react";\r\nimport {\r\n  Sidebar,\r\n  SidebarContent,\r\n  SidebarFooter,\r\n  SidebarHeader,\r\n  SidebarRail,\r\n} from "@/components/ui/sidebar";\r\nimport { NavGroup } from "./nav-group";\r\nimport { NavUser } from "./nav-user";\r\nimport { TeamSwitcher } from "./team-switcher";\r\nimport { sidebarData } from "./data-sidebar";\r\n\r\nexport function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {\r\n  return (\r\n    <Sidebar collapsible="icon" variant="floating" {...props}>\r\n      <SidebarHeader>\r\n        <TeamSwitcher teams={sidebarData.teams} />\r\n      </SidebarHeader>\r\n      <SidebarContent>\r\n        {sidebarData.navGroups.map((props) => (\r\n          <NavGroup key={props.title} {...props} />\r\n        ))}\r\n      </SidebarContent>\r\n      <SidebarFooter>\r\n        <NavUser user={sidebarData.user} />\r\n      </SidebarFooter>\r\n      <SidebarRail />\r\n    </Sidebar>\r\n  );\r\n}\r\n',
        path: "block/sidebar/app-sidebar.tsx",
        target: "components/block/sidebar/app-sidebar.tsx",
      },
      {
        type: "registry:block",
        content:
          'import { Aperture, AudioWaveform, BadgeHelp, Ban, Bug, BugPlay, Check, CircleHelp, Command, Construction, X } from "lucide-react";\r\nimport { type SidebarData } from "./types";\r\n\r\nexport const sidebarData: SidebarData = {\r\n  user: {\r\n    name: "hilman",\r\n    email: "hilmarch03@gmail.com",\r\n    avatar: "/logo.jpg",\r\n  },\r\n  teams: [\r\n    {\r\n      name: "Std-UI",\r\n      logo: Aperture,\r\n      plan: "Components",\r\n    },\r\n    {\r\n      name: "Std-FN",\r\n      logo: AudioWaveform,\r\n      plan: "Functions",\r\n    },\r\n  ],\r\n  navGroups: [\r\n    {\r\n      title: "General",\r\n      items: [\r\n        {\r\n          title: "Demo",\r\n          url: "/demo",\r\n          icon: Command,\r\n        },\r\n        {\r\n          title: "Tasks",\r\n          url: "/tasks",\r\n          icon: Check,\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      title: "Pages",\r\n      items: [\r\n        {\r\n          title: "Errors",\r\n          icon: Bug,\r\n          items: [\r\n            {\r\n              title: "Unauthorized",\r\n              url: "/401",\r\n              icon: Ban,\r\n            },\r\n            {\r\n              title: "Forbidden",\r\n              url: "/403",\r\n              icon: X,\r\n            },\r\n            {\r\n              title: "Not Found",\r\n              url: "/404",\r\n              icon: BadgeHelp,\r\n            },\r\n            {\r\n              title: "Internal Server Error",\r\n              url: "/500",\r\n              icon: BugPlay,\r\n            },\r\n            {\r\n              title: "Maintenance Error",\r\n              url: "/503",\r\n              icon: Construction,\r\n            },\r\n          ],\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      title: "Other",\r\n      items: [\r\n        {\r\n          title: "Help Center",\r\n          url: "/help-center",\r\n          icon: CircleHelp,\r\n        },\r\n      ],\r\n    },\r\n  ],\r\n};\r\n',
        path: "block/sidebar/data-sidebar.ts",
        target: "components/block/sidebar/data-sidebar.ts",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\nimport { ReactNode } from "react";\r\nimport { ChevronRight } from "lucide-react";\r\nimport {\r\n  Collapsible,\r\n  CollapsibleContent,\r\n  CollapsibleTrigger,\r\n} from "@/components/ui/collapsible";\r\nimport {\r\n  SidebarGroup,\r\n  SidebarGroupLabel,\r\n  SidebarMenu,\r\n  SidebarMenuButton,\r\n  SidebarMenuItem,\r\n  SidebarMenuSub,\r\n  SidebarMenuSubButton,\r\n  SidebarMenuSubItem,\r\n  useSidebar,\r\n} from "@/components/ui/sidebar";\r\nimport { Badge } from "@/components/ui/badge";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuContent,\r\n  DropdownMenuItem,\r\n  DropdownMenuLabel,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\nimport { NavCollapsible, NavLink, type NavGroup } from "./types";\r\nimport Link from "next/link";\r\nimport { usePathname } from "next/navigation";\r\n\r\nexport function NavGroup({ title, items }: NavGroup) {\r\n  const { state } = useSidebar();\r\n  const pathname = usePathname();\r\n\r\n  return (\r\n    <SidebarGroup>\r\n      <SidebarGroupLabel>{title}</SidebarGroupLabel>\r\n      <SidebarMenu>\r\n        {items.map((item) => {\r\n          const key = `${item.title}-${item.url}`;\r\n\r\n          if (!item.items)\r\n            return <SidebarMenuLink key={key} item={item} href={pathname} />;\r\n\r\n          if (state === "collapsed")\r\n            return (\r\n              <SidebarMenuCollapsedDropdown\r\n                key={key}\r\n                item={item}\r\n                href={pathname}\r\n              />\r\n            );\r\n\r\n          return (\r\n            <SidebarMenuCollapsible key={key} item={item} href={pathname} />\r\n          );\r\n        })}\r\n      </SidebarMenu>\r\n    </SidebarGroup>\r\n  );\r\n}\r\n\r\nconst NavBadge = ({ children }: { children: ReactNode }) => (\r\n  <Badge className="text-xs rounded-full px-1 py-0">{children}</Badge>\r\n);\r\n\r\nconst SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {\r\n  const { setOpenMobile } = useSidebar();\r\n  return (\r\n    <SidebarMenuItem>\r\n      <SidebarMenuButton\r\n        asChild\r\n        isActive={checkIsActive(href, item)}\r\n        tooltip={item.title}\r\n      >\r\n        <Link href={item.url} onClick={() => setOpenMobile(false)}>\r\n          {item.icon && <item.icon />}\r\n          <span>{item.title}</span>\r\n          {item.badge && <NavBadge>{item.badge}</NavBadge>}\r\n        </Link>\r\n      </SidebarMenuButton>\r\n    </SidebarMenuItem>\r\n  );\r\n};\r\n\r\nconst SidebarMenuCollapsible = ({\r\n  item,\r\n  href,\r\n}: {\r\n  item: NavCollapsible;\r\n  href: string;\r\n}) => {\r\n  const { setOpenMobile } = useSidebar();\r\n  return (\r\n    <Collapsible\r\n      asChild\r\n      defaultOpen={checkIsActive(href, item, true)}\r\n      className="group/collapsible"\r\n    >\r\n      <SidebarMenuItem>\r\n        <CollapsibleTrigger asChild>\r\n          <SidebarMenuButton tooltip={item.title}>\r\n            {item.icon && <item.icon />}\r\n            <span>{item.title}</span>\r\n            {item.badge && <NavBadge>{item.badge}</NavBadge>}\r\n            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />\r\n          </SidebarMenuButton>\r\n        </CollapsibleTrigger>\r\n        <CollapsibleContent className="CollapsibleContent">\r\n          <SidebarMenuSub>\r\n            {item.items.map((subItem) => (\r\n              <SidebarMenuSubItem key={subItem.title}>\r\n                <SidebarMenuSubButton\r\n                  className={checkIsActive(href, subItem) ? "bg-primary" : ""}\r\n                  asChild\r\n                  isActive={checkIsActive(href, subItem)}\r\n                >\r\n                  <Link href={subItem.url} onClick={() => setOpenMobile(false)}>\r\n                    {subItem.icon && <subItem.icon />}\r\n                    <span>{subItem.title}</span>\r\n                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}\r\n                  </Link>\r\n                </SidebarMenuSubButton>\r\n              </SidebarMenuSubItem>\r\n            ))}\r\n          </SidebarMenuSub>\r\n        </CollapsibleContent>\r\n      </SidebarMenuItem>\r\n    </Collapsible>\r\n  );\r\n};\r\n\r\nconst SidebarMenuCollapsedDropdown = ({\r\n  item,\r\n  href,\r\n}: {\r\n  item: NavCollapsible;\r\n  href: string;\r\n}) => {\r\n  return (\r\n    <SidebarMenuItem>\r\n      <DropdownMenu>\r\n        <DropdownMenuTrigger asChild>\r\n          <SidebarMenuButton\r\n            tooltip={item.title}\r\n            isActive={checkIsActive(href, item)}\r\n          >\r\n            {item.icon && <item.icon />}\r\n            <span>{item.title}</span>\r\n            {item.badge && <NavBadge>{item.badge}</NavBadge>}\r\n            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />\r\n          </SidebarMenuButton>\r\n        </DropdownMenuTrigger>\r\n        <DropdownMenuContent side="right" align="start" sideOffset={4}>\r\n          <DropdownMenuLabel>\r\n            {item.title} {item.badge ? `(${item.badge})` : ""}\r\n          </DropdownMenuLabel>\r\n          <DropdownMenuSeparator />\r\n          {item.items.map((sub) => (\r\n            <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>\r\n              <Link\r\n                href={sub.url}\r\n                className={`${checkIsActive(href, sub) ? "bg-secondary" : ""}`}\r\n              >\r\n                {sub.icon && <sub.icon />}\r\n                <span className="max-w-52 text-wrap">{sub.title}</span>\r\n                {sub.badge && (\r\n                  <span className="ml-auto text-xs">{sub.badge}</span>\r\n                )}\r\n              </Link>\r\n            </DropdownMenuItem>\r\n          ))}\r\n        </DropdownMenuContent>\r\n      </DropdownMenu>\r\n    </SidebarMenuItem>\r\n  );\r\n};\r\n\r\n/**\r\n * Checks if a navigation item is active based on the current URL path\r\n * @param currentPath - Current pathname from Next.js router\r\n * @param item - Navigation item to check\r\n * @param checkChildren - Whether to check child items for active state\r\n * @returns boolean indicating if the item is active\r\n */\r\nconst checkIsActive = (\r\n  currentPath: string,\r\n  item: NavLink | NavCollapsible | (NavLink & { url: string }),\r\n  checkChildren: boolean = false\r\n): boolean => {\r\n  // For items with direct URLs (NavLink)\r\n  if ("url" in item) {\r\n    // Convert both paths to strings for comparison\r\n    const itemPath = item.url!.toString();\r\n\r\n    // Exact match\r\n    if (itemPath === currentPath) {\r\n      return true;\r\n    }\r\n\r\n    // Check if current path starts with item path (for nested routes)\r\n    // Only match if item path is not just "/"\r\n    if (itemPath !== "/" && currentPath.startsWith(itemPath)) {\r\n      return true;\r\n    }\r\n  }\r\n\r\n  // For collapsible items with children (NavCollapsible)\r\n  if (checkChildren && "items" in item && Array.isArray(item.items)) {\r\n    // Check if any child item is active\r\n    const result = item.items.some((subItem) =>\r\n      checkIsActive(currentPath, subItem as NavLink & { url: string }, false)\r\n    );\r\n    return result;\r\n  }\r\n\r\n  return false;\r\n};\r\n',
        path: "block/sidebar/nav-group.tsx",
        target: "components/block/sidebar/nav-group.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\nimport {\r\n  BadgeCheck,\r\n  Bell,\r\n  ChevronsUpDown,\r\n  CreditCard,\r\n  LogOut,\r\n  Sparkles,\r\n} from "lucide-react";\r\nimport { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuContent,\r\n  DropdownMenuGroup,\r\n  DropdownMenuItem,\r\n  DropdownMenuLabel,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\nimport {\r\n  SidebarMenu,\r\n  SidebarMenuButton,\r\n  SidebarMenuItem,\r\n  useSidebar,\r\n} from "@/components/ui/sidebar";\r\nimport Link from "next/link";\r\n\r\nexport function NavUser({\r\n  user,\r\n}: {\r\n  user: {\r\n    name: string;\r\n    email: string;\r\n    avatar: string;\r\n  };\r\n}) {\r\n  const { isMobile } = useSidebar();\r\n\r\n  return (\r\n    <SidebarMenu>\r\n      <SidebarMenuItem>\r\n        <DropdownMenu>\r\n          <DropdownMenuTrigger asChild>\r\n            <SidebarMenuButton\r\n              size="lg"\r\n              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"\r\n            >\r\n              <Avatar className="h-8 w-8 rounded-lg">\r\n                <AvatarImage src={user.avatar} alt={user.name} />\r\n                <AvatarFallback className="rounded-lg">SN</AvatarFallback>\r\n              </Avatar>\r\n              <div className="grid flex-1 text-left text-sm leading-tight">\r\n                <span className="truncate font-semibold">{user.name}</span>\r\n                <span className="truncate text-xs">{user.email}</span>\r\n              </div>\r\n              <ChevronsUpDown className="ml-auto size-4" />\r\n            </SidebarMenuButton>\r\n          </DropdownMenuTrigger>\r\n          <DropdownMenuContent\r\n            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"\r\n            side={isMobile ? "bottom" : "right"}\r\n            align="end"\r\n            sideOffset={4}\r\n          >\r\n            <DropdownMenuLabel className="p-0 font-normal">\r\n              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">\r\n                <Avatar className="h-8 w-8 rounded-lg">\r\n                  <AvatarImage src={user.avatar} alt={user.name} />\r\n                  <AvatarFallback className="rounded-lg">SN</AvatarFallback>\r\n                </Avatar>\r\n                <div className="grid flex-1 text-left text-sm leading-tight">\r\n                  <span className="truncate font-semibold">{user.name}</span>\r\n                  <span className="truncate text-xs">{user.email}</span>\r\n                </div>\r\n              </div>\r\n            </DropdownMenuLabel>\r\n            <DropdownMenuSeparator />\r\n            <DropdownMenuGroup>\r\n              <DropdownMenuItem>\r\n                <Sparkles />\r\n                Upgrade to Pro\r\n              </DropdownMenuItem>\r\n            </DropdownMenuGroup>\r\n            <DropdownMenuSeparator />\r\n            <DropdownMenuGroup>\r\n              <DropdownMenuItem asChild>\r\n                <Link href="/settings/account">\r\n                  <BadgeCheck />\r\n                  Account\r\n                </Link>\r\n              </DropdownMenuItem>\r\n              <DropdownMenuItem asChild>\r\n                <Link href="/settings">\r\n                  <CreditCard />\r\n                  Billing\r\n                </Link>\r\n              </DropdownMenuItem>\r\n              <DropdownMenuItem asChild>\r\n                <Link href="/settings/notifications">\r\n                  <Bell />\r\n                  Notifications\r\n                </Link>\r\n              </DropdownMenuItem>\r\n            </DropdownMenuGroup>\r\n            <DropdownMenuSeparator />\r\n            <DropdownMenuItem>\r\n              <LogOut />\r\n              Log out\r\n            </DropdownMenuItem>\r\n          </DropdownMenuContent>\r\n        </DropdownMenu>\r\n      </SidebarMenuItem>\r\n    </SidebarMenu>\r\n  );\r\n}\r\n',
        path: "block/sidebar/nav-user.tsx",
        target: "components/block/sidebar/nav-user.tsx",
      },
      {
        type: "registry:block",
        content:
          '\'use client\';\r\nimport * as React from "react";\r\nimport { ChevronsUpDown, Plus } from "lucide-react";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuContent,\r\n  DropdownMenuItem,\r\n  DropdownMenuLabel,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuShortcut,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\nimport {\r\n  SidebarMenu,\r\n  SidebarMenuButton,\r\n  SidebarMenuItem,\r\n  useSidebar,\r\n} from "@/components/ui/sidebar";\r\n\r\nexport function TeamSwitcher({\r\n  teams,\r\n}: {\r\n  teams: {\r\n    name: string;\r\n    logo: React.ElementType;\r\n    plan: string;\r\n  }[];\r\n}) {\r\n  const { isMobile } = useSidebar();\r\n  const [activeTeam, setActiveTeam] = React.useState(teams[0]);\r\n\r\n  return (\r\n    <SidebarMenu>\r\n      <SidebarMenuItem>\r\n        <DropdownMenu>\r\n          <DropdownMenuTrigger asChild>\r\n            <SidebarMenuButton\r\n              size="lg"\r\n              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"\r\n            >\r\n              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">\r\n                <activeTeam.logo className="size-4" />\r\n              </div>\r\n              <div className="grid flex-1 text-left text-sm leading-tight">\r\n                <span className="truncate font-semibold">\r\n                  {activeTeam.name}\r\n                </span>\r\n                <span className="truncate text-xs">{activeTeam.plan}</span>\r\n              </div>\r\n              <ChevronsUpDown className="ml-auto" />\r\n            </SidebarMenuButton>\r\n          </DropdownMenuTrigger>\r\n          <DropdownMenuContent\r\n            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"\r\n            align="start"\r\n            side={isMobile ? "bottom" : "right"}\r\n            sideOffset={4}\r\n          >\r\n            <DropdownMenuLabel className="text-xs text-muted-foreground">\r\n              Teams\r\n            </DropdownMenuLabel>\r\n            {teams.map((team, index) => (\r\n              <DropdownMenuItem\r\n                key={team.name}\r\n                onClick={() => setActiveTeam(team)}\r\n                className="gap-2 p-2"\r\n              >\r\n                <div className="flex size-6 items-center justify-center rounded-sm border">\r\n                  <team.logo className="size-4 shrink-0" />\r\n                </div>\r\n                {team.name}\r\n                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>\r\n              </DropdownMenuItem>\r\n            ))}\r\n            <DropdownMenuSeparator />\r\n            <DropdownMenuItem className="gap-2 p-2">\r\n              <div className="flex size-6 items-center justify-center rounded-md border bg-background">\r\n                <Plus className="size-4" />\r\n              </div>\r\n              <div className="font-medium text-muted-foreground">Add team</div>\r\n            </DropdownMenuItem>\r\n          </DropdownMenuContent>\r\n        </DropdownMenu>\r\n      </SidebarMenuItem>\r\n    </SidebarMenu>\r\n  );\r\n}\r\n',
        path: "block/sidebar/team-switcher.tsx",
        target: "components/block/sidebar/team-switcher.tsx",
      },
      {
        type: "registry:block",
        content:
          'import { LinkProps } from "next/link";\r\n\r\ninterface User {\r\n  name: string;\r\n  email: string;\r\n  avatar: string;\r\n}\r\n\r\ninterface Team {\r\n  name: string;\r\n  logo: React.ElementType;\r\n  plan: string;\r\n}\r\n\r\ninterface BaseNavItem {\r\n  title: string;\r\n  badge?: string;\r\n  icon?: React.ElementType;\r\n}\r\n\r\ntype NavLink = BaseNavItem & {\r\n  url: LinkProps["href"];\r\n  items?: never;\r\n};\r\n\r\ntype NavCollapsible = BaseNavItem & {\r\n  items: (BaseNavItem & { url: LinkProps["href"] })[];\r\n  url?: never;\r\n};\r\n\r\ntype NavItem = NavCollapsible | NavLink;\r\n\r\ninterface NavGroup {\r\n  title: string;\r\n  items: NavItem[];\r\n}\r\n\r\ninterface SidebarData {\r\n  user: User;\r\n  teams: Team[];\r\n  navGroups: NavGroup[];\r\n}\r\n\r\nexport type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };',
        path: "block/sidebar/types.ts",
        target: "components/block/sidebar/types.ts",
      },
    ],
    component: React.lazy(() => import("./preview/blocks/app-sidebar")),
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

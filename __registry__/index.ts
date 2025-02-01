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
  // ui input
  "input-password": {
    name: "input-password",
    type: "registry:ui",
    registryDependencies: ["input", "button"],
    dependencies: ["lucide-react"],
    files: [
      {
        type: "registry:ui",
        content:
          '"use client";\r\n\r\nimport * as React from "react";\r\nimport { EyeIcon, EyeOffIcon } from "lucide-react";\r\n\r\nimport { Button } from "@/components/ui/button";\r\nimport { Input } from "@/components/ui/input";\r\nimport { cn } from "@/lib/utils";\r\n\r\nconst InputPassword = React.forwardRef<\r\n  HTMLInputElement,\r\n  React.ComponentProps<"input">\r\n>(({ className, ...props }, ref) => {\r\n  const [showPassword, setShowPassword] = React.useState(false);\r\n  const disabled =\r\n    props.value === "" || props.value === undefined || props.disabled;\r\n\r\n  return (\r\n    <div className="relative">\r\n      <Input\r\n        type={showPassword ? "text" : "password"}\r\n        className={cn("hide-password-toggle pr-10", className)}\r\n        ref={ref}\r\n        {...props}\r\n      />\r\n      <Button\r\n        type="button"\r\n        variant="ghost"\r\n        size="sm"\r\n        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"\r\n        onClick={() => setShowPassword((prev) => !prev)}\r\n        disabled={disabled}\r\n      >\r\n        {showPassword && !disabled ? (\r\n          <EyeIcon className="h-4 w-4" aria-hidden="true" />\r\n        ) : (\r\n          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />\r\n        )}\r\n        <span className="sr-only">\r\n          {showPassword ? "Hide password" : "Show password"}\r\n        </span>\r\n      </Button>\r\n\r\n      {/* hides browsers password toggles */}\r\n      <style>{`\r\n\t\t\t\t\t.hide-password-toggle::-ms-reveal,\r\n\t\t\t\t\t.hide-password-toggle::-ms-clear {\r\n\t\t\t\t\t\tvisibility: hidden;\r\n\t\t\t\t\t\tpointer-events: none;\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t}\r\n\t\t\t\t`}</style>\r\n    </div>\r\n  );\r\n});\r\nInputPassword.displayName = "InputPassword";\r\n\r\nexport { InputPassword };\r\n',
        path: "ui/input-password.tsx",
        target: "components/ui/input-password.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/input-password")),
  },
  "input-number": {
    name: "input-number",
    type: "registry:ui",
    registryDependencies: ["input"],
    files: [
      {
        type: "registry:ui",
        content:
          '"use client";\r\n\r\nimport type React from "react";\r\nimport { forwardRef } from "react";\r\nimport { Input } from "@/components/ui/input";\r\nimport { cn } from "@/lib/utils";\r\n\r\nexport interface InputNumberProps\r\n  extends Omit<\r\n    React.InputHTMLAttributes<HTMLInputElement>,\r\n    "onChange" | "value"\r\n  > {\r\n  onChange?: (value: string) => void;\r\n  value?: string;\r\n}\r\n\r\nconst InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(\r\n  ({ className, onChange, value = "", ...props }, ref) => {\r\n    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\r\n      const newValue = event.target.value.replace(/[^\\d]/g, "");\r\n      onChange?.(newValue);\r\n    };\r\n\r\n    return (\r\n      <Input\r\n        {...props}\r\n        ref={ref}\r\n        type="text"\r\n        inputMode="numeric"\r\n        pattern="[0-9]*"\r\n        className={cn("font-mono", className)}\r\n        value={value}\r\n        onChange={handleChange}\r\n      />\r\n    );\r\n  }\r\n);\r\nInputNumber.displayName = "InputNumber";\r\n\r\nexport { InputNumber };\r\n',
        path: "ui/input-number.tsx",
        target: "components/ui/input-number.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/input-number")),
  },
  "input-currency": {
    name: "input-currency",
    type: "registry:ui",
    registryDependencies: ["input"],
    files: [
      {
        type: "registry:ui",
        content:
          '"use client";\r\n\r\nimport type React from "react";\r\nimport { forwardRef, useEffect, useState } from "react";\r\nimport { Input } from "@/components/ui/input";\r\nimport { cn } from "@/lib/utils";\r\n\r\nexport interface InputCurrencyProps\r\n  extends Omit<\r\n    React.InputHTMLAttributes<HTMLInputElement>,\r\n    "onChange" | "value"\r\n  > {\r\n  onChange?: (value: string) => void;\r\n  value?: string;\r\n  currency?: string;\r\n  locale?: string;\r\n}\r\n\r\nconst InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(\r\n  (\r\n    {\r\n      className,\r\n      onChange,\r\n      value = "",\r\n      currency = "IDR",\r\n      locale = "id-ID",\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const [displayValue, setDisplayValue] = useState(value);\r\n\r\n    const formatCurrency = (value: string) => {\r\n      const number = Number.parseInt(value.replace(/\\D/g, ""));\r\n      if (isNaN(number)) return "";\r\n\r\n      return new Intl.NumberFormat(locale, {\r\n        style: "currency",\r\n        currency: currency,\r\n        minimumFractionDigits: 0,\r\n        maximumFractionDigits: 0,\r\n      }).format(number);\r\n    };\r\n\r\n    useEffect(() => {\r\n      setDisplayValue(formatCurrency(value));\r\n    }, [value, currency, locale]);\r\n\r\n    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\r\n      const rawValue = event.target.value.replace(/\\D/g, "");\r\n      setDisplayValue(formatCurrency(rawValue));\r\n      onChange?.(rawValue);\r\n    };\r\n\r\n    return (\r\n      <Input\r\n        {...props}\r\n        ref={ref}\r\n        className={cn("font-mono", className)}\r\n        value={displayValue}\r\n        onChange={handleChange}\r\n      />\r\n    );\r\n  }\r\n);\r\n\r\nInputCurrency.displayName = "InputCurrency";\r\n\r\nexport { InputCurrency };\r\n',
        path: "ui/input-currency.tsx",
        target: "components/ui/input-currency.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/input-currency")),
  },
  "input-phone": {
    name: "input-phone",
    type: "registry:ui",
    registryDependencies: ["input"],
    files: [
      {
        type: "registry:ui",
        content:
          '"use client";\r\n\r\nimport type React from "react";\r\nimport { forwardRef, useState } from "react";\r\nimport { Input } from "@/components/ui/input";\r\nimport { cn } from "@/lib/utils";\r\n\r\nexport interface InputPhoneProps\r\n  extends Omit<\r\n    React.InputHTMLAttributes<HTMLInputElement>,\r\n    "onChange" | "value"\r\n  > {\r\n  onChange?: (value: string) => void;\r\n  value?: string;\r\n  countryCode?: string;\r\n}\r\n\r\nconst InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(\r\n  ({ className, onChange, value = "", countryCode = "62", ...props }, ref) => {\r\n    const [rawValue, setRawValue] = useState(value.replace(/\\D/g, ""));\r\n\r\n    const formatPhoneNumber = (input: string) => {\r\n      if (!input) return "";\r\n\r\n      const cleaned = input.replace(/\\D/g, "");\r\n      let formatted = cleaned.replace(/^0+/, "");\r\n\r\n      if (formatted.length > 0) {\r\n        if (!formatted.startsWith(countryCode)) {\r\n          formatted = countryCode + formatted;\r\n        }\r\n\r\n        formatted =\r\n          `+${countryCode} ` +\r\n          formatted\r\n            .slice(countryCode.length)\r\n            .replace(/(\\d{3})(\\d{4})(\\d{4})/, "$1 $2 $3");\r\n      }\r\n\r\n      return formatted.trim();\r\n    };\r\n\r\n    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\r\n      const inputValue = event.target.value\r\n        .replace(/\\D/g, "")\r\n        .replace(/^0+/, "");\r\n\r\n      setRawValue(inputValue);\r\n      onChange?.(inputValue);\r\n    };\r\n\r\n    return (\r\n      <Input\r\n        {...props}\r\n        ref={ref}\r\n        type="tel"\r\n        className={cn("font-mono", className)}\r\n        value={formatPhoneNumber(rawValue)}\r\n        onChange={handleChange}\r\n        placeholder={`+${countryCode} 812 3456 7890`}\r\n      />\r\n    );\r\n  }\r\n);\r\nInputPhone.displayName = "InputPhone";\r\n\r\nexport { InputPhone };\r\n',
        path: "ui/input-phone.tsx",
        target: "components/ui/input-phone.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/ui/input-phone")),
  },
  // blocks preview
  login: {
    name: "login",
    type: "registry:block",
    registryDependencies: [
      "form",
      "card",
      "button",
      "input",
      "sonner",
      "https://std-ui.vercel.app/registry/input-password",
    ],
    dependencies: ["zod", "@hookform/resolvers", "react-hook-form"],
    files: [
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport {\r\n  Card,\r\n  CardContent,\r\n  CardDescription,\r\n  CardHeader,\r\n  CardTitle,\r\n} from "@/components/ui/card";\r\nimport LoginForm from "./form";\r\n\r\nexport default function Login() {\r\n  return (\r\n    <div className="flex flex-col min-h-svh h-full w-full items-center justify-center px-4">\r\n      <Card className="mx-auto max-w-sm">\r\n        <CardHeader>\r\n          <CardTitle className="text-2xl">Login</CardTitle>\r\n          <CardDescription>\r\n            Enter your email and password to login to your account.\r\n          </CardDescription>\r\n        </CardHeader>\r\n        <CardContent>\r\n          <LoginForm />\r\n          <div className="mt-4 text-center text-sm">\r\n            Don&apos;t have an account?{" "}\r\n            <a href="#" className="underline">\r\n              Sign up\r\n            </a>\r\n          </div>\r\n        </CardContent>\r\n      </Card>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "block/login/index.tsx",
        target: "components/block/login/index.tsx",
      },
      {
        type: "registry:block",
        content:
          'import React from "react";\r\nimport { z } from "zod";\r\nimport { zodResolver } from "@hookform/resolvers/zod";\r\nimport { useForm } from "react-hook-form";\r\nimport { toast } from "sonner";\r\nimport { Input } from "@/components/ui/input";\r\nimport { InputPassword } from "@/components/ui/input-password";\r\nimport {\r\n  Form,\r\n  FormControl,\r\n  FormField,\r\n  FormItem,\r\n  FormLabel,\r\n  FormMessage,\r\n} from "@/components/ui/form";\r\nimport { Button } from "@/components/ui/button";\r\n\r\n// Improved schema with additional validation rules\r\nconst formSchema = z.object({\r\n  email: z.string().email({ message: "Invalid email address" }),\r\n  password: z\r\n    .string()\r\n    .min(6, { message: "Password must be at least 6 characters long" })\r\n    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),\r\n});\r\n\r\nfunction LoginForm() {\r\n  const form = useForm<z.infer<typeof formSchema>>({\r\n    resolver: zodResolver(formSchema),\r\n    defaultValues: {\r\n      email: "",\r\n      password: "",\r\n    },\r\n  });\r\n\r\n  async function onSubmit(values: z.infer<typeof formSchema>) {\r\n    try {\r\n      // Assuming an async login function\r\n      console.log(values);\r\n      toast(\r\n        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">\r\n          <code className="text-white">{JSON.stringify(values, null, 2)}</code>\r\n        </pre>\r\n      );\r\n    } catch (error) {\r\n      console.error("Form submission error", error);\r\n      toast.error("Failed to submit the form. Please try again.");\r\n    }\r\n  }\r\n\r\n  return (\r\n    <Form {...form}>\r\n      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">\r\n        <div className="grid gap-4">\r\n          <FormField\r\n            control={form.control}\r\n            name="email"\r\n            render={({ field }) => (\r\n              <FormItem className="grid gap-2">\r\n                <FormLabel htmlFor="email">Email</FormLabel>\r\n                <FormControl>\r\n                  <Input\r\n                    id="email"\r\n                    placeholder="hilmarch03 @mail.com"\r\n                    type="email"\r\n                    autoComplete="email"\r\n                    {...field}\r\n                  />\r\n                </FormControl>\r\n                <FormMessage />\r\n              </FormItem>\r\n            )}\r\n          />\r\n          <FormField\r\n            control={form.control}\r\n            name="password"\r\n            render={({ field }) => (\r\n              <FormItem className="grid gap-2">\r\n                <div className="flex justify-between items-center">\r\n                  <FormLabel htmlFor="password">Password</FormLabel>\r\n                  <a\r\n                    href="#"\r\n                    className="ml-auto inline-block text-sm underline"\r\n                  >\r\n                    Forgot your password?\r\n                  </a>\r\n                </div>\r\n                <FormControl>\r\n                  <InputPassword\r\n                    id="password"\r\n                    placeholder="******"\r\n                    autoComplete="current-password"\r\n                    {...field}\r\n                  />\r\n                </FormControl>\r\n                <FormMessage />\r\n              </FormItem>\r\n            )}\r\n          />\r\n          <Button type="submit" className="w-full">\r\n            Login\r\n          </Button>\r\n          <Button variant="outline" className="w-full">\r\n            Login with Google\r\n          </Button>\r\n        </div>\r\n      </form>\r\n    </Form>\r\n  );\r\n}\r\n\r\nexport default LoginForm;\r\n',
        path: "block/login/form.tsx",
        target: "components/block/login/form.tsx",
      },
    ],
    component: React.lazy(() => import("./preview/blocks/login")),
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
    component: React.lazy(() => import("./preview/blocks/sidebar/app-sidebar")),
  },
  "client-data-table": {
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
      {
        type: "registry:block",
        content:
          'import { User, UserCheck, UserCog } from "lucide-react";\r\n\r\nexport class Data {\r\n  static role = [\r\n    {\r\n      value: "admin",\r\n      label: "Admin",\r\n      icon: UserCog,\r\n    },\r\n    {\r\n      value: "user",\r\n      label: "User",\r\n      icon: UserCheck,\r\n    },\r\n    {\r\n      value: "guest",\r\n      label: "Guest",\r\n      icon: User,\r\n    },\r\n  ];\r\n}\r\n',
        path: "block/client-data-table/data/data.ts",
        target: "components/block/client-data-table/data/data.ts",
      },
      {
        type: "registry:block",
        content:
          'import { TUser } from "./schema";\r\n\r\nexport const UserData: TUser[] = [\r\n  {\r\n    id: "ID-7878",\r\n    name: "Hilman",\r\n    email: "hilmarch03@gmail.com",\r\n    role: "admin",\r\n  },\r\n  {\r\n    id: "ID-7879",\r\n    name: "April",\r\n    email: "april04@gmail.com",\r\n    role: "user",\r\n  },\r\n  {\r\n    id: "ID-7880",\r\n    name: "Bob",\r\n    email: "bob@example.com",\r\n    role: "guest",\r\n  },\r\n  {\r\n    id: "ID-7881",\r\n    name: "Charlie",\r\n    email: "charlie@example.com",\r\n    role: "admin",\r\n  },\r\n  {\r\n    id: "ID-7882",\r\n    name: "David",\r\n    email: "david@example.com",\r\n    role: "user",\r\n  },\r\n  {\r\n    id: "ID-7883",\r\n    name: "Eve",\r\n    email: "eve@example.com",\r\n    role: "guest",\r\n  },\r\n  {\r\n    id: "ID-7884",\r\n    name: "Frank",\r\n    email: "frank@example.com",\r\n    role: "admin",\r\n  },\r\n  {\r\n    id: "ID-7885",\r\n    name: "Grace",\r\n    email: "grace@example.com",\r\n    role: "user",\r\n  },\r\n  {\r\n    id: "ID-7886",\r\n    name: "Hank",\r\n    email: "hank@example.com",\r\n    role: "guest",\r\n  },\r\n  {\r\n    id: "ID-7887",\r\n    name: "Irene",\r\n    email: "irene@example.com",\r\n    role: "admin",\r\n  },\r\n  {\r\n    id: "ID-7888",\r\n    name: "Jack",\r\n    email: "jack@example.com",\r\n    role: "user",\r\n  },\r\n  {\r\n    id: "ID-7889",\r\n    name: "Karen",\r\n    email: "karen@example.com",\r\n    role: "guest",\r\n  },\r\n  {\r\n    id: "ID-7890",\r\n    name: "Leo",\r\n    email: "leo@example.com",\r\n    role: "admin",\r\n  },\r\n  {\r\n    id: "ID-7891",\r\n    name: "Mona",\r\n    email: "mona@example.com",\r\n    role: "user",\r\n  },\r\n  {\r\n    id: "ID-7892",\r\n    name: "Nina",\r\n    email: "nina@example.com",\r\n    role: "guest",\r\n  },\r\n  {\r\n    id: "ID-7893",\r\n    name: "Oscar",\r\n    email: "oscar@example.com",\r\n    role: "admin",\r\n  },\r\n];\r\n\r\n',
        path: "block/client-data-table/data/example.ts",
        target: "components/block/client-data-table/data/example.ts",
      },
      {
        type: "registry:block",
        content:
          'import { z } from "zod";\r\n\r\nexport const userSchema = z.object({\r\n  id: z.string(),\r\n  name: z.string(),\r\n  role: z.string(),\r\n  email: z.string(),\r\n});\r\n\r\nexport type TUser = z.infer<typeof userSchema>;\r\n',
        path: "block/client-data-table/data/schema.ts",
        target: "components/block/client-data-table/data/schema.ts",
      },
      {
        type: "registry:block",
        content:
          'import { Column } from "@tanstack/react-table";\r\nimport { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";\r\n\r\nimport { cn } from "@/lib/utils";\r\nimport { Button } from "@/components/ui/button";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuContent,\r\n  DropdownMenuItem,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\n\r\ninterface DataTableColumnHeaderProps<TData, TValue>\r\n  extends React.HTMLAttributes<HTMLDivElement> {\r\n  column: Column<TData, TValue>;\r\n  title: string;\r\n}\r\n\r\nexport function DataTableColumnHeader<TData, TValue>({\r\n  column,\r\n  title,\r\n  className,\r\n}: DataTableColumnHeaderProps<TData, TValue>) {\r\n  if (!column.getCanSort()) {\r\n    return <div className={cn(className)}>{title}</div>;\r\n  }\r\n\r\n  return (\r\n    <div className={cn("flex items-center space-x-2", className)}>\r\n      <DropdownMenu>\r\n        <DropdownMenuTrigger asChild>\r\n          <Button\r\n            variant="ghost"\r\n            size="sm"\r\n            className="-ml-3 h-8 data-[state=open]:bg-accent"\r\n          >\r\n            <span>{title}</span>\r\n            {column.getIsSorted() === "desc" ? (\r\n              <ArrowDown />\r\n            ) : column.getIsSorted() === "asc" ? (\r\n              <ArrowUp />\r\n            ) : (\r\n              <ChevronsUpDown />\r\n            )}\r\n          </Button>\r\n        </DropdownMenuTrigger>\r\n        <DropdownMenuContent align="start">\r\n          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>\r\n            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />\r\n            Asc\r\n          </DropdownMenuItem>\r\n          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>\r\n            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />\r\n            Desc\r\n          </DropdownMenuItem>\r\n          <DropdownMenuSeparator />\r\n          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>\r\n            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />\r\n            Hide\r\n          </DropdownMenuItem>\r\n        </DropdownMenuContent>\r\n      </DropdownMenu>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/column-header.tsx",
        target: "components/block/client-data-table/column-header.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport { ColumnDef } from "@tanstack/react-table";\r\nimport { Badge } from "@/components/ui/badge";\r\nimport { Checkbox } from "@/components/ui/checkbox";\r\nimport { DataTableColumnHeader } from "./column-header";\r\nimport { DataTableRowActions } from "./row-actions";\r\nimport { TUser } from "./data/schema";\r\n\r\nexport const columns: ColumnDef<TUser>[] = [\r\n  {\r\n    id: "select",\r\n    header: ({ table }) => (\r\n      <Checkbox\r\n        checked={\r\n          table.getIsAllPageRowsSelected() ||\r\n          (table.getIsSomePageRowsSelected() && "indeterminate")\r\n        }\r\n        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}\r\n        aria-label="Select all"\r\n        className="translate-y-[2px]"\r\n      />\r\n    ),\r\n    cell: ({ row }) => (\r\n      <Checkbox\r\n        checked={row.getIsSelected()}\r\n        onCheckedChange={(value) => row.toggleSelected(!!value)}\r\n        aria-label="Select row"\r\n        className="translate-y-[2px]"\r\n      />\r\n    ),\r\n    enableSorting: false,\r\n    enableHiding: false,\r\n  },\r\n  {\r\n    accessorKey: "id",\r\n    header: ({ column }) => (\r\n      <DataTableColumnHeader column={column} title="Task" />\r\n    ),\r\n    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,\r\n    enableSorting: false,\r\n    enableHiding: false,\r\n  },\r\n  {\r\n    accessorKey: "name",\r\n    header: ({ column }) => (\r\n      <DataTableColumnHeader column={column} title="Full Name" />\r\n    ),\r\n    cell: ({ row }) => <div className="w-auto">{row.getValue("name")}</div>,\r\n  },\r\n  {\r\n    accessorKey: "email",\r\n    header: ({ column }) => (\r\n      <DataTableColumnHeader column={column} title="Email Address" />\r\n    ),\r\n    cell: ({ row }) => <div className="w-auto">{row.getValue("email")}</div>,\r\n  },\r\n  {\r\n    accessorKey: "role",\r\n    header: ({ column }) => (\r\n      <DataTableColumnHeader column={column} title="role" />\r\n    ),\r\n    cell: ({ row }) => {\r\n      return (\r\n        <>\r\n          <Badge variant="outline">\r\n            <div className="w-auto">{row.getValue("role")}</div>\r\n          </Badge>\r\n        </>\r\n      );\r\n    },\r\n  },\r\n  {\r\n    id: "actions",\r\n    cell: ({ row }) => <DataTableRowActions row={row} />,\r\n  },\r\n];\r\n',
        path: "block/client-data-table/columns.tsx",
        target: "components/block/client-data-table/columns.tsx",
      },
      {
        type: "registry:block",
        content:
          'import * as React from "react";\r\nimport { Column } from "@tanstack/react-table";\r\nimport { Check, PlusCircle } from "lucide-react";\r\n\r\nimport { cn } from "@/lib/utils";\r\nimport { Badge } from "@/components/ui/badge";\r\nimport { Button } from "@/components/ui/button";\r\nimport {\r\n  Command,\r\n  CommandEmpty,\r\n  CommandGroup,\r\n  CommandInput,\r\n  CommandItem,\r\n  CommandList,\r\n  CommandSeparator,\r\n} from "@/components/ui/command";\r\nimport {\r\n  Popover,\r\n  PopoverContent,\r\n  PopoverTrigger,\r\n} from "@/components/ui/popover";\r\nimport { Separator } from "@/components/ui/separator";\r\n\r\ninterface DataTableFacetedFilterProps<TData, TValue> {\r\n  column?: Column<TData, TValue>;\r\n  title?: string;\r\n  options: {\r\n    label: string;\r\n    value: string;\r\n    icon?: React.ComponentType<{ className?: string }>;\r\n  }[];\r\n}\r\n\r\nexport function DataTableFacetedFilter<TData, TValue>({\r\n  column,\r\n  title,\r\n  options,\r\n}: DataTableFacetedFilterProps<TData, TValue>) {\r\n  const facets = column?.getFacetedUniqueValues();\r\n  const selectedValues = new Set(column?.getFilterValue() as string[]);\r\n\r\n  return (\r\n    <Popover>\r\n      <PopoverTrigger asChild>\r\n        <Button variant="outline" size="sm" className="h-8 border-dashed">\r\n          <PlusCircle />\r\n          {title}\r\n          {selectedValues?.size > 0 && (\r\n            <>\r\n              <Separator orientation="vertical" className="mx-2 h-4" />\r\n              <Badge\r\n                variant="secondary"\r\n                className="rounded-sm px-1 font-normal lg:hidden"\r\n              >\r\n                {selectedValues.size}\r\n              </Badge>\r\n              <div className="hidden space-x-1 lg:flex">\r\n                {selectedValues.size > 2 ? (\r\n                  <Badge\r\n                    variant="secondary"\r\n                    className="rounded-sm px-1 font-normal"\r\n                  >\r\n                    {selectedValues.size} selected\r\n                  </Badge>\r\n                ) : (\r\n                  options\r\n                    .filter((option) => selectedValues.has(option.value))\r\n                    .map((option) => (\r\n                      <Badge\r\n                        variant="secondary"\r\n                        key={option.value}\r\n                        className="rounded-sm px-1 font-normal"\r\n                      >\r\n                        {option.label}\r\n                      </Badge>\r\n                    ))\r\n                )}\r\n              </div>\r\n            </>\r\n          )}\r\n        </Button>\r\n      </PopoverTrigger>\r\n      <PopoverContent className="w-[200px] p-0" align="start">\r\n        <Command>\r\n          <CommandInput placeholder={title} />\r\n          <CommandList>\r\n            <CommandEmpty>No results found.</CommandEmpty>\r\n            <CommandGroup>\r\n              {options.map((option) => {\r\n                const isSelected = selectedValues.has(option.value);\r\n                return (\r\n                  <CommandItem\r\n                    key={option.value}\r\n                    onSelect={() => {\r\n                      if (isSelected) {\r\n                        selectedValues.delete(option.value);\r\n                      } else {\r\n                        selectedValues.add(option.value);\r\n                      }\r\n                      const filterValues = Array.from(selectedValues);\r\n                      column?.setFilterValue(\r\n                        filterValues.length ? filterValues : undefined\r\n                      );\r\n                    }}\r\n                  >\r\n                    <div\r\n                      className={cn(\r\n                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",\r\n                        isSelected\r\n                          ? "bg-primary text-primary-foreground"\r\n                          : "opacity-50 [&_svg]:invisible"\r\n                      )}\r\n                    >\r\n                      <Check />\r\n                    </div>\r\n                    {option.icon && (\r\n                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />\r\n                    )}\r\n                    <span>{option.label}</span>\r\n                    {facets?.get(option.value) && (\r\n                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">\r\n                        {facets.get(option.value)}\r\n                      </span>\r\n                    )}\r\n                  </CommandItem>\r\n                );\r\n              })}\r\n            </CommandGroup>\r\n            {selectedValues.size > 0 && (\r\n              <>\r\n                <CommandSeparator />\r\n                <CommandGroup>\r\n                  <CommandItem\r\n                    onSelect={() => column?.setFilterValue(undefined)}\r\n                    className="justify-center text-center"\r\n                  >\r\n                    Clear filters\r\n                  </CommandItem>\r\n                </CommandGroup>\r\n              </>\r\n            )}\r\n          </CommandList>\r\n        </Command>\r\n      </PopoverContent>\r\n    </Popover>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/faceted-filter.tsx",
        target: "components/block/client-data-table/faceted-filter.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport * as React from "react";\r\nimport {\r\n  ColumnDef,\r\n  ColumnFiltersState,\r\n  SortingState,\r\n  VisibilityState,\r\n  flexRender,\r\n  getCoreRowModel,\r\n  getFacetedRowModel,\r\n  getFacetedUniqueValues,\r\n  getFilteredRowModel,\r\n  getPaginationRowModel,\r\n  getSortedRowModel,\r\n  useReactTable,\r\n} from "@tanstack/react-table";\r\n\r\nimport {\r\n  Table,\r\n  TableBody,\r\n  TableCell,\r\n  TableHead,\r\n  TableHeader,\r\n  TableRow,\r\n} from "@/components/ui/table";\r\n\r\nimport { DataTablePagination } from "./pagination";\r\nimport { DataTableToolbar } from "./toolbar";\r\n\r\ninterface DataTableProps<TData, TValue> {\r\n  columns: ColumnDef<TData, TValue>[];\r\n  data: TData[];\r\n}\r\n\r\nexport function DataTable<TData, TValue>({\r\n  columns,\r\n  data,\r\n}: DataTableProps<TData, TValue>) {\r\n  const [rowSelection, setRowSelection] = React.useState({});\r\n  const [columnVisibility, setColumnVisibility] =\r\n    React.useState<VisibilityState>({});\r\n  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(\r\n    []\r\n  );\r\n  const [sorting, setSorting] = React.useState<SortingState>([]);\r\n\r\n  const table = useReactTable({\r\n    data,\r\n    columns,\r\n    state: {\r\n      sorting,\r\n      columnVisibility,\r\n      rowSelection,\r\n      columnFilters,\r\n    },\r\n    enableRowSelection: true,\r\n    onRowSelectionChange: setRowSelection,\r\n    onSortingChange: setSorting,\r\n    onColumnFiltersChange: setColumnFilters,\r\n    onColumnVisibilityChange: setColumnVisibility,\r\n    getCoreRowModel: getCoreRowModel(),\r\n    getFilteredRowModel: getFilteredRowModel(),\r\n    getPaginationRowModel: getPaginationRowModel(),\r\n    getSortedRowModel: getSortedRowModel(),\r\n    getFacetedRowModel: getFacetedRowModel(),\r\n    getFacetedUniqueValues: getFacetedUniqueValues(),\r\n  });\r\n\r\n  return (\r\n    <div className="space-y-4">\r\n      <DataTableToolbar table={table} />\r\n      <div className="rounded-md border">\r\n        <Table>\r\n          <TableHeader>\r\n            {table.getHeaderGroups().map((headerGroup) => (\r\n              <TableRow key={headerGroup.id}>\r\n                {headerGroup.headers.map((header) => {\r\n                  return (\r\n                    <TableHead key={header.id} colSpan={header.colSpan}>\r\n                      {header.isPlaceholder\r\n                        ? null\r\n                        : flexRender(\r\n                            header.column.columnDef.header,\r\n                            header.getContext()\r\n                          )}\r\n                    </TableHead>\r\n                  );\r\n                })}\r\n              </TableRow>\r\n            ))}\r\n          </TableHeader>\r\n          <TableBody>\r\n            {table.getRowModel().rows?.length ? (\r\n              table.getRowModel().rows.map((row) => (\r\n                <TableRow\r\n                  key={row.id}\r\n                  data-state={row.getIsSelected() && "selected"}\r\n                >\r\n                  {row.getVisibleCells().map((cell) => (\r\n                    <TableCell key={cell.id}>\r\n                      {flexRender(\r\n                        cell.column.columnDef.cell,\r\n                        cell.getContext()\r\n                      )}\r\n                    </TableCell>\r\n                  ))}\r\n                </TableRow>\r\n              ))\r\n            ) : (\r\n              <TableRow>\r\n                <TableCell\r\n                  colSpan={columns.length}\r\n                  className="h-24 text-center"\r\n                >\r\n                  No results.\r\n                </TableCell>\r\n              </TableRow>\r\n            )}\r\n          </TableBody>\r\n        </Table>\r\n      </div>\r\n      <DataTablePagination table={table} />\r\n    </div>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/index.tsx",
        target: "components/block/client-data-table/index.tsx",
      },
      {
        type: "registry:block",
        content:
          'import { Table } from "@tanstack/react-table";\r\nimport {\r\n  ChevronLeft,\r\n  ChevronRight,\r\n  ChevronsLeft,\r\n  ChevronsRight,\r\n} from "lucide-react";\r\n\r\nimport { Button } from "@/components/ui/button";\r\nimport {\r\n  Select,\r\n  SelectContent,\r\n  SelectItem,\r\n  SelectTrigger,\r\n  SelectValue,\r\n} from "@/components/ui/select";\r\n\r\ninterface DataTablePaginationProps<TData> {\r\n  table: Table<TData>;\r\n}\r\n\r\nexport function DataTablePagination<TData>({\r\n  table,\r\n}: DataTablePaginationProps<TData>) {\r\n  return (\r\n    <div className="flex items-center justify-between px-2">\r\n      <div className="flex-1 text-sm text-muted-foreground">\r\n        {table.getFilteredSelectedRowModel().rows.length} of{" "}\r\n        {table.getFilteredRowModel().rows.length} row(s) selected.\r\n      </div>\r\n      <div className="flex items-center space-x-6 lg:space-x-8">\r\n        <div className="flex items-center space-x-2">\r\n          <p className="text-sm font-medium">Rows per page</p>\r\n          <Select\r\n            value={`${table.getState().pagination.pageSize}`}\r\n            onValueChange={(value) => {\r\n              table.setPageSize(Number(value));\r\n            }}\r\n          >\r\n            <SelectTrigger className="h-8 w-[70px]">\r\n              <SelectValue placeholder={table.getState().pagination.pageSize} />\r\n            </SelectTrigger>\r\n            <SelectContent side="top">\r\n              {[10, 20, 30, 40, 50].map((pageSize) => (\r\n                <SelectItem key={pageSize} value={`${pageSize}`}>\r\n                  {pageSize}\r\n                </SelectItem>\r\n              ))}\r\n            </SelectContent>\r\n          </Select>\r\n        </div>\r\n        <div className="flex w-[100px] items-center justify-center text-sm font-medium">\r\n          Page {table.getState().pagination.pageIndex + 1} of{" "}\r\n          {table.getPageCount()}\r\n        </div>\r\n        <div className="flex items-center space-x-2">\r\n          <Button\r\n            variant="outline"\r\n            className="hidden h-8 w-8 p-0 lg:flex"\r\n            onClick={() => table.setPageIndex(0)}\r\n            disabled={!table.getCanPreviousPage()}\r\n          >\r\n            <span className="sr-only">Go to first page</span>\r\n            <ChevronsLeft />\r\n          </Button>\r\n          <Button\r\n            variant="outline"\r\n            className="h-8 w-8 p-0"\r\n            onClick={() => table.previousPage()}\r\n            disabled={!table.getCanPreviousPage()}\r\n          >\r\n            <span className="sr-only">Go to previous page</span>\r\n            <ChevronLeft />\r\n          </Button>\r\n          <Button\r\n            variant="outline"\r\n            className="h-8 w-8 p-0"\r\n            onClick={() => table.nextPage()}\r\n            disabled={!table.getCanNextPage()}\r\n          >\r\n            <span className="sr-only">Go to next page</span>\r\n            <ChevronRight />\r\n          </Button>\r\n          <Button\r\n            variant="outline"\r\n            className="hidden h-8 w-8 p-0 lg:flex"\r\n            onClick={() => table.setPageIndex(table.getPageCount() - 1)}\r\n            disabled={!table.getCanNextPage()}\r\n          >\r\n            <span className="sr-only">Go to last page</span>\r\n            <ChevronsRight />\r\n          </Button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/pagination.tsx",
        target: "components/block/client-data-table/pagination.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport { Row } from "@tanstack/react-table";\r\nimport { MoreHorizontal } from "lucide-react";\r\n\r\nimport { Button } from "@/components/ui/button";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuContent,\r\n  DropdownMenuItem,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuShortcut,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\n\r\ninterface DataTableRowActionsProps<TData> {\r\n  row: Row<TData>;\r\n}\r\n\r\nexport function DataTableRowActions<TData>({\r\n  row,\r\n}: DataTableRowActionsProps<TData>) {\r\n\r\n  //   this is your row data\r\n  console.log(row)\r\n\r\n  return (\r\n    <DropdownMenu>\r\n      <DropdownMenuTrigger asChild>\r\n        <Button\r\n          variant="ghost"\r\n          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"\r\n        >\r\n          <MoreHorizontal />\r\n          <span className="sr-only">Open menu</span>\r\n        </Button>\r\n      </DropdownMenuTrigger>\r\n      <DropdownMenuContent align="end" className="w-[160px]">\r\n        <DropdownMenuItem>Edit</DropdownMenuItem>\r\n        <DropdownMenuItem>Make a copy</DropdownMenuItem>\r\n        <DropdownMenuItem>Favorite</DropdownMenuItem>\r\n        <DropdownMenuSeparator />\r\n        <DropdownMenuSeparator />\r\n        <DropdownMenuItem>\r\n          Delete\r\n          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>\r\n        </DropdownMenuItem>\r\n      </DropdownMenuContent>\r\n    </DropdownMenu>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/row-actions.tsx",
        target: "components/block/client-data-table/row-actions.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport { Table } from "@tanstack/react-table";\r\nimport { X } from "lucide-react";\r\n\r\nimport { Button } from "@/components/ui/button";\r\nimport { Input } from "@/components/ui/input";\r\nimport { DataTableViewOptions } from "./view-options";\r\nimport { DataTableFacetedFilter } from "./faceted-filter";\r\nimport { Data } from "./data/data";\r\n\r\ninterface DataTableToolbarProps<TData> {\r\n  table: Table<TData>;\r\n}\r\n\r\nexport function DataTableToolbar<TData>({\r\n  table,\r\n}: DataTableToolbarProps<TData>) {\r\n  const isFiltered = table.getState().columnFilters.length > 0;\r\n\r\n  return (\r\n    <div className="flex items-center justify-between">\r\n      <div className="flex flex-1 items-center space-x-2">\r\n        <Input\r\n          placeholder="Filter tasks..."\r\n          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}\r\n          onChange={(event) =>\r\n            table.getColumn("title")?.setFilterValue(event.target.value)\r\n          }\r\n          className="h-8 w-[150px] lg:w-[250px]"\r\n        />\r\n        {table.getColumn("status") && (\r\n          <DataTableFacetedFilter\r\n            column={table.getColumn("status")}\r\n            title="Status"\r\n            options={Data.role}\r\n          />\r\n        )}\r\n        {isFiltered && (\r\n          <Button\r\n            variant="ghost"\r\n            onClick={() => table.resetColumnFilters()}\r\n            className="h-8 px-2 lg:px-3"\r\n          >\r\n            Reset\r\n            <X />\r\n          </Button>\r\n        )}\r\n      </div>\r\n      <DataTableViewOptions table={table} />\r\n    </div>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/toolbar.tsx",
        target: "components/block/client-data-table/toolbar.tsx",
      },
      {
        type: "registry:block",
        content:
          '"use client";\r\n\r\nimport { Table } from "@tanstack/react-table";\r\nimport { Settings2 } from "lucide-react";\r\n\r\nimport { Button } from "@/components/ui/button";\r\nimport {\r\n  DropdownMenu,\r\n  DropdownMenuCheckboxItem,\r\n  DropdownMenuContent,\r\n  DropdownMenuLabel,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuTrigger,\r\n} from "@/components/ui/dropdown-menu";\r\n\r\ninterface DataTableViewOptionsProps<TData> {\r\n  table: Table<TData>;\r\n}\r\n\r\nexport function DataTableViewOptions<TData>({\r\n  table,\r\n}: DataTableViewOptionsProps<TData>) {\r\n  return (\r\n    <DropdownMenu>\r\n      <DropdownMenuTrigger asChild>\r\n        <Button\r\n          variant="outline"\r\n          size="sm"\r\n          className="ml-auto hidden h-8 lg:flex"\r\n        >\r\n          <Settings2 />\r\n          View\r\n        </Button>\r\n      </DropdownMenuTrigger>\r\n      <DropdownMenuContent align="end" className="w-[150px]">\r\n        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>\r\n        <DropdownMenuSeparator />\r\n        {table\r\n          .getAllColumns()\r\n          .filter(\r\n            (column) =>\r\n              typeof column.accessorFn !== "undefined" && column.getCanHide()\r\n          )\r\n          .map((column) => {\r\n            return (\r\n              <DropdownMenuCheckboxItem\r\n                key={column.id}\r\n                className="capitalize"\r\n                checked={column.getIsVisible()}\r\n                onCheckedChange={(value) => column.toggleVisibility(!!value)}\r\n              >\r\n                {column.id}\r\n              </DropdownMenuCheckboxItem>\r\n            );\r\n          })}\r\n      </DropdownMenuContent>\r\n    </DropdownMenu>\r\n  );\r\n}\r\n',
        path: "block/client-data-table/view-options.tsx",
        target: "components/block/client-data-table/view-options.tsx",
      },
    ],
    component: React.lazy(
      () => import("./preview/blocks/client-data-table/index")
    ),
  },
  // pages preview
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

import { SidebarProvider } from '@/components/ui/sidebar'
import { Header } from '@/registry/components/layouts/header'
import { Main } from '@/registry/components/layouts/main'
import { ProfileDropdown } from '@/registry/components/profile-dropdown'
import { ThemeSwitch } from '@/registry/components/theme-switch'
import { TopNav } from '@/registry/components/top-nav'

export default function PreviewLayout() {
  return (
    <SidebarProvider>
      {/* ===== Top Heading ===== */}
      <Header className='border-dotted border-primary border w-full'>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>{/* ===== Your content ===== */}</Main>
    </SidebarProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true
  }
]

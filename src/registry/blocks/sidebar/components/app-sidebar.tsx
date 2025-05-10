'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavGroup } from '@/registry/blocks/sidebar/components/nav-group'
import { NavUser } from '@/registry/blocks/sidebar/components/nav-user'
import { TeamSwitcher } from '@/registry/blocks/sidebar/components/team-switcher'
import { sidebarData } from '@/registry/blocks/sidebar/lib/data/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      // className="h-[700px] absolute top-1/2  2xl:top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      collapsible="icon"
      variant="floating"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

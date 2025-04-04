import {
  Aperture,
  AudioWaveform,
  BadgeHelp,
  Ban,
  Bug,
  BugPlay,
  Check,
  CircleHelp,
  Command,
  Construction,
  X
} from 'lucide-react'
import { type SidebarData } from '@/registry/blocks/sidebar/lib/types/sidebar'

export const sidebarData: SidebarData = {
  user: {
    name: 'hilman',
    email: 'hilmarch03@gmail.com',
    avatar: '/logo.jpg'
  },
  teams: [
    {
      name: 'Std-UI',
      logo: Aperture,
      plan: 'Components'
    },
    {
      name: 'Std-FN',
      logo: AudioWaveform,
      plan: 'Functions'
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Demo',
          url: '/demo',
          icon: Command
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: Check
        }
      ]
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: Ban
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: X
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: BadgeHelp
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: BugPlay
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: Construction
            }
          ]
        }
      ]
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Help Center',
          url: '/help-center',
          icon: CircleHelp
        }
      ]
    }
  ]
}

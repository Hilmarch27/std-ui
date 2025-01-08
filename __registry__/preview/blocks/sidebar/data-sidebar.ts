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
  X,
} from "lucide-react";
import { type SidebarData } from "./types";

export const sidebarData: SidebarData = {
  user: {
    name: "hilman",
    email: "hilmarch03@gmail.com",
    avatar: "/logo.jpg",
  },
  teams: [
    {
      name: "Std-UI",
      logo: Aperture,
      plan: "Components",
    },
    {
      name: "Std-FN",
      logo: AudioWaveform,
      plan: "Functions",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Demo",
          url: "/docs/sidebar",
          icon: Command,
        },
        {
          title: "Tasks",
          url: "#",
          icon: Check,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Errors",
          icon: Bug,
          items: [
            {
              title: "Unauthorized",
              url: "#",
              icon: Ban,
            },
            {
              title: "Forbidden",
              url: "#",
              icon: X,
            },
            {
              title: "Not Found",
              url: "#",
              icon: BadgeHelp,
            },
            {
              title: "Internal Server Error",
              url: "#",
              icon: BugPlay,
            },
            {
              title: "Maintenance Error",
              url: "#",
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Help Center",
          url: "#",
          icon: CircleHelp,
        },
      ],
    },
  ],
};

"use client"

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/user-dashboard/sidebar/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/constants/path"

const data = {
  user: {
    name: "Nguyễn Huỳnh Bảo Trọng",
    email: "nhbaotrong@gmail.com",
    avatar: "",
  },
  teams: [
    {
      name: "Lensor",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Main Menu",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Forum",
          url: ROUTES.FORUM,
        },
        {
          title: "Message",
          url: ROUTES.MESSAGE
        },
        {
          title: "Martketplace",
          url: ROUTES.MARTKETPLACE
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    }
  ],
}

export function UserDashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

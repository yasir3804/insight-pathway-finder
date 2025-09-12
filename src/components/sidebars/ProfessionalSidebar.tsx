import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  User,
  Settings,
  Briefcase,
  MessageSquare,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const professionalMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    title: "Mentorship",
    url: "/mentorship",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Industry Insights",
    url: "/insights",
    icon: BarChart3,
    color: "text-success",
  },
  {
    title: "Career Opportunities",
    url: "/opportunities",
    icon: Briefcase,
    color: "text-accent",
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
    color: "text-warning",
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    color: "text-warning",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-muted-foreground",
  },
];

export function ProfessionalSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (active: boolean) =>
    active
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "px-2" : "px-4"}>
            {state !== "collapsed" && "Professional Portal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {professionalMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClassName(isActive)}`
                      }
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      {state !== "collapsed" && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
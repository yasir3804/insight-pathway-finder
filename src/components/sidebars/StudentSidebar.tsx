import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileQuestion,
  BarChart3,
  User,
  Settings,
  GraduationCap,
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

const studentMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    title: "Available Tests",
    url: "/tests",
    icon: FileQuestion,
    color: "text-secondary",
  },
  {
    title: "My Results",
    url: "/results",
    icon: BarChart3,
    color: "text-success",
  },
  {
    title: "Career Guidance",
    url: "/guidance",
    icon: GraduationCap,
    color: "text-accent",
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

export function StudentSidebar() {
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
            {state !== "collapsed" && "Student Portal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {studentMenuItems.map((item) => (
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
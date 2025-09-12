import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  BarChart3,
  User,
  Settings,
  Calendar,
  MessageSquare,
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

const counselorMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    title: "Student Management",
    url: "/students",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Test Management",
    url: "/manage-tests",
    icon: FileQuestion,
    color: "text-accent",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    color: "text-success",
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
    color: "text-warning",
  },
  {
    title: "Career Guidance",
    url: "/career-guidance",
    icon: GraduationCap,
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

export function CounselorSidebar() {
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
            {state !== "collapsed" && "Counselor Portal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {counselorMenuItems.map((item) => (
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
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  BarChart3,
  GraduationCap,
  FileText,
  MessageSquare,
  ScrollText,
  User,
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

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Question Assignment",
    url: "/admin/questions",
    icon: FileQuestion,
    color: "text-purple-500",
  },
  {
    title: "System Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
    color: "text-green-500",
  },
  {
    title: "Degree Loans & Scholarships",
    url: "/admin/scholarships",
    icon: GraduationCap,
    color: "text-orange-500",
  },
  {
    title: "Content Management",
    url: "/admin/content",
    icon: FileText,
    color: "text-cyan-500",
  },
  {
    title: "Feedback Management",
    url: "/admin/feedback",
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    title: "System Logs",
    url: "/admin/logs",
    icon: ScrollText,
    color: "text-gray-500",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
    color: "text-yellow-500",
  },
];

export function AdminSidebar() {
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
            {state !== "collapsed" && "Admin Panel"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {adminMenuItems.map((item) => (
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
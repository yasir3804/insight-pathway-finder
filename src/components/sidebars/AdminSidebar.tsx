import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield, 
  HelpCircle, 
  LogOut,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Award,
  Activity,
  Database
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    color: "text-primary"
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Content Management",
    url: "/admin/content",
    icon: BookOpen,
    color: "text-accent"
  },
  {
    title: "Question Assignment",
    url: "/admin/questions",
    icon: FileText,
    color: "text-warning"
  },
  {
    title: "System Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
    color: "text-success"
  },
  {
    title: "Scholarships",
    url: "/admin/scholarships",
    icon: Award,
    color: "text-primary"
  },
  {
    title: "Feedback Management",
    url: "/admin/feedback",
    icon: MessageSquare,
    color: "text-secondary"
  },
  {
    title: "System Logs",
    url: "/admin/logs",
    icon: Activity,
    color: "text-accent"
  },
  {
    title: "Security",
    url: "/admin/security",
    icon: Shield,
    color: "text-destructive"
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    color: "text-muted-foreground"
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-2">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`
                      transition-all duration-200 hover:bg-sidebar-accent group
                      ${isActive(item.url) 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                        : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <item.icon 
                        className={`h-5 w-5 ${isActive(item.url) ? item.color : 'text-sidebar-foreground/70'} 
                          group-hover:scale-110 transition-transform duration-200`} 
                      />
                      {state !== "collapsed" && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions Section */}
        {state !== "collapsed" && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-2">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">Help & Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
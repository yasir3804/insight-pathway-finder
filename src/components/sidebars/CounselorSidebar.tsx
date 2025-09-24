import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  FileText,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  UserCheck,
  Settings,
  HelpCircle,
  LogOut,
  Brain,
  ClipboardList
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

const counselorMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary"
  },
  {
    title: "My Students",
    url: "/students",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: Brain,
    color: "text-accent"
  },
  {
    title: "Student Reports",
    url: "/reports",
    icon: BarChart3,
    color: "text-warning"
  },
  {
    title: "Career Guidance",
    url: "/guidance",
    icon: Target,
    color: "text-success"
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
    color: "text-primary"
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
    color: "text-secondary"
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen,
    color: "text-accent"
  },
  {
    title: "Progress Tracking",
    url: "/progress",
    icon: TrendingUp,
    color: "text-warning"
  },
  {
    title: "Recommendations",
    url: "/recommendations",
    icon: Award,
    color: "text-success"
  },
  {
    title: "Case Management",
    url: "/cases",
    icon: ClipboardList,
    color: "text-primary"
  }
];

export function CounselorSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-2">
            Counselor Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {counselorMenuItems.map((item) => (
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
                    <UserCheck className="h-4 w-4" />
                    <span className="text-sm">Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
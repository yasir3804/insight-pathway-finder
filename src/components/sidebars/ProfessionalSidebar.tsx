import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Target,
  TrendingUp,
  UserCheck,
  Award,
  Calendar,
  MessageSquare,
  Shield,
  Database,
  HelpCircle,
  LogOut,
  Briefcase,
  ClipboardCheck
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

const professionalMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary"
  },
  {
    title: "Organization",
    url: "/manage",
    icon: Building,
    color: "text-secondary"
  },
  {
    title: "Employee Management",
    url: "/employees",
    icon: Users,
    color: "text-accent"
  },
  {
    title: "Assessment Programs",
    url: "/programs",
    icon: ClipboardCheck,
    color: "text-warning"
  },
  {
    title: "Analytics & Reports",
    url: "/analytics",
    icon: BarChart3,
    color: "text-success"
  },
  {
    title: "Performance Tracking",
    url: "/performance",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    title: "Talent Pipeline",
    url: "/talent",
    icon: Target,
    color: "text-secondary"
  },
  {
    title: "HR Integration",
    url: "/hr-integration",
    icon: Briefcase,
    color: "text-accent"
  },
  {
    title: "Team Assessments",
    url: "/team-assessments",
    icon: UserCheck,
    color: "text-warning"
  },
  {
    title: "Certifications",
    url: "/certifications",
    icon: Award,
    color: "text-success"
  },
  {
    title: "Scheduling",
    url: "/scheduling",
    icon: Calendar,
    color: "text-primary"
  },
  {
    title: "Communications",
    url: "/communications",
    icon: MessageSquare,
    color: "text-secondary"
  }
];

export function ProfessionalSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-2">
            Professional Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {professionalMenuItems.map((item) => (
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

        {/* Management Section */}
        {state !== "collapsed" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-2">
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                    <Database className="h-4 w-4" />
                    <span className="text-sm">Data Export</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Security</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

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
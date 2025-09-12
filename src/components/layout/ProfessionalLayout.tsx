import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfessionalSidebar } from "../sidebars/ProfessionalSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface ProfessionalLayoutProps {
  children: React.ReactNode;
}

export const ProfessionalLayout = ({ children }: ProfessionalLayoutProps) => {
  const { user, profile, isAuthenticated } = useAuth();

  if (!isAuthenticated || !profile || profile.role !== 'professional') {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ProfessionalSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-foreground">
                Professional Dashboard
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome, {profile.full_name}
              </span>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {profile.full_name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
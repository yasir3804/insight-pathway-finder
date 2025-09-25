import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { Layout } from "@/components/layout/Layout";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { RoleSelection } from "@/pages/RoleSelection";
import { StudentRegister } from "@/pages/StudentRegister";
import { CounselorRegister } from "@/pages/CounselorRegister";
import { ProfessionalRegister } from "@/pages/ProfessionalRegister";
import { Dashboard } from "@/pages/Dashboard";
import { Tests } from "@/pages/Tests";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";
import { Results } from "@/pages/Results";
import { Manage } from "@/pages/Manage";
import { TestDetail } from "@/pages/TestDetail";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { UserManagement } from "@/pages/admin/UserManagement";
import { QuestionAssignment } from "@/pages/admin/QuestionAssignment";
import { SystemAnalytics } from "@/pages/admin/SystemAnalytics";
import { Scholarships } from "@/pages/admin/Scholarships";
import { ContentManagement } from "@/pages/admin/ContentManagement";
import { FeedbackManagement } from "@/pages/admin/FeedbackManagement";
import { SystemLogs } from "@/pages/admin/SystemLogs";
import { AdminProfile } from "@/pages/admin/AdminProfile";
import { TenantSetup } from "@/pages/TenantSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TenantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </TenantProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const AppRoutes = () => {
  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading, needsTenantSetup } = useAuth();
    
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (needsTenantSetup) {
      return <Navigate to="/tenant-setup" replace />;
    }
    
    return <>{children}</>;
  };

  // Public Route Component (redirect to dashboard if already authenticated)
  const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/role-selection" element={<PublicRoute><RoleSelection /></PublicRoute>} />
        <Route path="/register/student" element={<PublicRoute><StudentRegister /></PublicRoute>} />
        <Route path="/register/counselor" element={<PublicRoute><CounselorRegister /></PublicRoute>} />
        <Route path="/register/professional" element={<PublicRoute><ProfessionalRegister /></PublicRoute>} />
        
        {/* Tenant Setup Route */}
        <Route path="/tenant-setup" element={<TenantSetup />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
        <Route path="/test/:id" element={<ProtectedRoute><TestDetail /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/manage" element={<ProtectedRoute><Manage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/questions" element={<ProtectedRoute><QuestionAssignment /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><SystemAnalytics /></ProtectedRoute>} />
        <Route path="/admin/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
        <Route path="/admin/content" element={<ProtectedRoute><ContentManagement /></ProtectedRoute>} />
        <Route path="/admin/feedback" element={<ProtectedRoute><FeedbackManagement /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><SystemLogs /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;

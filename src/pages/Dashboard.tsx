import { useAuth } from "@/contexts/AuthContext";
import { StudentDashboard } from "./dashboards/StudentDashboard";
import { AdminDashboard } from "./dashboards/AdminDashboard";
import { CounselorDashboard } from "./dashboards/CounselorDashboard";
import { ProfessionalDashboard } from "./dashboards/ProfessionalDashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render different dashboards based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    case 'professional':
      return <ProfessionalDashboard />;
    default:
      return <StudentDashboard />; // Default to student dashboard
  }
};
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ProfessionalLayout } from "@/components/layout/ProfessionalLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, TrendingUp, Award } from "lucide-react";

export const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const professionalStats = {
    totalUsers: 450,
    activeUsers: 89,
    completedAssessments: 234,
    averageScore: 82
  };

  return (
    <ProfessionalLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, {user?.name?.split(' ')[0]}! 💼
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your organization's assessment programs and track performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professionalStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {professionalStats.activeUsers} active this month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <Building className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professionalStats.completedAssessments}</div>
              <p className="text-xs text-muted-foreground">Completed this semester</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professionalStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Organization performance</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full" asChild>
                <Link to="/manage">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to manage your organization?</h2>
          <Button size="lg" asChild>
            <Link to="/manage">
              <Building className="mr-2 h-5 w-5" />
              Organization Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </ProfessionalLayout>
  );
};
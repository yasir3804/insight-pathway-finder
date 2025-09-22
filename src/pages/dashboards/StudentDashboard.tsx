import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  BookOpen,
  Play,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const studentStats = {
    testsCompleted: 1,
    totalTests: 5,
    averageScore: 85,
    hoursSpent: 4.5
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, {user?.name?.split(' ')[0]}! 🎓
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore your potential and discover your ideal career path through assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments Done</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                of {studentStats.totalTests} recommended
              </p>
              <Progress value={(studentStats.testsCompleted / studentStats.totalTests) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Great progress!</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.hoursSpent}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full" asChild>
                <Link to="/tests">Start New Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to discover your potential?</h2>
          <Button size="lg" asChild>
            <Link to="/tests">
              <Play className="mr-2 h-5 w-5" />
              Explore Assessments
            </Link>
          </Button>
        </div>
      </div>
    </StudentLayout>
  );
};
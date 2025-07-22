import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
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
  Calendar,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Star
} from "lucide-react";

const mockTests = [
  {
    id: "1",
    title: "Cognitive Aptitude Assessment",
    description: "Evaluate your verbal, numerical, and logical reasoning abilities",
    type: "aptitude",
    duration: 45,
    difficulty: "intermediate",
    completed: false,
    progress: 0,
    icon: Brain,
    color: "bg-primary"
  },
  {
    id: "2", 
    title: "Personality Profile (Big Five)",
    description: "Discover your personality traits across five key dimensions",
    type: "personality",
    duration: 30,
    difficulty: "beginner",
    completed: true,
    progress: 100,
    icon: Users,
    color: "bg-secondary"
  },
  {
    id: "3",
    title: "Career Interest Inventory",
    description: "Identify your professional interests using Holland's RIASEC model",
    type: "interest",
    duration: 25,
    difficulty: "beginner", 
    completed: false,
    progress: 60,
    icon: Target,
    color: "bg-accent"
  },
  {
    id: "4",
    title: "Emotional Intelligence Assessment",
    description: "Measure your emotional awareness and regulation skills",
    type: "emotional-intelligence",
    duration: 35,
    difficulty: "intermediate",
    completed: false,
    progress: 0,
    icon: Lightbulb,
    color: "bg-warning"
  }
];

const mockStats = {
  testsCompleted: 3,
  totalTests: 8,
  averageScore: 87,
  hoursSpent: 12.5,
  rank: 125,
  totalUsers: 15420
};

const mockRecentActivity = [
  {
    type: "test_completed",
    title: "Personality Assessment completed",
    description: "Score: 92% - Excellent performance!",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-success"
  },
  {
    type: "recommendation",
    title: "New career suggestion available",
    description: "Based on your results: Product Management",
    time: "1 day ago",
    icon: Star,
    color: "text-warning"
  },
  {
    type: "test_started",
    title: "Career Interest Inventory started", 
    description: "60% completed - Resume when ready",
    time: "3 days ago",
    icon: Play,
    color: "text-primary"
  }
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success/10 text-success border-success/20";
      case "intermediate": return "bg-warning/10 text-warning border-warning/20";
      case "advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to continue your assessment journey? Here's your progress overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                of {mockStats.totalTests} available tests
              </p>
              <Progress value={(mockStats.testsCompleted / mockStats.totalTests) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.hoursSpent}h</div>
              <p className="text-xs text-muted-foreground">
                Assessment time this month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{mockStats.rank}</div>
              <p className="text-xs text-muted-foreground">
                of {mockStats.totalUsers.toLocaleString()} users
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Tests */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Tests</h2>
              <Button variant="outline" asChild>
                <Link to="/tests">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {mockTests.map((test) => {
                const Icon = test.icon;
                return (
                  <Card key={test.id} className="group hover:shadow-soft transition-all duration-300 overflow-hidden">
                    <div className={`h-1 w-full ${test.color}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${test.color}/10`}>
                            <Icon className={`h-6 w-6 ${test.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {test.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {test.description}
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {test.duration} min
                              </div>
                              <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                                {test.difficulty}
                              </Badge>
                              {test.completed && (
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {test.progress > 0 && !test.completed && (
                            <div className="text-right">
                              <div className="text-sm font-medium">{test.progress}%</div>
                              <Progress value={test.progress} className="w-20" />
                            </div>
                          )}
                          <Button 
                            size="sm" 
                            variant={test.completed ? "outline" : "default"}
                            asChild
                          >
                            <Link to={`/test/${test.id}`}>
                              {test.completed ? (
                                <>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  View Results
                                </>
                              ) : test.progress > 0 ? (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Continue
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Test
                                </>
                              )}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/results">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Results
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/profile">
                    <Users className="h-4 w-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/recommendations">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Career Recommendations
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Your Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {Math.round((mockStats.testsCompleted / mockStats.totalTests) * 100)}%
                  </div>
                  <p className="text-sm opacity-90">
                    Assessment completion rate
                  </p>
                  <Progress 
                    value={(mockStats.testsCompleted / mockStats.totalTests) * 100} 
                    className="bg-primary-foreground/20 [&>div]:bg-primary-foreground"
                  />
                  <p className="text-xs opacity-75">
                    Complete more assessments to unlock detailed insights and personalized recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
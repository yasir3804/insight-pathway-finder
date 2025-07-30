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

const studentTests = [
  {
    id: "1",
    title: "Career Interest Assessment",
    description: "Discover what careers match your interests and passions",
    type: "interest",
    duration: 20,
    difficulty: "beginner",
    completed: false,
    progress: 0,
    icon: Target,
    color: "bg-primary"
  },
  {
    id: "2", 
    title: "Study Skills Evaluation",
    description: "Assess your learning style and study effectiveness",
    type: "academic",
    duration: 15,
    difficulty: "beginner",
    completed: true,
    progress: 100,
    icon: BookOpen,
    color: "bg-secondary"
  },
  {
    id: "3",
    title: "Personality Profile",
    description: "Understand your personality traits for better self-awareness",
    type: "personality",
    duration: 25,
    difficulty: "beginner", 
    completed: false,
    progress: 40,
    icon: Users,
    color: "bg-accent"
  }
];

const studentStats = {
  testsCompleted: 1,
  totalTests: 5,
  averageScore: 85,
  hoursSpent: 4.5,
  rank: 245,
  totalUsers: 3420
};

export const StudentDashboard = () => {
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
            {greeting}, {user?.name?.split(' ')[0]}! 🎓
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore your potential and discover your ideal career path through assessments.
          </p>
        </div>

        {/* Stats Cards */}
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
              <p className="text-xs text-muted-foreground">
                Great progress!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.hoursSpent}h</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{studentStats.rank}</div>
              <p className="text-xs text-muted-foreground">
                of {studentStats.totalUsers.toLocaleString()} students
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Tests */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <Button variant="outline" asChild>
                <Link to="/tests">
                  View All Tests
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {studentTests.map((test) => {
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
                                  Start Assessment
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
            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/results">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    My Results
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/profile">
                    <Users className="h-4 w-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/career-guide">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Career Guide
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {Math.round((studentStats.testsCompleted / studentStats.totalTests) * 100)}%
                  </div>
                  <p className="text-sm opacity-90">
                    Assessment completion
                  </p>
                  <Progress 
                    value={(studentStats.testsCompleted / studentStats.totalTests) * 100} 
                    className="bg-primary-foreground/20 [&>div]:bg-primary-foreground"
                  />
                  <p className="text-xs opacity-75">
                    Keep going! Complete more assessments to unlock career insights.
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
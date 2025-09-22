import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, GraduationCap, Users, Building } from "lucide-react";

export const RoleSelection = () => {
  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Individual learner seeking self-assessment and personal development",
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      features: ["Personal assessment", "Career guidance", "Skill development"],
    },
    {
      id: "counselor",
      title: "Counselor",
      description: "Educational professional guiding students and managing assessments",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      features: ["Student management", "Assessment oversight", "Progress tracking"],
    },
    {
      id: "professional",
      title: "School/Organization",
      description: "Educational institution or organization managing multiple users",
      icon: Building,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      features: ["Multi-user management", "Institutional analytics", "Bulk assessments"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PsychoMetrics
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the option that best describes you to get started with personalized assessments
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card key={role.id} className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${role.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full mt-6" size="lg">
                    <Link to={`/register/${role.id}`}>
                      Get Started as {role.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
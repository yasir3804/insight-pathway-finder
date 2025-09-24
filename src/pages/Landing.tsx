import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Shield, 
  Sparkles, 
  Clock,
  Award,
  BarChart3,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Assessment",
    description: "Cutting-edge AI algorithms provide deep insights into cognitive abilities and personality traits."
  },
  {
    icon: Users,
    title: "Multi-Role Platform",
    description: "Designed for students, professionals, educators, and HR teams with role-specific features."
  },
  {
    icon: TrendingUp,
    title: "Adaptive Testing",
    description: "Tests adapt to your skill level, ensuring accurate and efficient assessment."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level security with GDPR compliance ensures your data remains protected."
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Comprehensive reports with actionable insights and career recommendations."
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get immediate feedback with AI-generated reports and recommendations."
  }
];

const testTypes = [
  {
    title: "Aptitude Tests",
    description: "Verbal, numerical, and logical reasoning assessments",
    icon: Target,
    color: "bg-primary"
  },
  {
    title: "Personality Assessment",
    description: "Big Five traits and MBTI-style personality profiling",
    icon: Users,
    color: "bg-secondary"
  },
  {
    title: "Interest Inventory",
    description: "Holland's Code (RIASEC) career interest mapping",
    icon: Lightbulb,
    color: "bg-accent"
  },
  {
    title: "Emotional Intelligence",
    description: "Self-awareness, empathy, and emotional regulation",
    icon: Brain,
    color: "bg-warning"
  }
];

const benefits = [
  "Scientifically validated assessments",
  "AI-powered personalized recommendations",
  "Real-time progress tracking",
  "Career guidance and counseling support",
  "Industry-specific professional assessments",
  "Comprehensive reporting dashboard"
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)] animate-float"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/0.08),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-medium shadow-soft">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Next-Gen AI Assessment Platform
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                  Unlock Your{" "}
                  <span className="relative">
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      True Potential
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-primary/20 blur-sm"></div>
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Revolutionary psychometric assessments powered by advanced AI. Discover your unique strengths, 
                  decode your personality, and receive personalized career guidance that transforms your future.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-4 shadow-elegant hover:shadow-soft transition-all duration-300 hover:scale-105" asChild>
                  <Link to="/role-selection">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-muted/50" asChild>
                  <Link to="/tests">Explore Tests</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <span className="text-sm font-medium">Free to start</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <span className="text-sm font-medium">Instant AI insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <span className="text-sm font-medium">Scientifically validated</span>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full animate-float"></div>
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-secondary opacity-10 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10 w-full max-w-lg">
                <img 
                  src={heroImage} 
                  alt="Advanced psychometric assessment platform interface"
                  className="w-full h-auto rounded-3xl shadow-elegant hover:shadow-soft transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-elegant animate-float">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-elegant animate-float" style={{animationDelay: '1.5s'}}>
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-muted/30 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.02)_50%,transparent_75%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise-Grade Platform
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Why Leading Organizations Choose{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">PsychoMetrics</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our platform combines cutting-edge AI technology with decades of psychological research 
              to deliver the most accurate and actionable insights available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-primary/10 flex items-center justify-center mb-6 group-hover:bg-gradient-primary/20 transition-all duration-300 group-hover:scale-110">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base lg:text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Types Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Comprehensive Test Battery</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our scientifically validated assessments cover all aspects of psychological measurement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testTypes.map((test, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 ${test.color}`}></div>
                <CardHeader className="text-center">
                  <div className={`h-16 w-16 rounded-full ${test.color}/10 flex items-center justify-center mx-auto mb-4`}>
                    <test.icon className={`h-8 w-8 ${test.color.replace('bg-', 'text-')}`} />
                  </div>
                  <CardTitle className="text-lg">{test.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{test.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Everything You Need for Success</h2>
                <p className="text-xl text-muted-foreground">
                  Our comprehensive platform provides all the tools you need to understand 
                  yourself better and make informed career decisions.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center space-y-2">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-muted-foreground">Assessments Completed</div>
              </Card>
              <Card className="p-6 text-center space-y-2">
                <div className="text-3xl font-bold text-secondary">95%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </Card>
              <Card className="p-6 text-center space-y-2">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-muted-foreground">AI Support</div>
              </Card>
              <Card className="p-6 text-center space-y-2">
                <div className="text-3xl font-bold text-warning">4.9/5</div>
                <div className="text-muted-foreground">User Rating</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--primary)/0.1)_100%)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Transform Your Future Today
            </Badge>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Ready to Unlock Your{" "}
              <span className="relative">
                True Potential?
                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-foreground/30 blur-sm"></div>
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Join over <span className="font-bold text-primary-foreground">50,000+</span> individuals and organizations 
              who have transformed their lives with our revolutionary AI-powered assessments.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-4 shadow-elegant hover:shadow-soft transition-all duration-300 hover:scale-105" asChild>
              <Link to="/role-selection">
                <Award className="mr-3 h-6 w-6" />
                Begin Your Journey
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-4 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground backdrop-blur-sm" 
              asChild
            >
              <Link to="/contact">
                <Users className="mr-3 h-6 w-6" />
                Enterprise Solutions
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 flex justify-center items-center space-x-8 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm">Happy Users</div>
            </div>
            <div className="h-8 w-px bg-primary-foreground/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm">Accuracy Rate</div>
            </div>
            <div className="h-8 w-px bg-primary-foreground/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
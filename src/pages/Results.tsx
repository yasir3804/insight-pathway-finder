import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  TrendingUp, 
  Award, 
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Brain
} from "lucide-react";

interface TestResult {
  id: string;
  testName: string;
  category: string;
  completedDate: string;
  score: number;
  percentile: number;
  status: "completed" | "in-progress" | "not-started";
  insights: string[];
}

const mockResults: TestResult[] = [
  {
    id: "1",
    testName: "Cognitive Ability Assessment",
    category: "Aptitude",
    completedDate: "2024-01-15",
    score: 85,
    percentile: 78,
    status: "completed",
    insights: ["Strong logical reasoning", "Excellent problem-solving skills", "Above average spatial intelligence"]
  },
  {
    id: "2",
    testName: "Big Five Personality Test",
    category: "Personality",
    completedDate: "2024-01-12",
    score: 92,
    percentile: 88,
    status: "completed",
    insights: ["High conscientiousness", "Moderate extroversion", "Strong emotional stability"]
  },
  {
    id: "3",
    testName: "Career Interest Inventory",
    category: "Interest",
    completedDate: "2024-01-10",
    score: 78,
    percentile: 65,
    status: "completed",
    insights: ["Artistic tendencies", "Interest in helping others", "Preference for investigative work"]
  },
  {
    id: "4",
    testName: "Emotional Intelligence Assessment",
    category: "EQ",
    completedDate: "2024-01-08",
    score: 88,
    percentile: 82,
    status: "completed",
    insights: ["Excellent self-awareness", "Strong empathy", "Good emotional regulation"]
  }
];

export const Results = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("all");

  const filteredResults = mockResults.filter(result => {
    if (selectedCategory !== "all" && result.category.toLowerCase() !== selectedCategory) {
      return false;
    }
    return true;
  });

  const averageScore = Math.round(
    filteredResults.reduce((sum, result) => sum + result.score, 0) / filteredResults.length
  );

  const averagePercentile = Math.round(
    filteredResults.reduce((sum, result) => sum + result.percentile, 0) / filteredResults.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 85) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Test Results</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                <p className="text-2xl font-bold">{filteredResults.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Percentile</p>
                <p className="text-2xl font-bold">{averagePercentile}th</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Highest Score</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="aptitude">Aptitude</SelectItem>
            <SelectItem value="personality">Personality</SelectItem>
            <SelectItem value="interest">Interest</SelectItem>
            <SelectItem value="eq">Emotional Intelligence</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Cognitive Ability", "Personality", "Career Interest", "Emotional Intelligence"].map((category, index) => {
                    const scores = [85, 92, 78, 88];
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm">{scores[index]}%</span>
                        </div>
                        <Progress value={scores[index]} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResults.slice(0, 4).map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{result.testName}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(result.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getScoreBadgeVariant(result.score)}>
                        {result.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid gap-6">
            {filteredResults.map((result) => (
              <Card key={result.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{result.testName}</CardTitle>
                      <CardDescription>
                        Completed on {new Date(result.completedDate).toLocaleDateString()} • {result.category}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.percentile}th percentile
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Score</span>
                        <span className="text-sm">{result.score}%</span>
                      </div>
                      <Progress value={result.score} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Key Insights</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {result.insights.map((insight, index) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" size="sm">
                      View Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>
                Personalized analysis based on your test results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">🎯 Strengths</h4>
                  <p className="text-sm">
                    Your cognitive assessment shows exceptional logical reasoning and problem-solving abilities. 
                    You demonstrate strong analytical thinking and can handle complex information effectively.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">📈 Growth Areas</h4>
                  <p className="text-sm">
                    Consider developing your spatial intelligence further through practice with 3D visualization 
                    exercises. Your career interest inventory suggests exploring more investigative roles.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">💼 Career Recommendations</h4>
                  <p className="text-sm">
                    Based on your results, you'd excel in roles involving research, analysis, and creative 
                    problem-solving. Consider careers in data science, psychology, or consulting.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">🚀 Next Steps</h4>
                  <p className="text-sm">
                    Take the Advanced Cognitive Assessment to get deeper insights into your analytical 
                    abilities, and consider the Leadership Potential test to explore management capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
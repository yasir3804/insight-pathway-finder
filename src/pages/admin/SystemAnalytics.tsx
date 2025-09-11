import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Calendar, 
  Download,
  RefreshCw 
} from "lucide-react";

const analyticsData = {
  userGrowth: {
    thisMonth: 156,
    lastMonth: 134,
    percentChange: 16.4,
  },
  assessmentStats: {
    completed: 2847,
    inProgress: 423,
    averageScore: 78.5,
    completionRate: 87.2,
  },
  topCategories: [
    { name: "Career Interest", usage: 45, color: "bg-blue-500" },
    { name: "Personality", usage: 32, color: "bg-purple-500" },
    { name: "Academic Skills", usage: 28, color: "bg-green-500" },
    { name: "Technical Skills", usage: 19, color: "bg-orange-500" },
  ],
  deviceStats: [
    { device: "Desktop", percentage: 54, users: 1247 },
    { device: "Mobile", percentage: 38, users: 876 },
    { device: "Tablet", percentage: 8, users: 184 },
  ],
  recentMetrics: [
    {
      metric: "Average Session Duration",
      value: "12m 34s",
      change: "+8.2%",
      trend: "up",
    },
    {
      metric: "Bounce Rate",
      value: "23.4%",
      change: "-5.1%",
      trend: "down",
    },
    {
      metric: "Page Load Speed",
      value: "1.8s",
      change: "-12.3%",
      trend: "down",
    },
    {
      metric: "User Satisfaction",
      value: "4.7/5",
      change: "+3.2%",
      trend: "up",
    },
  ],
};

export const SystemAnalytics = () => {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingUp className="h-4 w-4 text-success rotate-180" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-success";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Analytics</h1>
          <p className="text-muted-foreground">Monitor system performance and user engagement</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.userGrowth.thisMonth}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +{analyticsData.userGrowth.percentChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.assessmentStats.completed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.assessmentStats.inProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.assessmentStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.assessmentStats.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assessment Categories */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Assessment Categories Usage</CardTitle>
              <CardDescription>Most popular assessment types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={category.usage} className="w-20" />
                      <span className="text-sm font-medium w-12 text-right">{category.usage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Analytics */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>User access by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.deviceStats.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{device.device}</span>
                      <p className="text-sm text-muted-foreground">{device.users.toLocaleString()} users</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={device.percentage} className="w-24" />
                      <span className="text-sm font-medium w-12 text-right">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key system performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentMetrics.map((metric, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{metric.value}</span>
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-soft mt-6 bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Today's Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Active Users</span>
                  <span className="font-bold">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Tests Started</span>
                  <span className="font-bold">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Tests Completed</span>
                  <span className="font-bold">189</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">New Registrations</span>
                  <span className="font-bold">23</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
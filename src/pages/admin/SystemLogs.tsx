import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { Search, Download, RefreshCw, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

const mockLogs = [
  {
    id: "L001",
    timestamp: "2024-03-11 14:30:25",
    level: "INFO",
    category: "Authentication",
    message: "User sarah@example.com successfully logged in",
    source: "auth-service",
    ip: "192.168.1.100",
  },
  {
    id: "L002", 
    timestamp: "2024-03-11 14:28:15",
    level: "WARNING",
    category: "Performance",
    message: "Database query execution time exceeded 2 seconds",
    source: "database",
    ip: "internal",
  },
  {
    id: "L003",
    timestamp: "2024-03-11 14:25:10",
    level: "ERROR",
    category: "API",
    message: "Failed to send notification email to user@example.com",
    source: "notification-service",
    ip: "internal",
  },
  {
    id: "L004",
    timestamp: "2024-03-11 14:22:45",
    level: "SUCCESS",
    category: "Assessment",
    message: "Assessment Q001 completed by user ID 1247",
    source: "assessment-engine",
    ip: "192.168.1.156",
  },
];

const mockSystemMetrics = [
  { metric: "CPU Usage", value: "45%", status: "normal", trend: "stable" },
  { metric: "Memory Usage", value: "67%", status: "warning", trend: "increasing" },
  { metric: "Disk Space", value: "23%", status: "normal", trend: "stable" },
  { metric: "Active Users", value: "847", status: "normal", trend: "increasing" },
  { metric: "Response Time", value: "1.8s", status: "normal", trend: "decreasing" },
  { metric: "Error Rate", value: "0.02%", status: "excellent", trend: "stable" },
];

export const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level.toLowerCase() === levelFilter;
    const matchesCategory = categoryFilter === "all" || log.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const {
    currentItems: paginatedLogs,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    hasNextPage,
    hasPreviousPage
  } = usePagination({
    data: filteredLogs,
    itemsPerPage: 8
  });

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
        return "text-green-600";
      case "normal":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
          <p className="text-muted-foreground">Monitor system activity and troubleshoot issues</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Info className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">12,847</div>
                <p className="text-sm text-muted-foreground">Info Logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">156</div>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">23</div>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <p className="text-sm text-muted-foreground">System Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Logs</CardTitle>
              <CardDescription>View and filter system activity logs</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Logs List */}
              <div className="space-y-2">
                {paginatedLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors font-mono text-sm">
                    <div className="flex items-start gap-3">
                      {getLevelIcon(log.level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-muted-foreground">{log.timestamp}</span>
                          <Badge variant="outline" className={getLevelColor(log.level)}>
                            {log.level}
                          </Badge>
                          <span className="text-muted-foreground">•</span>
                          <span className="font-medium">{log.category}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{log.source}</span>
                        </div>
                        <p className="text-foreground mb-1">{log.message}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>ID: {log.id}</span>
                          <span>IP: {log.ip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSystemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-3xl font-bold ${getMetricStatusColor(metric.status)}`}>
                      {metric.value}
                    </span>
                    <Badge variant="outline" className={`${getMetricStatusColor(metric.status)} border-current`}>
                      {metric.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trend: {metric.trend}
                  </p>
                </CardContent>
              </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {Math.min((currentPage - 1) * 8 + 1, totalItems)} to{" "}
                    {Math.min(currentPage * 8, totalItems)} of {totalItems} logs
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => goToPage(currentPage - 1)}
                          className={!hasPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (pageNum > totalPages) return null;
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              onClick={() => goToPage(pageNum)}
                              isActive={currentPage === pageNum}
                              className="cursor-pointer"
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => goToPage(currentPage + 1)}
                          className={!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No logs found matching your criteria.</p>
                </div>
              )}

          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
              <CardDescription>Real-time system performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Database Connection</h4>
                    <p className="text-sm text-muted-foreground">Primary database pool</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">API Services</h4>
                    <p className="text-sm text-muted-foreground">All microservices</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Cache Layer</h4>
                    <p className="text-sm text-muted-foreground">Redis cache cluster</p>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Degraded
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
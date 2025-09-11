import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Eye, Upload, Download } from "lucide-react";

const mockContent = [
  {
    id: "C001",
    title: "Career Guidance Manual",
    type: "Document",
    category: "Educational",
    status: "Published",
    author: "Dr. Sarah Wilson",
    views: 1247,
    lastModified: "2024-03-10",
    size: "2.4 MB"
  },
  {
    id: "C002",
    title: "Assessment Instructions Video",
    type: "Video",
    category: "Tutorial",
    status: "Published",
    author: "Admin Team",
    views: 892,
    lastModified: "2024-03-08",
    size: "45 MB"
  },
  {
    id: "C003",
    title: "Student Handbook 2024",
    type: "PDF",
    category: "Reference",
    status: "Draft",
    author: "Michael Chen",
    views: 0,
    lastModified: "2024-03-11",
    size: "8.7 MB"
  },
];

export const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "document":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "video":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pdf":
        return "bg-red-100 text-red-800 border-red-200";
      case "image":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-success/10 text-success border-success/20";
      case "draft":
        return "bg-warning/10 text-warning border-warning/20";
      case "archived":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage educational content and resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Bulk Export
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">234</div>
            <p className="text-sm text-muted-foreground">Total Content Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">189</div>
            <p className="text-sm text-muted-foreground">Published Content</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">45</div>
            <p className="text-sm text-muted-foreground">Draft Content</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary">156 GB</div>
            <p className="text-sm text-muted-foreground">Storage Used</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content Library</TabsTrigger>
          <TabsTrigger value="media">Media Files</TabsTrigger>
          <TabsTrigger value="analytics">Content Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Manage all educational content and resources</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content List */}
              <div className="space-y-4">
                {mockContent.map((content) => (
                  <div key={content.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{content.id}</span>
                          <Badge variant="outline" className={getTypeColor(content.type)}>
                            {content.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(content.status)}>
                            {content.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Author:</span> {content.author}
                          </div>
                          <div>
                            <span className="font-medium">Views:</span> {content.views.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {content.size}
                          </div>
                          <div>
                            <span className="font-medium">Modified:</span> {content.lastModified}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Files</CardTitle>
              <CardDescription>Manage images, videos, and other media assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Media Files</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here or click to browse
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>Track content performance and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Most Viewed Content</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Career Guidance Manual</span>
                      <span className="font-medium">1,247 views</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Assessment Instructions</span>
                      <span className="font-medium">892 views</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Study Tips Guide</span>
                      <span className="font-medium">675 views</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Content by Category</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Educational</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tutorial</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reference</span>
                      <span className="font-medium">23%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Recent Activity</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Manual updated 2 hours ago</div>
                    <div>Video uploaded 1 day ago</div>
                    <div>PDF archived 2 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
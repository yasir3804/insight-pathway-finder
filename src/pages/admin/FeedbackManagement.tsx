import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Star, MessageSquare, Flag, CheckCircle2, Clock } from "lucide-react";

const mockFeedback = [
  {
    id: "F001",
    user: "Sarah Johnson",
    userRole: "Student",
    rating: 5,
    category: "Assessment",
    subject: "Great career assessment tool!",
    message: "The career assessment helped me understand my strengths and interests better. Very comprehensive and user-friendly.",
    status: "New",
    priority: "Low",
    submittedDate: "2024-03-11",
    respondedBy: null,
  },
  {
    id: "F002",
    user: "Michael Chen",
    userRole: "Professional", 
    rating: 4,
    category: "Platform",
    subject: "Platform Performance Issue",
    message: "The platform is great overall, but I noticed some loading delays during peak hours. Could this be improved?",
    status: "In Progress",
    priority: "Medium",
    submittedDate: "2024-03-10",
    respondedBy: "Admin Team",
  },
  {
    id: "F003",
    user: "Emily Davis",
    userRole: "Counselor",
    rating: 2,
    category: "Feature Request",
    subject: "Need bulk student management features",
    message: "It would be great to have bulk operations for managing multiple students at once. Currently have to do everything individually.",
    status: "Resolved",
    priority: "High",
    submittedDate: "2024-03-08",
    respondedBy: "Dr. Wilson",
  },
];

export const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "resolved":
        return "bg-success/10 text-success border-success/20";
      case "closed":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "student":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "counselor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "professional":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feedback Management</h1>
          <p className="text-muted-foreground">Manage user feedback and support requests</p>
        </div>
        <Button>
          <Flag className="h-4 w-4 mr-2" />
          Export Feedback
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">847</div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">23</div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">789</div>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary">4.6</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <div className="flex mt-1">
              {getRatingStars(5)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
          <CardDescription>Review and respond to user feedback and suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {mockFeedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-muted-foreground">{feedback.id}</span>
                      <Badge variant="outline" className={getRoleColor(feedback.userRole)}>
                        {feedback.userRole}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(feedback.priority)}>
                        {feedback.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{feedback.subject}</h3>
                      <div className="flex items-center gap-1">
                        {getRatingStars(feedback.rating)}
                        <span className="text-sm text-muted-foreground ml-1">({feedback.rating}/5)</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      By {feedback.user} • {feedback.category} • {feedback.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="text-foreground">{feedback.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {feedback.respondedBy ? (
                      <span>Responded by: {feedback.respondedBy}</span>
                    ) : (
                      <span>No response yet</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Resolved
                    </Button>
                    <Button size="sm" variant="outline">
                      Escalate
                    </Button>
                  </div>
                </div>

                {/* Response Section */}
                {feedback.status === "In Progress" && (
                  <div className="mt-4 p-4 border rounded-lg bg-background">
                    <h4 className="font-medium mb-2">Response</h4>
                    <Textarea 
                      placeholder="Type your response here..."
                      className="mb-3"
                    />
                    <div className="flex gap-2">
                      <Button size="sm">Send Response</Button>
                      <Button size="sm" variant="outline">Save Draft</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
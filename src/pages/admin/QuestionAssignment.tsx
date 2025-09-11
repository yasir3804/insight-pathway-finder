import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Copy, Eye } from "lucide-react";

const mockQuestions = [
  {
    id: "Q001",
    question: "What type of work environment do you prefer?",
    category: "Career Interest",
    type: "Multiple Choice",
    difficulty: "Easy",
    status: "Active",
    responses: 1247,
    createdDate: "2024-01-15",
  },
  {
    id: "Q002",
    question: "How do you handle stress in challenging situations?",
    category: "Personality",
    type: "Scale Rating",
    difficulty: "Medium",
    status: "Active",
    responses: 892,
    createdDate: "2024-02-01",
  },
  {
    id: "Q003",
    question: "Which subject area interests you most?",
    category: "Academic",
    type: "Multiple Choice",
    difficulty: "Easy",
    status: "Draft",
    responses: 0,
    createdDate: "2024-03-10",
  },
];

const mockAssignments = [
  {
    id: "A001",
    assessmentName: "Career Aptitude Test",
    assignedTo: "Grade 12 Students",
    questionCount: 45,
    dueDate: "2024-03-20",
    completion: 78,
    status: "Active",
  },
  {
    id: "A002",
    assessmentName: "Personality Assessment",
    assignedTo: "All Students",
    questionCount: 30,
    dueDate: "2024-03-25",
    completion: 45,
    status: "Active",
  },
  {
    id: "A003",
    assessmentName: "Skills Evaluation",
    assignedTo: "Professional Track",
    questionCount: 25,
    dueDate: "2024-04-01",
    completion: 12,
    status: "Scheduled",
  },
];

export const QuestionAssignment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "career interest":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "personality":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "academic":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "draft":
        return "bg-warning/10 text-warning border-warning/20";
      case "scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Question Assignment</h1>
          <p className="text-muted-foreground">Manage assessment questions and assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Question
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">890</div>
            <p className="text-sm text-muted-foreground">Total Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">645</div>
            <p className="text-sm text-muted-foreground">Active Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">123</div>
            <p className="text-sm text-muted-foreground">Draft Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary">45</div>
            <p className="text-sm text-muted-foreground">Active Assignments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>Manage your assessment questions</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="career">Career Interest</SelectItem>
                    <SelectItem value="personality">Personality</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {mockQuestions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{question.id}</span>
                          <Badge variant="outline" className={getCategoryColor(question.category)}>
                            {question.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(question.status)}>
                            {question.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{question.question}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Type: {question.type}</span>
                          <span>Responses: {question.responses.toLocaleString()}</span>
                          <span>Created: {question.createdDate}</span>
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
                          <Copy className="h-4 w-4" />
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

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Assignments</CardTitle>
              <CardDescription>Manage question assignments and track completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{assignment.assessmentName}</h3>
                        <p className="text-muted-foreground">Assigned to: {assignment.assignedTo}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Questions</p>
                        <p className="text-2xl font-bold text-primary">{assignment.questionCount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-lg font-semibold">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Completion</p>
                        <p className="text-2xl font-bold text-success">{assignment.completion}%</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${assignment.completion}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
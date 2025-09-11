import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, ExternalLink, DollarSign, GraduationCap } from "lucide-react";

const mockScholarships = [
  {
    id: "S001",
    title: "Merit Excellence Scholarship",
    provider: "National Education Foundation",
    amount: "$5,000",
    deadline: "2024-04-15",
    category: "Academic Merit",
    status: "Active",
    applicants: 234,
    eligibility: "GPA 3.5+, Full-time student",
  },
  {
    id: "S002", 
    title: "STEM Innovation Grant",
    provider: "Tech Future Institute",
    amount: "$8,000",
    deadline: "2024-05-01",
    category: "STEM",
    status: "Active",
    applicants: 156,
    eligibility: "STEM major, Research project required",
  },
  {
    id: "S003",
    title: "Community Service Award",
    provider: "Civic Leadership Organization",
    amount: "$3,000",
    deadline: "2024-03-30",
    category: "Community Service",
    status: "Closing Soon",
    applicants: 89,
    eligibility: "100+ volunteer hours, Essay required",
  },
];

const mockLoans = [
  {
    id: "L001",
    provider: "Federal Student Aid",
    type: "Direct Subsidized Loan",
    interestRate: "5.50%",
    maxAmount: "$12,500",
    category: "Federal",
    status: "Available",
    description: "Need-based loan with government-paid interest during school",
  },
  {
    id: "L002",
    provider: "Private Bank Education",
    type: "Private Student Loan", 
    interestRate: "6.25-12.99%",
    maxAmount: "$200,000",
    category: "Private",
    status: "Available",
    description: "Credit-based loan with competitive rates",
  },
  {
    id: "L003",
    provider: "State Education Department",
    type: "State Grant Program",
    interestRate: "0%",
    maxAmount: "$5,000",
    category: "State Grant",
    status: "Limited",
    description: "Need-based grant for state residents",
  },
];

export const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "academic merit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "stem":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "community service":
        return "bg-green-100 text-green-800 border-green-200";
      case "federal":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "private":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "state grant":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "closing soon":
        return "bg-warning/10 text-warning border-warning/20";
      case "available":
        return "bg-success/10 text-success border-success/20";
      case "limited":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Degree Loans & Scholarships</h1>
          <p className="text-muted-foreground">Manage financial aid opportunities for students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            External Sources
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">124</div>
                <p className="text-sm text-muted-foreground">Active Scholarships</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">$2.4M</div>
                <p className="text-sm text-muted-foreground">Available Funding</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">1,489</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary">67</div>
            <p className="text-sm text-muted-foreground">Loan Programs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scholarships" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="loans">Loans & Grants</TabsTrigger>
        </TabsList>

        <TabsContent value="scholarships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Opportunities</CardTitle>
              <CardDescription>Manage available scholarships and track applications</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search scholarships..."
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
                    <SelectItem value="merit">Academic Merit</SelectItem>
                    <SelectItem value="stem">STEM</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="need">Need-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Scholarships List */}
              <div className="space-y-4">
                {mockScholarships.map((scholarship) => (
                  <div key={scholarship.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{scholarship.title}</h3>
                          <Badge variant="outline" className={getStatusColor(scholarship.status)}>
                            {scholarship.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{scholarship.provider}</p>
                        <Badge variant="outline" className={getCategoryColor(scholarship.category)}>
                          {scholarship.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success mb-1">{scholarship.amount}</div>
                        <p className="text-sm text-muted-foreground">Award Amount</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Application Deadline</p>
                        <p className="font-semibold">{scholarship.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Applicants</p>
                        <p className="font-semibold">{scholarship.applicants}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Eligibility</p>
                        <p className="text-sm">{scholarship.eligibility}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Applications
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Programs & Grants</CardTitle>
              <CardDescription>Educational loans and grant opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLoans.map((loan) => (
                  <div key={loan.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{loan.type}</h3>
                        <p className="text-muted-foreground mb-2">{loan.provider}</p>
                        <Badge variant="outline" className={getCategoryColor(loan.category)}>
                          {loan.category}
                        </Badge>
                      </div>
                      <Badge variant="outline" className={getStatusColor(loan.status)}>
                        {loan.status}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">{loan.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                        <p className="text-lg font-bold text-primary">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Maximum Amount</p>
                        <p className="text-lg font-bold text-success">{loan.maxAmount}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Application Process
                      </Button>
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
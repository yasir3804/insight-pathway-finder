import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Brain, Eye, EyeOff, Loader2, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProfessionalRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationType: "",
    position: "",
    department: "",
    expectedUsers: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.organizationName) {
      return "Please fill in all required fields";
    }
    
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    
    if (!formData.agreeToTerms) {
      return "Please agree to the Terms and Conditions";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name, "professional");
      toast({
        title: "Account created successfully!",
        description: "Welcome to PsychoMetrics. Start managing your organization's assessments!",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  const organizationTypes = [
    { value: "school", label: "School" },
    { value: "college", label: "College/University" },
    { value: "corporate", label: "Corporate" },
    { value: "training", label: "Training Institute" },
    { value: "consulting", label: "Consulting Firm" },
    { value: "other", label: "Other" },
  ];

  const userRanges = [
    { value: "1-50", label: "1-50 users" },
    { value: "51-200", label: "51-200 users" },
    { value: "201-500", label: "201-500 users" },
    { value: "501-1000", label: "501-1000 users" },
    { value: "1000+", label: "1000+ users" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4 py-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PsychoMetrics
            </span>
          </Link>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/20 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Organization Registration</h2>
          <p className="text-muted-foreground mt-2">
            Set up your institution account for comprehensive assessment management
          </p>
        </div>

        <Card className="shadow-elegant animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Join as Organization</CardTitle>
            <CardDescription className="text-center">
              Manage assessments for your entire institution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Administrator Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Administrator Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your professional email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  type="text"
                  placeholder="School, college, or company name"
                  value={formData.organizationName}
                  onChange={(e) => handleChange("organizationName", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <Select onValueChange={(value) => handleChange("organizationType", value)} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationTypes.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedUsers">Expected Users</Label>
                  <Select onValueChange={(value) => handleChange("expectedUsers", value)} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="User count" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRanges.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Your Position</Label>
                  <Input
                    id="position"
                    type="text"
                    placeholder="e.g., Principal, HR Manager"
                    value={formData.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="e.g., Administration, HR"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleChange("agreeToTerms", checked)}
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Organization Account"
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
              <div className="text-center text-sm">
                <Link to="/role-selection" className="text-muted-foreground hover:underline">
                  ← Choose different role
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Key, 
  Activity, 
  Clock,
  Save,
  Upload
} from "lucide-react";

const adminPermissions = [
  { id: "user_management", name: "User Management", description: "Create, edit, and delete user accounts", enabled: true },
  { id: "content_management", name: "Content Management", description: "Manage educational content and resources", enabled: true },
  { id: "system_analytics", name: "System Analytics", description: "View system performance and user analytics", enabled: true },
  { id: "feedback_management", name: "Feedback Management", description: "Manage user feedback and support requests", enabled: true },
  { id: "question_assignment", name: "Question Assignment", description: "Create and assign assessment questions", enabled: false },
  { id: "system_logs", name: "System Logs", description: "Access system logs and troubleshooting tools", enabled: true },
];

const recentActivity = [
  {
    action: "Updated user permissions for Sarah Johnson",
    timestamp: "2024-03-11 14:30:25",
    category: "User Management",
  },
  {
    action: "Generated system analytics report",
    timestamp: "2024-03-11 12:15:10", 
    category: "Analytics",
  },
  {
    action: "Resolved feedback ticket #F001",
    timestamp: "2024-03-11 09:45:30",
    category: "Feedback",
  },
  {
    action: "Added new scholarship opportunity",
    timestamp: "2024-03-10 16:20:15",
    category: "Scholarships",
  },
];

export const AdminProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "System Administrator with 5+ years of experience in educational technology platforms.",
    phone: "+1 (555) 123-4567",
    department: "IT Administration",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    systemUpdates: true,
  });

  const handleSaveProfile = async () => {
    try {
      await updateProfile({ name: formData.name });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Shield className="h-3 w-3 mr-1" />
          Administrator
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <Badge variant="outline" className="mx-auto">
                {user?.role}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Last login: Today at 2:30 PM</span>
                </div>
                <div>Account created: January 15, 2024</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Users Managed</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Content Items</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resolved Issues</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">System Uptime</span>
                <span className="font-semibold">99.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Admin Permissions
                  </CardTitle>
                  <CardDescription>
                    Manage your administrative access and capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{permission.name}</h4>
                            <Badge variant={permission.enabled ? "default" : "secondary"}>
                              {permission.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{permission.description}</p>
                        </div>
                        <Switch checked={permission.enabled} disabled />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive browser push notifications
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="security-alerts" className="font-medium">
                          Security Alerts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Important security notifications
                        </p>
                      </div>
                      <Switch
                        id="security-alerts"
                        checked={notifications.securityAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, securityAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-updates" className="font-medium">
                          System Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications about system maintenance
                        </p>
                      </div>
                      <Switch
                        id="system-updates"
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, systemUpdates: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your recent administrative actions and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{activity.timestamp}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {activity.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
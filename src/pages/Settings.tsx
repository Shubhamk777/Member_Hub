
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Bell,
  Building2,
  Mail,
  MessageSquare,
  Paintbrush,
  Shield,
  User,
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  enabled: boolean;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to MemberHub!",
    content: "Dear {member_name},\n\nWelcome to MemberHub...",
  },
  {
    id: "renewal",
    name: "Renewal Reminder",
    subject: "Your Membership is Expiring Soon",
    content: "Dear {member_name},\n\nYour membership expires on {expiration_date}...",
  },
  {
    id: "certificate",
    name: "Certificate Issued",
    subject: "Your Certificate is Ready",
    content: "Dear {member_name},\n\nCongratulations on your {achievement}...",
  },
];

const notificationSettings: NotificationSetting[] = [
  {
    id: "email-notifications",
    type: "Email Notifications",
    description: "Receive email notifications for important updates",
    enabled: true,
  },
  {
    id: "renewal-reminders",
    type: "Renewal Reminders",
    description: "Get notified before membership expiration",
    enabled: true,
  },
  {
    id: "certificate-alerts",
    type: "Certificate Alerts",
    description: "Notifications when certificates are generated",
    enabled: true,
  },
];

const Settings = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [organizationName, setOrganizationName] = useState("MemberHub");
  const [theme, setTheme] = useState("light");

  const handleNotificationToggle = (id: string) => {
    setNotifications(
      notifications.map((note) =>
        note.id === id ? { ...note, enabled: !note.enabled } : note
      )
    );
    
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved",
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved",
      description: "Email template has been updated successfully",
    });
  };

  const handleSaveOrganization = () => {
    toast({
      title: "Organization settings saved",
      description: "Your organization settings have been updated",
    });
  };

  return (
    <div className="page-container">
      <div className="page-header mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization preferences and configurations
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="organization">
            <Building2 size={16} className="mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="email-templates">
            <Mail size={16} className="mr-2" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Paintbrush size={16} className="mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield size={16} className="mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Configure your organization's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveOrganization}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <h4 className="font-medium">{notification.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={() =>
                      handleNotificationToggle(notification.id)
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email-templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize email templates for various notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <Select
                  value={selectedTemplate.id}
                  onValueChange={(value) => 
                    setSelectedTemplate(
                      emailTemplates.find((t) => t.id === value) || emailTemplates[0]
                    )
                  }
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={selectedTemplate.subject}
                  placeholder="Email subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={selectedTemplate.content}
                  placeholder="Email content"
                  rows={10}
                />
              </div>
              
              <div className="space-y-2 p-4 bg-muted rounded-md">
                <p className="text-sm font-medium">Available Variables:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>{`{member_name} - Member's full name`}</li>
                  <li>{`{expiration_date} - Membership expiration date`}</li>
                  <li>{`{achievement} - Certificate achievement or title`}</li>
                </ul>
              </div>
              
              <Button onClick={handleSaveTemplate}>Save Template</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how MemberHub looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Customize Colors</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <Input
                      type="color"
                      id="primary-color"
                      defaultValue="#8B5CF6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <Input
                      type="color"
                      id="secondary-color"
                      defaultValue="#6D28D9"
                    />
                  </div>
                </div>
              </div>
              
              <Button>Save Appearance</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable 2FA</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Session Management</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-muted-foreground">
                        Chrome on Windows • Active now
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      End Session
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>API Access</Label>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Key</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage API access for integrations
                    </p>
                  </div>
                  <Button variant="outline">Generate Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

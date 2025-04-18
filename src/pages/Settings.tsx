
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Bell,
  Building2,
  Lock,
  Mail,
  Save,
  User,
  Sliders,
  Globe,
  Palette,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [certificateNotifications, setCertificateNotifications] = useState(true);
  const [theme, setTheme] = useState("system");
  
  const handleSaveGeneralSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveNotificationSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };
  
  const handleSavePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Password changed",
      description: "Your password has been successfully updated.",
    });
  };
  
  const handleSaveAppearanceSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated successfully.",
    });
  };

  return (
    <div className="page-container">
      <div className="page-header mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveGeneralSettings}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="admin@memberhub.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" disabled />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>
                Configure system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Date Format</Label>
                  <div className="text-sm text-muted-foreground">
                    Choose how dates are displayed throughout the application
                  </div>
                </div>
                <Select defaultValue="mdy">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default Landing Page</Label>
                  <div className="text-sm text-muted-foreground">
                    Set which page loads first when you log in
                  </div>
                </div>
                <Select defaultValue="dashboard">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="members">Members</SelectItem>
                    <SelectItem value="certificates">Certificates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Items Per Page</Label>
                  <div className="text-sm text-muted-foreground">
                    Default number of items to show in lists and tables
                  </div>
                </div>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Manage your organization information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="MemberHub Organization" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orgEmail">Organization Email</Label>
                <Input id="orgEmail" defaultValue="info@memberhuborganization.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orgPhone">Organization Phone</Label>
                <Input id="orgPhone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orgAddress">Organization Address</Label>
                <Textarea id="orgAddress" defaultValue="123 Member Street, Suite 100, Organization City, State 12345" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orgWebsite">Organization Website</Label>
                <Input id="orgWebsite" defaultValue="https://www.memberhuborganization.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orgLogo">Organization Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-md p-4 flex items-center justify-center w-20 h-20">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Change Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Membership Settings</CardTitle>
              <CardDescription>
                Configure membership types and renewal settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Renewal</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable automatic membership renewals
                  </div>
                </div>
                <Switch defaultChecked id="auto-renewal" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Grace Period</Label>
                  <div className="text-sm text-muted-foreground">
                    Days to allow after membership expiration
                  </div>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default Membership Duration</Label>
                  <div className="text-sm text-muted-foreground">
                    Default length of new memberships
                  </div>
                </div>
                <Select defaultValue="1year">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Membership Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotificationSettings}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    id="email-notifications" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Renewal Reminders</Label>
                    <div className="text-sm text-muted-foreground">
                      Notifications for upcoming membership renewals
                    </div>
                  </div>
                  <Switch 
                    checked={reminderNotifications}
                    onCheckedChange={setReminderNotifications}
                    id="renewal-notifications"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Certificate Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Notifications when certificates are issued
                    </div>
                  </div>
                  <Switch 
                    checked={certificateNotifications}
                    onCheckedChange={setCertificateNotifications}
                    id="certificate-notifications"
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Reminder Schedule</h3>
                  <div className="space-y-1">
                    <Label htmlFor="firstReminderDays">First Reminder (Days Before Expiration)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1 mt-4">
                    <Label htmlFor="secondReminderDays">Second Reminder (Days Before Expiration)</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1 mt-4">
                    <Label htmlFor="finalReminderDays">Final Reminder (Days Before Expiration)</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Same day</SelectItem>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Bell className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize the templates used for email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="welcomeTemplate">Welcome Email Template</Label>
                <Textarea 
                  id="welcomeTemplate" 
                  rows={3}
                  defaultValue="Welcome to MemberHub, {{member_name}}! We're excited to have you as a member." 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reminderTemplate">Renewal Reminder Template</Label>
                <Textarea 
                  id="reminderTemplate" 
                  rows={3}
                  defaultValue="Hello {{member_name}}, your membership is set to expire on {{expiration_date}}. Please renew to continue enjoying member benefits." 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="certificateTemplate">Certificate Issuance Template</Label>
                <Textarea 
                  id="certificateTemplate" 
                  rows={3}
                  defaultValue="Congratulations {{member_name}}! Your certificate for {{achievement}} has been issued. You can download it from your member portal." 
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                <p>Available template variables:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>{{member_name}} - Full name of the member</li>
                  <li>{{expiration_date}} - Membership expiration date</li>
                  <li>{{achievement}} - Certificate achievement name</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Save Email Templates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSavePasswordReset}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="text-sm bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-amber-800">
                    Make sure your password is at least 8 characters long and contains a mix of letters, numbers, and symbols.
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Require a verification code in addition to your password
                  </div>
                </div>
                <Switch id="twoFactorAuth" />
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-4">
                  Two-factor authentication requires you to verify your identity using a second device when you sign in.
                </div>
                <Button variant="outline" disabled>
                  Set Up Two-Factor Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" defaultValue="••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable API Access</Label>
                  <div className="text-sm text-muted-foreground">
                    Allow programmatic access to your account data
                  </div>
                </div>
                <Switch id="apiAccess" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save API Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your MemberHub
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveAppearanceSettings}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Card 
                      className={cn(
                        "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                        theme === "light" && "border-primary"
                      )}
                      onClick={() => setTheme("light")}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-16 w-16 rounded-md bg-zinc-50 border"></div>
                        <div className="text-sm font-medium">Light</div>
                      </div>
                    </Card>
                    
                    <Card 
                      className={cn(
                        "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                        theme === "dark" && "border-primary"
                      )}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-16 w-16 rounded-md bg-zinc-900 border border-zinc-800"></div>
                        <div className="text-sm font-medium">Dark</div>
                      </div>
                    </Card>
                    
                    <Card 
                      className={cn(
                        "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                        theme === "system" && "border-primary"
                      )}
                      onClick={() => setTheme("system")}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-16 w-16 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-900 border"></div>
                        <div className="text-sm font-medium">System</div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">Accent Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer border-2 border-blue-500"></div>
                    <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-slate-500 cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">Font Size</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Animations</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable animations and transitions
                    </div>
                  </div>
                  <Switch defaultChecked id="animations" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">Sidebar Position</Label>
                  <Select defaultValue="left">
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Palette className="mr-2 h-4 w-4" />
                  Save Appearance Settings
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificate Templates</CardTitle>
              <CardDescription>
                Customize the default appearance of certificates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="defaultLogo">Default Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-md p-4 flex items-center justify-center w-20 h-20">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Change Logo</Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="defaultFont">Default Font</Label>
                <Select defaultValue="timesNewRoman">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="timesNewRoman">Times New Roman</SelectItem>
                    <SelectItem value="calibri">Calibri</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                    <SelectItem value="garamond">Garamond</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="defaultColor">Default Border Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer border-2 border-green-500"></div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-yellow-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-slate-500 cursor-pointer"></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="defaultBgColor">Default Background Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-8 w-8 rounded-full bg-white border cursor-pointer border-2"></div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 border cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-50 border cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-green-50 border cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-amber-50 border cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-rose-50 border cursor-pointer"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Certificate Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Settings;

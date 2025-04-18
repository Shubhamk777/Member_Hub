
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart2,
  Calendar,
  Download,
  FileSpreadsheet,
  LineChart,
  PieChart,
  Share2,
} from "lucide-react";
import { mockMembers } from "@/data/mockMembers";
import { mockCertificateIssuances } from "@/data/mockCertificates";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as ReLineChart, Line, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format, subDays, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";

// Mock data for membership growth over time
const membershipGrowthData = [
  { month: 'Jan', count: 120 },
  { month: 'Feb', count: 135 },
  { month: 'Mar', count: 148 },
  { month: 'Apr', count: 160 },
  { month: 'May', count: 175 },
  { month: 'Jun', count: 188 },
  { month: 'Jul', count: 200 },
  { month: 'Aug', count: 220 },
  { month: 'Sep', count: 240 },
  { month: 'Oct', count: 252 },
  { month: 'Nov', count: 265 },
  { month: 'Dec', count: 280 },
];

// Helper component for date picker
function DateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });

  return (
    <div className={className}>
      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  );
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate member metrics
  const memberCount = mockMembers.length;
  const activeMembers = mockMembers.filter(m => m.status === "active").length;
  const inactiveMembers = mockMembers.filter(m => m.status === "inactive").length;
  const pendingMembers = mockMembers.filter(m => m.status === "pending").length;
  const expiredMembers = mockMembers.filter(m => m.status === "expired").length;
  
  // Calculate membership tiers
  const basicTier = mockMembers.filter(m => m.tier === "basic").length;
  const premiumTier = mockMembers.filter(m => m.tier === "premium").length;
  const enterpriseTier = mockMembers.filter(m => m.tier === "enterprise").length;
  
  // Member status pie chart data
  const memberStatusData = [
    { name: "Active", value: activeMembers, color: "#22c55e" },
    { name: "Inactive", value: inactiveMembers, color: "#94a3b8" },
    { name: "Pending", value: pendingMembers, color: "#f59e0b" }, 
    { name: "Expired", value: expiredMembers, color: "#ef4444" },
  ];
  
  // Member tier pie chart data
  const memberTierData = [
    { name: "Basic", value: basicTier, color: "#94a3b8" },
    { name: "Premium", value: premiumTier, color: "#8b5cf6" },
    { name: "Enterprise", value: enterpriseTier, color: "#6d28d9" },
  ];
  
  // Certificate issuance over time
  const certificatesData = [
    { month: 'Jan', count: 10 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 8 },
    { month: 'Apr', count: 20 },
    { month: 'May', count: 12 },
    { month: 'Jun', count: 18 },
    { month: 'Jul', count: 22 },
    { month: 'Aug', count: 16 },
    { month: 'Sep', count: 28 },
    { month: 'Oct', count: 24 },
    { month: 'Nov', count: 30 },
    { month: 'Dec', count: 35 },
  ];
  
  // Retention rate data
  const retentionData = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 94 },
    { month: 'Mar', rate: 91 },
    { month: 'Apr', rate: 88 },
    { month: 'May', rate: 90 },
    { month: 'Jun', rate: 93 },
    { month: 'Jul', rate: 95 },
    { month: 'Aug', rate: 94 },
    { month: 'Sep', rate: 92 },
    { month: 'Oct', rate: 91 },
    { month: 'Nov', rate: 93 },
    { month: 'Dec', rate: 96 },
  ];
  
  return (
    <div className="page-container">
      <div className="page-header mb-6">
        <h1 className="page-title">Reports</h1>
        <p className="text-muted-foreground">
          Analyze and export membership data and analytics
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex justify-end mb-4">
        <DateRangePicker className="w-auto" />
      </div>

      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Members
                  </CardTitle>
                  <div className="text-2xl font-bold">{memberCount}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+15% </span> 
                    from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Members
                  </CardTitle>
                  <div className="text-2xl font-bold">{activeMembers}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+8% </span> 
                    from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Certificates Issued
                  </CardTitle>
                  <div className="text-2xl font-bold">{mockCertificateIssuances.length}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+23% </span> 
                    from last month
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Member Status Distribution</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={memberStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {memberStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Membership Growth</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1" /> Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart
                        data={membershipGrowthData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        
        {activeTab === "membership" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Member Status Distribution</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet size={14} className="mr-1" /> CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={memberStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {memberStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="text-sm text-muted-foreground">
                  Based on {memberCount} total members
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Membership Tier Distribution</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet size={14} className="mr-1" /> CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={memberTierData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {memberTierData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="text-sm text-muted-foreground">
                  Based on {memberCount} total members
                </div>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Membership Growth Trend</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet size={14} className="mr-1" /> CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                      data={membershipGrowthData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="text-sm text-muted-foreground">
                  Showing data from last 12 months
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Certificate Issuance Trend</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet size={14} className="mr-1" /> CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={certificatesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Certificates Issued" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="text-sm text-muted-foreground">
                  Total certificates issued: {certificatesData.reduce((acc, item) => acc + item.count, 0)}
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {activeTab === "retention" && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Member Retention Rate</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet size={14} className="mr-1" /> CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                      data={retentionData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rate" stroke="#22c55e" activeDot={{ r: 8 }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="text-sm text-muted-foreground">
                  Average retention rate: {(retentionData.reduce((acc, item) => acc + item.rate, 0) / retentionData.length).toFixed(1)}%
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {activeTab === "custom" && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Report Builder</CardTitle>
                <CardDescription>
                  Select parameters and metrics to create a custom report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Report Type</div>
                      <Tabs defaultValue="membership">
                        <TabsList className="w-full grid grid-cols-3">
                          <TabsTrigger value="membership">Membership</TabsTrigger>
                          <TabsTrigger value="certificates">Certificates</TabsTrigger>
                          <TabsTrigger value="financial">Financial</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Date Range</div>
                      <DateRangePicker className="w-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Data Visualization</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors border-primary">
                        <div className="flex flex-col items-center justify-center">
                          <BarChart2 className="h-6 w-6 mb-2" />
                          <div className="text-xs font-medium">Bar Chart</div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <LineChart className="h-6 w-6 mb-2" />
                          <div className="text-xs font-medium">Line Chart</div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <PieChart className="h-6 w-6 mb-2" />
                          <div className="text-xs font-medium">Pie Chart</div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <FileSpreadsheet className="h-6 w-6 mb-2" />
                          <div className="text-xs font-medium">Table</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-muted rounded-full p-3">
                    <BarChart2 size={24} className="text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Generate Custom Report</h3>
                <p className="text-muted-foreground mb-4">
                  Select parameters above and click "Generate Report" to create a custom report
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;

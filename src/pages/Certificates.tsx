
import { useState } from "react";
import { Link } from "react-router-dom";
import { mockCertificateTemplates, mockCertificateIssuances } from "@/data/mockCertificates";
import { mockMembers } from "@/data/mockMembers";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Download,
  Mail,
  MoreHorizontal,
  Plus,
  FileText,
  Layout,
  Trash,
  Edit
} from "lucide-react";

const Certificates = () => {
  const [activeTab, setActiveTab] = useState("issued");

  // For a real app, these would be API calls with proper state management
  const issuances = mockCertificateIssuances.map(cert => {
    const member = mockMembers.find(m => m.id === cert.memberId);
    return {
      ...cert,
      memberName: member ? `${member.firstName} ${member.lastName}` : cert.memberName
    };
  });
  
  const templates = mockCertificateTemplates;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Certificates</h1>
        <Link to="/certificates/generate">
          <Button>
            <Award className="mr-2 h-4 w-4" />
            Generate Certificate
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="issued">Issued Certificates</TabsTrigger>
          <TabsTrigger value="templates">Certificate Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issued" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Certificate</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issuances.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-primary/10 rounded-md flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{cert.achievement}</div>
                          <div className="text-xs text-muted-foreground">#{cert.certificateNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{cert.memberName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(cert.issuedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={cert.emailSent ? "default" : "outline"}>
                        {cert.emailSent ? "Sent" : "Not Sent"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          {!cert.emailSent && (
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Email to Recipient
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{template.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Template
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Layout className="mr-2 h-4 w-4" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div 
                    className="border rounded-md p-4 h-32 flex items-center justify-center overflow-hidden text-center"
                    style={{ 
                      backgroundColor: template.backgroundColor,
                      borderColor: template.borderColor,
                      fontFamily: template.fontFamily
                    }}
                  >
                    <div>
                      <div className="font-bold text-sm mb-1">{template.headerText}</div>
                      <div className="text-xs opacity-70">Sample certificate preview</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/certificates/generate?template=${template.id}`}>
                      Use Template
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Certificates;

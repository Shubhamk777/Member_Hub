
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Member } from "@/types/member";
import { CertificateTemplate } from "@/types/certificate";
import { mockCertificateTemplates } from "@/data/mockCertificates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Download, Mail, Printer } from "lucide-react";

interface CertificateGeneratorProps {
  member?: Member;
  templates?: CertificateTemplate[];
}

const CertificateGenerator = ({ 
  member, 
  templates = mockCertificateTemplates 
}: CertificateGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(templates[0] || null);
  const [achievement, setAchievement] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<string | null>(null);
  
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  };
  
  const generateCertificate = () => {
    if (!selectedTemplate || !achievement || !issueDate) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields before generating certificate",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate certificate generation
    setTimeout(() => {
      setGeneratedCertificate("certificate_preview");
      setIsGenerating(false);
      toast({
        title: "Certificate Generated!",
        description: "Your certificate has been successfully generated.",
      });
    }, 1500);
  };
  
  const downloadCertificate = () => {
    toast({
      title: "Download Started",
      description: "Your certificate is being downloaded.",
    });
    // In a real app, this would trigger an actual download
  };
  
  const emailCertificate = () => {
    toast({
      title: "Email Sent!",
      description: `Certificate has been sent to ${member?.email || "the member's email"}`,
    });
    // In a real app, this would send an email
  };
  
  const printCertificate = () => {
    window.print();
  };

  const previewBodyText = selectedTemplate?.bodyText
    .replace("{{name}}", member?.firstName + " " + member?.lastName || "Member Name")
    .replace("{{achievement}}", achievement || "Achievement Title")
    .replace("{{date}}", new Date(issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    .replace("{{tier}}", member?.tier || "basic")
    .replace("{{joinDate}}", member?.joinDate ? new Date(member.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Join Date")
    .replace("{{renewalDate}}", member?.renewalDate ? new Date(member.renewalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Renewal Date");
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Information</CardTitle>
            <CardDescription>
              Enter the details for this certificate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Certificate Template</Label>
              <Select
                value={selectedTemplate?.id}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement">Achievement or Title</Label>
              <Input
                id="achievement"
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                placeholder="e.g., Leadership Training Completion"
              />
              <p className="text-xs text-muted-foreground">
                This will appear in the certificate body
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input
                id="issue-date"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            {member && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Recipient Information</p>
                <p className="text-sm">Name: {member.firstName} {member.lastName}</p>
                <p className="text-sm">Email: {member.email}</p>
                <p className="text-sm">Membership: {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={generateCertificate} 
              disabled={isGenerating || !achievement || !issueDate}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Certificate"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        {generatedCertificate ? (
          <Card>
            <CardHeader>
              <CardTitle>Certificate Preview</CardTitle>
              <CardDescription>
                Review your certificate before downloading or sending
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div 
                className="border rounded-md p-6 w-full aspect-[1.4/1] flex flex-col items-center justify-between text-center"
                style={{
                  backgroundColor: selectedTemplate?.backgroundColor || "#ffffff",
                  borderColor: selectedTemplate?.borderColor || "#000000",
                  borderWidth: "10px",
                  fontFamily: selectedTemplate?.fontFamily || "serif",
                }}
              >
                <div className="text-2xl font-bold mt-4 text-primary">
                  {selectedTemplate?.headerText}
                </div>
                
                <div className="text-lg my-8 px-8">{previewBodyText}</div>
                
                <div className="mb-4 text-sm text-muted-foreground">
                  {selectedTemplate?.footerText || ""}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
              <Button variant="outline" onClick={printCertificate}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" onClick={downloadCertificate}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Send certificate via email?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will send the certificate to {member?.email || "the member's email address"}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={emailCertificate}>Send</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center bg-muted rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium">Certificate Preview</h3>
              <p className="text-muted-foreground mt-2">
                Fill out the form and generate a certificate to see the preview here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockMembers } from "@/data/mockMembers";
import { mockCertificateIssuances } from "@/data/mockCertificates";
import { Member } from "@/types/member";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Tag, 
  Award, 
  MoreHorizontal, 
  Edit, 
  FileText,
  Send,
  CheckCircle2,
} from "lucide-react";

const MemberView = () => {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  
  useEffect(() => {
    const foundMember = mockMembers.find(m => m.id === id);
    if (foundMember) {
      setMember(foundMember);
    }
    
    const foundCertificates = mockCertificateIssuances.filter(c => c.memberId === id);
    setCertificates(foundCertificates);
  }, [id]);
  
  if (!member) {
    return (
      <div className="page-container">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Member not found</h2>
          <p className="text-muted-foreground mt-2">The requested member profile does not exist</p>
          <Link to="/members">
            <Button className="mt-4">Back to Members</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/members">&larr; Back</Link>
          </Button>
          <h1 className="text-2xl font-bold">Member Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to={`/members/edit/${member.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Actions <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to={`/certificates/generate/${member.id}`}>
                  <Award className="mr-2 h-4 w-4" /> Generate Certificate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/reminders/send/${member.id}`}>
                  <Send className="mr-2 h-4 w-4" /> Send Reminder
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.firstName.charAt(0)}
                    {member.lastName.charAt(0)}
                  </span>
                </div>
              </div>
              <CardTitle className="text-center mt-2">
                {member.firstName} {member.lastName}
              </CardTitle>
              <div className="flex justify-center mt-1">
                <Badge variant={member.status === "active" ? "default" : "outline"}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground break-all">{member.email}</p>
                </div>
              </div>
              
              {member.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{member.phone}</p>
                  </div>
                </div>
              )}
              
              {member.address && Object.values(member.address).some(val => val) && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <div className="text-sm text-muted-foreground">
                      {member.address.street && <p>{member.address.street}</p>}
                      {(member.address.city || member.address.state || member.address.zip) && (
                        <p>
                          {[
                            member.address.city,
                            member.address.state,
                            member.address.zip
                          ].filter(Boolean).join(", ")}
                        </p>
                      )}
                      {member.address.country && <p>{member.address.country}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Renewal Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(member.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Membership Tier</p>
                  <p className="text-sm">
                    <Badge variant={member.tier === "enterprise" ? "default" : member.tier === "premium" ? "secondary" : "outline"}>
                      {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                    </Badge>
                  </p>
                </div>
              </div>
              
              {member.tags && member.tags.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {member.bio || "No bio information provided."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Membership Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Status</span>
                    <Badge variant={member.status === "active" ? "default" : "outline"}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Join Date</span>
                    <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Member Since</span>
                    <span>
                      {(() => {
                        const joinDate = new Date(member.joinDate);
                        const now = new Date();
                        const diffYears = now.getFullYear() - joinDate.getFullYear();
                        const diffMonths = now.getMonth() - joinDate.getMonth();
                        
                        if (diffYears > 0) {
                          return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
                        } else {
                          return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
                        }
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Renewal Date</span>
                    <span>{new Date(member.renewalDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Days Until Renewal</span>
                    <span>
                      {(() => {
                        const renewalDate = new Date(member.renewalDate);
                        const now = new Date();
                        const diffTime = renewalDate.getTime() - now.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        if (diffDays < 0) {
                          return <Badge variant="destructive">Expired</Badge>;
                        } else if (diffDays === 0) {
                          return <Badge>Today</Badge>;
                        } else {
                          return <span>{diffDays} days</span>;
                        }
                      })()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Certificates</CardTitle>
                    <Button asChild>
                      <Link to={`/certificates/generate/${member.id}`}>
                        <Award className="mr-2 h-4 w-4" /> Generate New
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>
                    Certificates that have been issued to this member
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {certificates.length > 0 ? (
                    <div className="space-y-4">
                      {certificates.map((cert) => (
                        <div key={cert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">{cert.achievement}</p>
                              <p className="text-xs text-muted-foreground">Issued on {new Date(cert.issuedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm">Download</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="mx-auto h-8 w-8 opacity-50 mb-2" />
                      <p>No certificates have been issued yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Member's recent interactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {member.lastLogin && (
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Last login</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(member.lastLogin).toLocaleDateString()} at {new Date(member.lastLogin).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {certificates.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Certificate issued</p>
                          <p className="text-sm text-muted-foreground">
                            {certificates[0].achievement} on {new Date(certificates[0].issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Member created</p>
                        <p className="text-sm text-muted-foreground">
                          Joined on {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
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

export default MemberView;

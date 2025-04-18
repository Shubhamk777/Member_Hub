
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Download,
  File,
  FileArchive,
  FileInput,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderOpen,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock documents data
const initialDocuments = [
  {
    id: "doc-1",
    name: "Membership Agreement.pdf",
    type: "pdf",
    size: "245 KB",
    category: "Legal",
    uploadedAt: "2025-03-15",
    uploadedBy: "Admin User",
  },
  {
    id: "doc-2",
    name: "Member Registration Form.docx",
    type: "word",
    size: "78 KB",
    category: "Forms",
    uploadedAt: "2025-03-10",
    uploadedBy: "Admin User",
  },
  {
    id: "doc-3",
    name: "Annual Report 2024.xlsx",
    type: "excel",
    size: "1.2 MB",
    category: "Reports",
    uploadedAt: "2025-02-28",
    uploadedBy: "Admin User",
  },
  {
    id: "doc-4",
    name: "Event Waiver Form.pdf",
    type: "pdf",
    size: "156 KB",
    category: "Forms",
    uploadedAt: "2025-02-15",
    uploadedBy: "Admin User",
  },
  {
    id: "doc-5",
    name: "Certificate Template.pptx",
    type: "powerpoint",
    size: "3.4 MB",
    category: "Templates",
    uploadedAt: "2025-01-20",
    uploadedBy: "Admin User",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been successfully deleted",
    });
  };
  
  const handleUploadDocument = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: formData.get("fileName") as string,
      type: "pdf",
      size: "0.5 MB",
      category: formData.get("category") as string,
      uploadedAt: new Date().toISOString().split("T")[0],
      uploadedBy: "Admin User",
    };
    
    setDocuments([...documents, newDocument]);
    toast({
      title: "Document uploaded",
      description: "Your document has been successfully uploaded",
    });
    
    // Clear the form
    e.currentTarget.reset();
  };
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" />;
      case "word":
        return <FileText className="text-blue-500" />;
      case "excel":
        return <FileSpreadsheet className="text-green-500" />;
      case "powerpoint":
        return <File className="text-orange-500" />;
      default:
        return <File />;
    }
  };
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header mb-6">
        <h1 className="page-title">Documents</h1>
        <p className="text-muted-foreground">
          Upload and manage membership-related documents
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search documents..." 
            className="pl-8 w-[250px] md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Documents</DropdownMenuItem>
              <DropdownMenuItem>Legal</DropdownMenuItem>
              <DropdownMenuItem>Forms</DropdownMenuItem>
              <DropdownMenuItem>Templates</DropdownMenuItem>
              <DropdownMenuItem>Reports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="border rounded-md flex">
            <Button
              variant={viewType === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none border-r"
              onClick={() => setViewType("list")}
            >
              <List size={16} />
            </Button>
            <Button
              variant={viewType === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewType("grid")}
            >
              <Grid2X2 size={16} />
            </Button>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload size={16} className="mr-1" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document to the system
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Select File</Label>
                    <Input id="file" type="file" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Forms">Forms</SelectItem>
                        <SelectItem value="Templates">Templates</SelectItem>
                        <SelectItem value="Reports">Reports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Upload Document</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredDocuments.length > 0 ? (
            viewType === "list" ? (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredDocuments.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-md p-2">
                            {getFileIcon(doc.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <div className="text-sm text-muted-foreground flex gap-2 items-center">
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{doc.category}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download size={16} className="mr-2" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 size={16} className="mr-2" /> Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteDocument(doc.id)} className="text-destructive">
                                <Trash2 size={16} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map(doc => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                      <div className="bg-muted rounded-md p-3">
                        {getFileIcon(doc.type)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download size={16} className="mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 size={16} className="mr-2" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteDocument(doc.id)} className="text-destructive">
                            <Trash2 size={16} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium line-clamp-1">{doc.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div>{doc.size}</div>
                        <div className="flex justify-between mt-1">
                          <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                          <Badge variant="outline">{doc.category}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-muted rounded-full p-3">
                    <FolderOpen size={24} className="text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 
                    `No documents match your search "${searchQuery}"` :
                    "Start by uploading your first document"}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload size={16} className="mr-1" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Upload a new document to the system
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="file">Select File</Label>
                          <Input id="file" type="file" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fileName">File Name</Label>
                          <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select name="category">
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Legal">Legal</SelectItem>
                              <SelectItem value="Forms">Forms</SelectItem>
                              <SelectItem value="Templates">Templates</SelectItem>
                              <SelectItem value="Reports">Reports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Upload Document</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="legal" className="mt-6">
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-3">
                  <FileArchive size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Legal Documents</h3>
              <p className="text-muted-foreground mb-4">
                Upload and manage legal documents like membership agreements, bylaws, etc.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload size={16} className="mr-1" />
                    Upload Legal Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Legal Document</DialogTitle>
                    <DialogDescription>
                      Upload a new legal document to the system
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">Select File</Label>
                        <Input id="file" type="file" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fileName">File Name</Label>
                        <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                      </div>
                      
                      <input type="hidden" name="category" value="Legal" />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Upload Document</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="mt-6">
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-3">
                  <FileInput size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Forms</h3>
              <p className="text-muted-foreground mb-4">
                Upload and manage forms like registration, waiver, and consent forms.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload size={16} className="mr-1" />
                    Upload Form
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Form</DialogTitle>
                    <DialogDescription>
                      Upload a new form to the system
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">Select File</Label>
                        <Input id="file" type="file" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fileName">File Name</Label>
                        <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                      </div>
                      
                      <input type="hidden" name="category" value="Forms" />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Upload Document</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-3">
                  <FileText size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Templates</h3>
              <p className="text-muted-foreground mb-4">
                Upload and manage document templates like certificates, letters, and emails.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload size={16} className="mr-1" />
                    Upload Template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Template</DialogTitle>
                    <DialogDescription>
                      Upload a new template to the system
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">Select File</Label>
                        <Input id="file" type="file" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fileName">File Name</Label>
                        <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                      </div>
                      
                      <input type="hidden" name="category" value="Templates" />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Upload Document</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-3">
                  <FileSpreadsheet size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Reports</h3>
              <p className="text-muted-foreground mb-4">
                Upload and manage reports like financial statements, annual reports, etc.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload size={16} className="mr-1" />
                    Upload Report
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Report</DialogTitle>
                    <DialogDescription>
                      Upload a new report to the system
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleUploadDocument} className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">Select File</Label>
                        <Input id="file" type="file" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fileName">File Name</Label>
                        <Input id="fileName" name="fileName" placeholder="Enter file name" required />
                      </div>
                      
                      <input type="hidden" name="category" value="Reports" />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Upload Document</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;

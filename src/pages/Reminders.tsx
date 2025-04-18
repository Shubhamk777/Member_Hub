
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, CalendarDays, Mail, Plus, Trash2 } from "lucide-react";
import { mockMembers } from "@/data/mockMembers";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

// Mock reminders data
const initialReminders = [
  {
    id: "1",
    title: "Membership Renewal",
    description: "Remind members about upcoming membership renewals",
    type: "email",
    scheduledDate: "2025-05-10",
    targetGroup: "All members with expiring memberships",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Annual Meeting",
    description: "Reminder for the annual general meeting",
    type: "email",
    scheduledDate: "2025-04-25",
    targetGroup: "All active members",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Membership Fee Due",
    description: "Reminder for outstanding membership fees",
    type: "email",
    scheduledDate: "2025-05-01",
    targetGroup: "Members with unpaid fees",
    status: "sent",
  },
];

const Reminders = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast({
      title: "Reminder deleted",
      description: "The reminder has been successfully deleted",
    });
  };
  
  const handleCreateReminder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReminder = {
      id: `reminder-${Date.now()}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      scheduledDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      targetGroup: formData.get("targetGroup") as string,
      status: "scheduled",
    };
    
    setReminders([...reminders, newReminder]);
    toast({
      title: "Reminder created",
      description: "Your new reminder has been scheduled",
    });
    
    // Clear the form
    e.currentTarget.reset();
  };

  return (
    <div className="page-container">
      <div className="page-header mb-6">
        <h1 className="page-title">Reminders</h1>
        <p className="text-muted-foreground">
          Schedule and manage reminders for your members
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-1" />
                New Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create a new reminder</DialogTitle>
                <DialogDescription>
                  Set up a reminder to be sent to your members
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateReminder} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Reminder title" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Add details about this reminder" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Reminder Type</Label>
                      <Select name="type" defaultValue="email">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="notification">In-App Notification</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Scheduled Date</Label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="targetGroup">Target Group</Label>
                    <Select name="targetGroup">
                      <SelectTrigger>
                        <SelectValue placeholder="Select target members" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="active">Active Members</SelectItem>
                        <SelectItem value="expired">Expired Members</SelectItem>
                        <SelectItem value="pending">Pending Members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Schedule Reminder</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="upcoming" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Target Group</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminders
                    .filter(reminder => reminder.status === "scheduled")
                    .map(reminder => (
                    <TableRow key={reminder.id}>
                      <TableCell>
                        <div className="font-medium">{reminder.title}</div>
                        <div className="text-sm text-muted-foreground">{reminder.description}</div>
                      </TableCell>
                      <TableCell>
                        {reminder.type === "email" ? (
                          <div className="flex items-center">
                            <Mail size={16} className="mr-1 text-blue-500" />
                            Email
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Bell size={16} className="mr-1 text-amber-500" />
                            Notification
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarDays size={16} className="mr-1 text-muted-foreground" />
                          {new Date(reminder.scheduledDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{reminder.targetGroup}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sent" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Target Group</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminders
                    .filter(reminder => reminder.status === "sent")
                    .map(reminder => (
                    <TableRow key={reminder.id}>
                      <TableCell>
                        <div className="font-medium">{reminder.title}</div>
                        <div className="text-sm text-muted-foreground">{reminder.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail size={16} className="mr-1 text-blue-500" />
                          Email
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarDays size={16} className="mr-1 text-muted-foreground" />
                          {new Date(reminder.scheduledDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{reminder.targetGroup}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-0">
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-3">
                  <CalendarDays size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">No drafts</h3>
              <p className="text-muted-foreground mb-4">You don't have any draft reminders.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Draft</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create a draft reminder</DialogTitle>
                    <DialogDescription>
                      Create a draft reminder to edit later
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Draft reminder title" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Add details about this draft" />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Save Draft</Button>
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

export default Reminders;

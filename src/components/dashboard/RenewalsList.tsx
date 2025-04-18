
import { Member } from "@/types/member";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface RenewalsListProps {
  members: Member[];
}

const RenewalsList = ({ members }: RenewalsListProps) => {
  const today = new Date();
  
  // Filter members with renewals coming up in the next 30 days
  const upcomingRenewals = members
    .filter(member => {
      const renewalDate = new Date(member.renewalDate);
      const diffTime = renewalDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    })
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime());
  
  const sendReminder = (member: Member) => {
    toast({
      title: "Reminder sent",
      description: `Email reminder sent to ${member.firstName} ${member.lastName}`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell size={18} /> Upcoming Renewals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingRenewals.length > 0 ? (
          <ul className="space-y-3">
            {upcomingRenewals.map((member) => {
              const renewalDate = new Date(member.renewalDate);
              const diffTime = renewalDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <li key={member.id} className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.firstName} {member.lastName}</span>
                      <Badge variant={diffDays < 7 ? "destructive" : "outline"}>
                        {diffDays === 0 ? "Today" : `${diffDays} days`}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{renewalDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(member)}
                    >
                      <Mail className="mr-1 h-3 w-3" /> Remind
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/members/${member.id}`}>View</Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No upcoming renewals in the next 30 days
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RenewalsList;

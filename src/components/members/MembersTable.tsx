
import { useState } from "react";
import { Link } from "react-router-dom";
import { Member, MemberStatus } from "@/types/member";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MoreHorizontal, 
  ChevronDown, 
  Check, 
  Clock, 
  AlertCircle, 
  XCircle,
  Search,
  FilterX,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface MembersTableProps {
  members: Member[];
  onDelete: (id: string) => void;
}

const getStatusIcon = (status: MemberStatus) => {
  switch (status) {
    case "active":
      return <Check className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "inactive":
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
    case "expired":
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

const getStatusBadge = (status: MemberStatus) => {
  const variants: Record<MemberStatus, any> = {
    active: { class: "bg-green-100 text-green-800 hover:bg-green-200" },
    pending: { class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
    inactive: { class: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
    expired: { class: "bg-red-100 text-red-800 hover:bg-red-200" },
  };

  return (
    <div className="flex items-center gap-1.5">
      {getStatusIcon(status)}
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${variants[status].class}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

const MembersTable = ({ members, onDelete }: MembersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredMembers(members);
      return;
    }
    
    const filtered = members.filter(member => 
      member.firstName.toLowerCase().includes(term) || 
      member.lastName.toLowerCase().includes(term) || 
      member.email.toLowerCase().includes(term) ||
      (member.phone && member.phone.includes(term))
    );
    
    setFilteredMembers(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredMembers(members);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-9 w-full sm:w-[300px]"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <FilterX size={16} />
            </button>
          )}
        </div>
        
        <Link to="/members/add">
          <Button className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Renewal Date</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{member.firstName} {member.lastName}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>
                    <Badge variant={member.tier === "enterprise" ? "default" : member.tier === "premium" ? "secondary" : "outline"}>
                      {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{member.renewalDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/members/${member.id}`}>View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/members/edit/${member.id}`}>Edit member</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/certificates/generate/${member.id}`}>Generate certificate</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/reminders/send/${member.id}`}>Send reminder</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => onDelete(member.id)}
                        >
                          Delete member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No members matching your search" : "No members found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersTable;

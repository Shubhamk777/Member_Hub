
import { useState } from "react";
import { mockMembers } from "@/data/mockMembers";
import MembersTable from "@/components/members/MembersTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const Members = () => {
  const [members, setMembers] = useState(mockMembers);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleDeleteMember = (id: string) => {
    setMemberToDelete(id);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== memberToDelete));
      toast({
        title: "Member deleted",
        description: "Member has been successfully removed",
      });
      setMemberToDelete(null);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Member Management</h1>
      </div>

      <MembersTable members={members} onDelete={handleDeleteMember} />

      <AlertDialog open={!!memberToDelete} onOpenChange={() => setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              member and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Members;

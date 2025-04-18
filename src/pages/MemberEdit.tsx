
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberForm from "@/components/members/MemberForm";
import { Member, MemberFormData } from "@/types/member";
import { mockMembers } from "@/data/mockMembers";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MemberEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundMember = mockMembers.find((m) => m.id === id);
    setMember(foundMember || null);
  }, [id]);

  const handleSubmit = (data: MemberFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member updated",
        description: `${data.firstName} ${data.lastName}'s profile has been updated successfully`,
      });
      setIsSubmitting(false);
      navigate(`/members/${id}`);
    }, 1000);
  };

  if (!member) {
    return (
      <div className="page-container">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Member not found</h2>
          <p className="text-muted-foreground mt-2">The requested member does not exist</p>
          <Link to="/members">
            <Button className="mt-4">Back to Members</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/members/${id}`}>&larr; Back</Link>
          </Button>
          <h1 className="page-title">Edit Member</h1>
        </div>
      </div>

      <div className="bg-card shadow-sm rounded-lg border p-6">
        <MemberForm
          initialData={member}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default MemberEdit;

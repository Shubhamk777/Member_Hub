
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberForm from "@/components/members/MemberForm";
import { MemberFormData } from "@/types/member";
import { toast } from "@/components/ui/use-toast";

const MemberAdd = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (data: MemberFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member added",
        description: `${data.firstName} ${data.lastName} has been added successfully`,
      });
      setIsSubmitting(false);
      navigate("/members");
    }, 1000);
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add New Member</h1>
      </div>
      
      <div className="bg-card shadow-sm rounded-lg border p-6">
        <MemberForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
};

export default MemberAdd;

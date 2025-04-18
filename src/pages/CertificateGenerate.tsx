
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { mockMembers } from "@/data/mockMembers"; 
import { Button } from "@/components/ui/button";
import CertificateGenerator from "@/components/certificates/CertificateGenerator";

const CertificateGenerate = () => {
  const { memberId } = useParams();
  const location = useLocation();
  const [member, setMember] = useState(null);
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get("template");
  
  useEffect(() => {
    if (memberId) {
      const foundMember = mockMembers.find((m) => m.id === memberId);
      setMember(foundMember || null);
    }
  }, [memberId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={memberId ? `/members/${memberId}` : "/certificates"}>&larr; Back</Link>
          </Button>
          <h1 className="page-title">Generate Certificate</h1>
        </div>
      </div>

      <CertificateGenerator member={member} />
    </div>
  );
};

export default CertificateGenerate;

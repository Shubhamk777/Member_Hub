
import { useMemo } from "react";
import { mockMembers } from "@/data/mockMembers";
import { mockCertificateIssuances } from "@/data/mockCertificates";
import StatCard from "@/components/dashboard/StatCard";
import MembershipChart from "@/components/dashboard/MembershipChart";
import CertificatesBarChart from "@/components/dashboard/CertificatesBarChart";
import RenewalsList from "@/components/dashboard/RenewalsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  // Calculate member metrics
  const memberMetrics = useMemo(() => {
    const total = mockMembers.length;
    const active = mockMembers.filter(m => m.status === "active").length;
    const pending = mockMembers.filter(m => m.status === "pending").length;
    const inactive = mockMembers.filter(m => m.status === "inactive").length;
    const expired = mockMembers.filter(m => m.status === "expired").length;
    
    const statusData = [
      { name: "Active", value: active, color: "#22c55e" },
      { name: "Pending", value: pending, color: "#f59e0b" },
      { name: "Inactive", value: inactive, color: "#94a3b8" },
      { name: "Expired", value: expired, color: "#ef4444" },
    ];
    
    // Calculate tier distribution
    const basicTier = mockMembers.filter(m => m.tier === "basic").length;
    const premiumTier = mockMembers.filter(m => m.tier === "premium").length;
    const enterpriseTier = mockMembers.filter(m => m.tier === "enterprise").length;
    
    const tierData = [
      { name: "Basic", value: basicTier, color: "#94a3b8" },
      { name: "Premium", value: premiumTier, color: "#8b5cf6" },
      { name: "Enterprise", value: enterpriseTier, color: "#6d28d9" },
    ];
    
    return { total, active, pending, inactive, expired, statusData, tierData };
  }, []);
  
  // Calculate certificate metrics
  const certificateMetrics = useMemo(() => {
    const total = mockCertificateIssuances.length;
    
    // Group by month
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        timestamp: d.getTime()
      };
    }).reverse();
    
    const chartData = lastSixMonths.map(monthData => {
      const count = mockCertificateIssuances.filter(cert => {
        const certDate = new Date(cert.issuedAt);
        return certDate.getMonth() === new Date(monthData.timestamp).getMonth() && 
               certDate.getFullYear() === monthData.year;
      }).length;
      
      return {
        name: monthData.month,
        value: count
      };
    });
    
    return { total, chartData };
  }, []);
  
  // Calculate upcoming renewals
  const renewals = useMemo(() => {
    const today = new Date();
    const upcoming = mockMembers.filter(member => {
      const renewalDate = new Date(member.renewalDate);
      const diffTime = renewalDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    }).length;
    
    const expired = mockMembers.filter(member => {
      const renewalDate = new Date(member.renewalDate);
      return renewalDate < today;
    }).length;
    
    return { upcoming, expired };
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Members"
          value={memberMetrics.total}
          icon={<Users size={20} />}
          trend={{ value: 12, isPositive: true }}
          description="Total registered members"
        />
        <StatCard
          title="Active Members"
          value={memberMetrics.active}
          icon={<Users size={20} />}
          trend={{ value: 5, isPositive: true }}
          description={`${Math.round((memberMetrics.active / memberMetrics.total) * 100)}% of total`}
        />
        <StatCard
          title="Certificates Issued"
          value={certificateMetrics.total}
          icon={<Award size={20} />}
          description="Total certificates generated"
        />
        <StatCard
          title="Renewals Due"
          value={renewals.upcoming}
          icon={<Clock size={20} />}
          description="In the next 30 days"
          trend={renewals.expired > 0 ? { value: renewals.expired, isPositive: false } : undefined}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Member Status</CardTitle>
          </CardHeader>
          <CardContent>
            <MembershipChart data={memberMetrics.statusData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Membership Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <MembershipChart data={memberMetrics.tierData} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award size={18} /> Certificate Issuance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CertificatesBarChart data={certificateMetrics.chartData} />
          </CardContent>
        </Card>
        <RenewalsList members={mockMembers} />
      </div>
    </div>
  );
};

export default Dashboard;

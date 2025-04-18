
import { CertificateTemplate, CertificateIssuance } from "@/types/certificate";

export const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: "template-1",
    name: "Achievement Award",
    description: "A professional certificate for achievements and recognitions",
    backgroundColor: "#ffffff",
    borderColor: "#7c3aed",
    headerText: "Certificate of Achievement",
    bodyText: "This certifies that {{name}} has successfully completed {{achievement}} on {{date}}.",
    footerText: "Awarded by Your Organization",
    fontFamily: "serif",
    createdAt: "2023-01-15",
    updatedAt: "2023-01-15"
  },
  {
    id: "template-2",
    name: "Membership Certificate",
    description: "Official membership certificate with premium design",
    backgroundColor: "#f5f3ff",
    borderColor: "#8b5cf6",
    headerText: "Certificate of Membership",
    bodyText: "This certifies that {{name}} is an official member of Our Organization with {{tier}} status since {{joinDate}}.",
    footerText: "Valid until {{renewalDate}}",
    fontFamily: "sans-serif",
    createdAt: "2023-02-10",
    updatedAt: "2023-06-22"
  },
  {
    id: "template-3",
    name: "Event Participation",
    description: "Certificate for event participants",
    backgroundColor: "#faf5ff",
    borderColor: "#a78bfa",
    headerText: "Certificate of Participation",
    bodyText: "This is to certify that {{name}} participated in {{achievement}} held on {{date}}.",
    fontFamily: "sans-serif",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-05"
  },
];

export const mockCertificateIssuances: CertificateIssuance[] = [
  {
    id: "cert-1",
    memberId: "1",
    memberName: "John Smith",
    templateId: "template-2",
    issuedAt: "2023-08-15",
    certificateNumber: "MEM-2023-001",
    achievement: "Premium Membership",
    emailSent: true,
  },
  {
    id: "cert-2",
    memberId: "2",
    memberName: "Sarah Johnson",
    templateId: "template-1",
    issuedAt: "2023-09-10",
    certificateNumber: "ACH-2023-002",
    achievement: "Leadership Excellence",
    emailSent: true,
  },
  {
    id: "cert-3",
    memberId: "4",
    memberName: "Emily Chen",
    templateId: "template-3",
    issuedAt: "2023-10-22",
    certificateNumber: "EVT-2023-003",
    achievement: "Annual Conference 2023",
    emailSent: false,
  },
];

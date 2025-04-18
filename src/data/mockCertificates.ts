import { CertificateTemplate, CertificateIssuance } from "@/types/certificate";

export const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: "template-1",
    name: "Professional Achievement",
    description: "Elegant certificate design for professional achievements",
    backgroundColor: "#ffffff",
    borderColor: "#7c3aed",
    headerText: "Certificate of Professional Achievement",
    bodyText: "This is to certify that {{name}} has successfully demonstrated exceptional proficiency in {{achievement}} on {{date}}. Their dedication and commitment to excellence have met our highest standards of professional achievement.",
    footerText: "Awarded with distinction by Your Organization",
    fontFamily: "Playfair Display, serif",
    createdAt: "2023-01-15",
    updatedAt: "2023-01-15"
  },
  {
    id: "template-2",
    name: "Executive Membership",
    description: "Premium certificate design for executive members",
    backgroundColor: "#f8f9ff",
    borderColor: "#4f46e5",
    headerText: "Executive Membership Certificate",
    bodyText: "We hereby recognize {{name}} as an esteemed Executive Member of Our Organization, holding {{tier}} status since {{joinDate}}. This membership acknowledges their outstanding contributions and leadership in our community.",
    footerText: "Valid until {{renewalDate}} • Certificate No: EX-{{memberId}}",
    fontFamily: "Cormorant Garamond, serif",
    createdAt: "2023-02-10",
    updatedAt: "2023-06-22"
  },
  {
    id: "template-3",
    name: "Distinguished Participation",
    description: "Modern certificate design for special events",
    backgroundColor: "#fefefe",
    borderColor: "#059669",
    headerText: "Certificate of Distinguished Participation",
    bodyText: "This certificate is proudly presented to {{name}} in recognition of their valuable participation and outstanding contribution to {{achievement}} held on {{date}}. Their engagement and dedication have significantly enriched our community.",
    footerText: "Presented with appreciation • Your Organization",
    fontFamily: "Montserrat, sans-serif",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-05"
  },
  {
    id: "template-4",
    name: "Excellence Award",
    description: "Premium certificate with gold accents",
    backgroundColor: "#fffdf7",
    borderColor: "#ca8a04",
    headerText: "Certificate of Excellence",
    bodyText: "With great pleasure, we hereby certify that {{name}} has demonstrated exceptional excellence in {{achievement}} on {{date}}. This achievement represents the highest standards of performance and dedication in our organization.",
    footerText: "Awarded with Highest Honors • Your Organization",
    fontFamily: "Baskerville, serif",
    createdAt: "2023-05-20",
    updatedAt: "2023-05-20"
  }
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

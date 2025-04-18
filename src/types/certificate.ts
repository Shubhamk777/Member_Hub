
export type CertificateTemplate = {
  id: string;
  name: string;
  description?: string;
  previewImage?: string;
  backgroundColor: string;
  borderColor?: string;
  headerText: string;
  bodyText: string;
  footerText?: string;
  logoUrl?: string;
  signatureUrl?: string;
  fontFamily: string;
  createdAt: string;
  updatedAt: string;
};

export type CertificateIssuance = {
  id: string;
  memberId: string;
  memberName: string;
  templateId: string;
  issuedAt: string;
  expiresAt?: string;
  certificateNumber: string;
  achievement: string;
  downloadUrl?: string;
  emailSent: boolean;
};


export type MemberStatus = "active" | "inactive" | "pending" | "expired";

export type MemberTier = "basic" | "premium" | "enterprise";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: MemberStatus;
  tier: MemberTier;
  joinDate: string;
  renewalDate: string;
  avatar?: string;
  bio?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  tags: string[];
  lastLogin?: string;
}

export type MemberFormData = Omit<Member, "id">;

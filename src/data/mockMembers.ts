
import { Member } from "@/types/member";

const currentDate = new Date();

// Generate a date in the future
const futureDate = (months: number) => {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split('T')[0];
};

// Generate a date in the past
const pastDate = (months: number) => {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
};

export const mockMembers: Member[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    status: "active",
    tier: "premium",
    joinDate: pastDate(8),
    renewalDate: futureDate(4),
    bio: "Marketing director with 10+ years experience",
    tags: ["marketing", "event committee"],
    lastLogin: pastDate(0),
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    }
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    phone: "555-987-6543",
    status: "active",
    tier: "enterprise",
    joinDate: pastDate(15),
    renewalDate: futureDate(9),
    avatar: "https://i.pravatar.cc/150?u=2",
    tags: ["board member", "donor"],
    lastLogin: pastDate(0),
    address: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    }
  },
  {
    id: "3",
    firstName: "Miguel",
    lastName: "Rodriguez",
    email: "miguel.r@example.com",
    status: "expired",
    tier: "basic",
    joinDate: pastDate(24),
    renewalDate: pastDate(1),
    tags: ["volunteer"],
    lastLogin: pastDate(2)
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@example.com",
    phone: "555-555-1212",
    status: "active",
    tier: "basic",
    joinDate: pastDate(6),
    renewalDate: futureDate(6),
    tags: ["new member"],
    lastLogin: pastDate(1),
    address: {
      city: "Chicago",
      state: "IL",
      country: "USA"
    }
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Kumar",
    email: "david.k@example.com",
    status: "pending",
    tier: "premium",
    joinDate: pastDate(0),
    renewalDate: futureDate(12),
    tags: ["international"],
    address: {
      city: "Toronto",
      state: "ON",
      country: "Canada"
    }
  },
  {
    id: "6",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "olivia.m@example.com",
    phone: "555-789-0123",
    status: "inactive",
    tier: "enterprise",
    joinDate: pastDate(36),
    renewalDate: pastDate(3),
    avatar: "https://i.pravatar.cc/150?u=6",
    bio: "Chief Innovation Officer at TechCorp",
    tags: ["speaker", "committee lead"],
    lastLogin: pastDate(45)
  },
  {
    id: "7",
    firstName: "James",
    lastName: "Wilson",
    email: "james.w@example.com",
    phone: "555-321-7890",
    status: "active",
    tier: "basic",
    joinDate: pastDate(3),
    renewalDate: futureDate(9),
    tags: ["new member", "student"],
    lastLogin: pastDate(1)
  },
  {
    id: "8",
    firstName: "Sophia",
    lastName: "Kim",
    email: "sophia.k@example.com",
    status: "active",
    tier: "premium",
    joinDate: pastDate(18),
    renewalDate: futureDate(6),
    avatar: "https://i.pravatar.cc/150?u=8",
    tags: ["event committee", "volunteer"],
    lastLogin: pastDate(4),
    address: {
      city: "Seattle",
      state: "WA",
      country: "USA"
    }
  }
];

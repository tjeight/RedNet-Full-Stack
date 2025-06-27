// types.ts (create this file if it doesn't exist)
export interface Admin {
  id: string;
  full_name: string;
  email: string;
  blood_bank_id: string;
}

export interface BloodBank {
  id: string;
  name: string;
  address?: string;
  phone?: string;
}

export interface BloodGroup {
  type: string;
  quantity: number;
}

export interface Donor {
  id: string;
  full_name: string;
  phone?: string;
}

export interface Transaction {
  id: string;
  type: "donation" | "purchase";
  blood_type: string;
  quantity: number;
  created_at: string;
  person_name: string;
  phone?: string;
  donor_id?: string;
  donor?: Donor | null; // Changed to single Donor or null
}

export interface DashboardData {
  admin: {
    full_name: string;
  };
  bloodBank: BloodBank;
  stats: {
    totalBloodUnits: number;
    totalDonations: number;
    totalPurchases: number;
    totalDonors: number;
  };
  bloodInventory: BloodGroup[];
  recentTransactions: Transaction[];
  recentDonations: {
    name: string;
    donations: number;
  }[];
}

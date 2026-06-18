export interface DetailingPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
  features: string[];
  popular?: boolean;
}

export interface CustomAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialty: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  packageType: string;
  verified: boolean;
}

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  carModel: string;
  licensePlate: string;
  packageId: string;
  packageName: string;
  addOnIds: string[];
  totalPrice: number;
  date: string;
  timeSlot: string;
  createdAt: string;
}

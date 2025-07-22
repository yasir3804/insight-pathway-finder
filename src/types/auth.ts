export type UserRole = 'student' | 'professional' | 'counselor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  profile?: StudentProfile | ProfessionalProfile | CounselorProfile;
}

export interface StudentProfile {
  grade?: number;
  school?: string;
  dateOfBirth?: Date;
  interests?: string[];
}

export interface ProfessionalProfile {
  company?: string;
  position?: string;
  industry?: string;
  experience?: number;
}

export interface CounselorProfile {
  institution?: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
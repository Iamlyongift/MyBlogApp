// src/types/user.types.ts
export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  country?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  toggleAccountStatus: () => Promise<void>;
}

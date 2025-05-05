export interface Register {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number?: string;
  country?: string;
  role?: string;
}

export interface Login {
  email: string;
  password: string;
}

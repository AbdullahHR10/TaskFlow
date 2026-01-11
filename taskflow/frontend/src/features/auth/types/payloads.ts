export interface LoginPayLoad {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupPayLoad {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

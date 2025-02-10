export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  errors?: string[];
  token?: {
    expiresIn: number,
    accessToken: string
  },
  user?: {
    id: string,
    email: string,
    role: string
  }
}

export interface CreateUserDTO {
  email: string;
  password?: string;
  name?: string;
  profileUrl?: string;
  googleId?: string;
  roles?: string[];
}

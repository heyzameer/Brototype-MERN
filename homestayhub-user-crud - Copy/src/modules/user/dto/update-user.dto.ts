export interface UpdateUserDTO {
  name?: string;
  profileUrl?: string;
  roles?: string[];
  password?: string; // optional if updating
  passwordhash?: string; // optional if updating
}

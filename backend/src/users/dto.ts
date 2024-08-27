export type CreateUserDto = {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type LoginDto = {
  identifier: string;
  password: string;
}


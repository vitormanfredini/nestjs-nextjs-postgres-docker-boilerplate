export type SanitizedUser = {
  email: string;
  username: string;
  name: string;
}

export type JwtResponse = SanitizedUser & {
  jwt: string;
}
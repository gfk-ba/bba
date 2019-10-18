export type UserRequest = Readonly<{
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

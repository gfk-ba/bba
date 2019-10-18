/**
 * The DTO (data transfer object) is used to transport the login data from the frontend to the backend.
 */
export interface LoginDto {
  /**
   * The email address/
   */
  readonly email: string;

  /**
   * The hash code of the password.
   */
  readonly hashedPassword: string;
}

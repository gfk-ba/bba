/**
 * The DTO (data transfer object) is used to transport the user data from the frontend to the backend.
 */
interface UserDto {
  /**
   * The email address of the user
   */
  readonly email: string;

  /**
   * The password of the user
   */
  readonly password: string;
}

/**
 * The DTO (data transfer object) used to transport the JWT payload data from the frontend to the backend.
 */
export interface JwtPayload {
  /**
   * the email is the only JWT payload right now.
   */
  email: string;
}

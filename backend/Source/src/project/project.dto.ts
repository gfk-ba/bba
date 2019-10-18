/**
 * The DTO (data transfer object) used to transport the project data from the frontend to the backend.
 */
interface ProjectDto {
  /**
   * The name of the project.
   */
  readonly name: string;
  /**
   * The description of the project.
   */
  readonly description: string;
}

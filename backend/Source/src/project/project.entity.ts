/**
 * This files contains the entity class for the document
 */

/**
 * import all decorator from typeorm
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * The class Project is used with the ORM TypeORM to access data in the database table projects.
 */
@Entity('projects')
export class Project {
  /**
   * The ID (primary key) of the table (autogenerated)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the project
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /**
   * The id of the user who owns the project.
   * Because of SQL problems (userId can only be used in ""), we use user_id as database column.
   */
  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  /**
   * The description of the project.
   */
  @Column({ type: 'varchar', length: 255 })
  description: string;
}

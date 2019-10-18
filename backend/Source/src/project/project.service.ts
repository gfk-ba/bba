/**
 * Contains the [[ProjectService]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

/**
 * The ProjectService provide functions to find and create projects in the database.
 */
@Injectable()
export class ProjectService {
  /**
   * Use dependency injection to get access to the projectRepository
   * @param projectRepository This repository enables us to interact with the database table projects.
   */
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * This async function delivers the list of all projects for a given user (specified by userId).
   * @param userId The id of the user for whom we want to get the list of all projects.
   * @returns The list of all projects for the given user.
   */
  async findAll(userId: number): Promise<Project[]> {
    if (!userId) {
      throw new HttpException(
        'userId missing in ProjectService.findAll',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return await this.projectRepository.find({ userId });
  }

  /**
   * This async function creates a new project entry in the database table projects.
   * @param userId The id of the user for whom we create the new new project entry in the database table projects.
   * @param projectDto The project data (name and description) as a ProjectDto
   * @returns The new record from the database (including the id)
   */
  async create(userId: number, projectDto: ProjectDto): Promise<Project> {
    if (!userId) {
      throw new HttpException(
        'userId missing in ProjectService.create',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const newProject = { ...projectDto, userId, id: null, documents: [] };
    return this.projectRepository.save(newProject);
  }
}

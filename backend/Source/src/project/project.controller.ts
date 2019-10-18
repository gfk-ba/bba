/**
 * This files contains the ProjectController
 */

/**
 * import all the stuff we need from NestJS and our code
 */
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { UserDataService } from '../shared/auth/user-data.service';

/**
 * The ProjectController provides methods to get all projects [[findAll]] for a user and to create a new project [[create]]
 * All methods are accessible at http://SERVER:PORT/projects/...
 */
@Controller('projects')
export class ProjectController {
  /**
   * Use dependency injection to get access to the [[ProjectService]] and the [[UserDataService]].
   * @param projectService
   * @param userDataService
   */
  constructor(
    private readonly projectService: ProjectService,
    private readonly userDataService: UserDataService,
  ) {}

  /**
   * This async function delivers the list of all projects for the given user
   * This function is accessible by a HTTP GET call to http://SERVER:PORT/projects
   * This route is restricted by [[AuthGuard]]
   * @param requestData We need the request data to get the information about the user for whom we retrieve the data.
   * @returns The list of all projects for the given user.
   */
  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Req() requestData): Promise<Project[]> {
    const userId = this.userDataService.getUserData(requestData);
    if (!userId) {
      throw new HttpException(
        'userId missing in ProjectController.findAll',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return await this.projectService.findAll(userId);
  }

  /**
   * This async function stores a new project in the database
   * This function is accessible by a HTTP POST call to http://SERVER:PORT/projects
   * This route is restricted by [[AuthGuard]]
   * @param projectDto The project data (name and description) as a ProjectDto
   * @param requestData We need the request data to get the information about the user for whom we store the project.
   * @return das in der Datenbank erstellte Projekt
   */
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() projectDto: ProjectDto,
    @Req() requestData,
  ): Promise<Project> {
    const userId = this.userDataService.getUserData(requestData);
    return await this.projectService.create(userId, projectDto);
  }
}

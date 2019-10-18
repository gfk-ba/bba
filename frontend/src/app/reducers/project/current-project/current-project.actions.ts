import { ApiDeleteRequest, ApiGetRequest, ApiPostRequest, ApiPutRequest } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';
import { currentProjectManager } from './current-project.manager';
import { IProject, Project } from '../models/project.class';

export class FetchCurrentProject extends ApiGetRequest {
  constructor(id: string) {
    super(`projects/${id}`, currentProjectManager.actions.fetch.base, currentProjectManager.schema);
  }
}

export class CreateCurrentProject extends ApiPostRequest {
  constructor(project: IProject) {
    super(
      `projects`,
      currentProjectManager.actions.create.base,
      project,
      currentProjectManager.schema
    );
  }
}

export class UpdateCurrentProject extends ApiPutRequest {
  constructor(project: Project) {
    super(
      `projects/${project.id}`,
      currentProjectManager.actions.update.base,
      project.toObject(),
      currentProjectManager.schema
    );
  }
}

export class DeleteCurrentProject extends ApiDeleteRequest {
  constructor(project: Project) {
    super(`projects/${project.id}`, currentProjectManager.actions.delete.base, project.toObject());
  }
}

export class ResetCurrentProject implements Action {
  readonly type = currentProjectManager.actions.fetch.reset;
}

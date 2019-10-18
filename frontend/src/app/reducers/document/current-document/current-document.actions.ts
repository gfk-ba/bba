import { ApiDeleteRequest, ApiGetRequest, ApiPostRequest, ApiPutRequest } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';
import { currentDocumentManager } from './current-document.manager';
import { Document, IDocument } from '../models/document.class';

export class FetchCurrentDocument extends ApiGetRequest {
  constructor(id: string) {
    super(
      `documents/${id}`,
      currentDocumentManager.actions.fetch.base,
      currentDocumentManager.schema
    );
  }
}

export class CreateCurrentDocument extends ApiPostRequest {
  constructor(document: IDocument) {
    super(
      `documents`,
      currentDocumentManager.actions.create.base,
      document,
      currentDocumentManager.schema
    );
  }
}

export class UpdateCurrentDocument extends ApiPutRequest {
  constructor(document: Document) {
    super(
      `documents/${document.id}`,
      currentDocumentManager.actions.update.base,
      document.toObject(),
      currentDocumentManager.schema
    );
  }
}

export class DeleteCurrentDocument extends ApiDeleteRequest {
  constructor(document: Document) {
    super(
      `documents/${document.id}`,
      currentDocumentManager.actions.delete.base,
      document.toObject()
    );
  }
}

export class ResetCurrentDocument implements Action {
  readonly type = currentDocumentManager.actions.fetch.reset;
}

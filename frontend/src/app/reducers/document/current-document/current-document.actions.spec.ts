import { Document } from '../models/document.class';
import {
  CreateCurrentDocument,
  FetchCurrentDocument,
  UpdateCurrentDocument,
  DeleteCurrentDocument,
  ResetCurrentDocument,
} from './current-document.actions';

describe('current document actions', () => {
  describe('FetchCurrentDocument', () => {
    it('builds the correct API request action', () => {
      expect(new FetchCurrentDocument('12')).toMatchSnapshot();
    });
  });

  describe('CreateCurrentDocument', () => {
    it('builds the correct API request action', () => {
      expect(
        new CreateCurrentDocument({
          id: '',
          projectId: 0,
          description: '',
          kind: 'data',
          hash: '',
          linkIds: [],
          links: [],
          project: null,
          state: 'in_progress',
          stateDetails: '',
          address: '',
          createdAt: '',
        })
      ).toMatchSnapshot();
    });
  });

  describe('UpdateCurrentDocument', () => {
    it('builds the correct API request action', () => {
      expect(new UpdateCurrentDocument(new Document())).toMatchSnapshot();
    });
  });

  describe('DeleteCurrentDocument', () => {
    it('builds the correct API request action', () => {
      expect(new DeleteCurrentDocument(new Document({ id: '12' }))).toMatchSnapshot();
    });
  });

  describe('ResetCurrentDocument', () => {
    it('builds the correct API request action', () => {
      expect(new ResetCurrentDocument()).toMatchSnapshot();
    });
  });
});

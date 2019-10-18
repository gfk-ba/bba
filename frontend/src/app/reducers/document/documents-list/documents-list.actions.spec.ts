import { FetchDocumentsList } from './documents-list.actions';

describe('document list actions', () => {
  describe('FetchDocumentsList', () => {
    it('builds the correct API request action', () => {
      expect(new FetchDocumentsList()).toMatchSnapshot();
    });
  });
});

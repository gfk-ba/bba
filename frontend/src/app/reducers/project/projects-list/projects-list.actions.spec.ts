import { FetchProjectsList } from './projects-list.actions';

describe('project list actions', () => {
  describe('FetchProjectsList', () => {
    it('builds the correct API request action', () => {
      expect(new FetchProjectsList()).toMatchSnapshot();
    });
  });
});

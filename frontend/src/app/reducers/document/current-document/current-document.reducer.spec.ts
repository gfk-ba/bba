import { currentDocument } from './current-document.reducer';

describe('currentDocumentReducer', () => {
  it('works', () => {
    expect(currentDocument(undefined, { type: 'any' })).toMatchSnapshot();
  });
});

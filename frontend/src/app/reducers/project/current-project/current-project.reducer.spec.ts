import { currentProject } from './current-project.reducer';

describe('currentProject reducer', () => {
  it('works', () => {
    expect(currentProject(undefined, { type: 'any' })).toMatchSnapshot();
  });
});

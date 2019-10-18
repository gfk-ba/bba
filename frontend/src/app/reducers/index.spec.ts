import { metaReducers, reducers } from '.';

describe('root reducer map', () => {
  it('returns an ActionReducerMap', () => {
    expect(reducers).toBeInstanceOf(Object);

    Object.values(reducers).forEach(reducer => {
      expect(reducer).toEqual(expect.any(Function));
    });
  });
});

describe('meta reduces', () => {
  // metaReducers;
  it('contains an array of meta reducers', () => {
    expect(metaReducers).toBeInstanceOf(Array);

    Object.values(metaReducers).forEach(reducer => {
      expect(reducer).toEqual(expect.any(Function));
    });
  });
});

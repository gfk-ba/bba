import { Greet, GreetUniverse, GreetWorld } from './home.actions';
import { initialState, reducer } from './home.reducer';

describe('Home Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('Greet', () => {
    it('puts the payload into greeting', () => {
      const result = reducer(initialState, new Greet('Me'));
      expect(result).toMatchSnapshot();
    });
  });

  describe('GreetWorld', () => {
    it('puts World into greeting', () => {
      const result = reducer(initialState, new GreetWorld());
      expect(result).toMatchSnapshot();
    });
  });

  describe('GreetUniverse', () => {
    it('puts Universe into greeting', () => {
      const result = reducer(initialState, new GreetUniverse());
      expect(result).toMatchSnapshot();
    });
  });
});

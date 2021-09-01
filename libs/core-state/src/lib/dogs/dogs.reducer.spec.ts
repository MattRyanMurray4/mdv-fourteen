import { Action } from '@ngrx/store';

import * as DogsActions from './dogs.actions';
import { DogsEntity } from './dogs.models';
import { State, initialState, reducer } from './dogs.reducer';

describe('Dogs Reducer', () => {
  const createDogsEntity = (id: string, name = ''): DogsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Dogs actions', () => {
    it('loadDogsSuccess should return the list of known Dogs', () => {
      const dogs = [
        createDogsEntity('PRODUCT-AAA'),
        createDogsEntity('PRODUCT-zzz'),
      ];
      const action = DogsActions.loadDogsSuccess({ dogs });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

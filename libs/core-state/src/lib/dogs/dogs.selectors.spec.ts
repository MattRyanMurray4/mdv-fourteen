import { DogsEntity } from './dogs.models';
import { dogsAdapter, DogsPartialState, initialState } from './dogs.reducer';
import * as DogsSelectors from './dogs.selectors';

describe('Dogs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDogsId = (it: DogsEntity) => it.id;
  const createDogsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DogsEntity);

  let state: DogsPartialState;

  beforeEach(() => {
    state = {
      dogs: dogsAdapter.setAll(
        [
          createDogsEntity('PRODUCT-AAA'),
          createDogsEntity('PRODUCT-BBB'),
          createDogsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Dogs Selectors', () => {
    it('getAllDogs() should return the list of Dogs', () => {
      const results = DogsSelectors.getAllDogs(state);
      const selId = getDogsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DogsSelectors.getSelected(state) as DogsEntity;
      const selId = getDogsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDogsLoaded() should return the current "loaded" status', () => {
      const result = DogsSelectors.getDogsLoaded(state);

      expect(result).toBe(true);
    });

    it('getDogsError() should return the current "error" state', () => {
      const result = DogsSelectors.getDogsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Dog } from '@pets/api-interfaces';
import * as DogsActions from './dogs.actions';

export const DOGS_FEATURE_KEY = 'dogs';

export interface DogsState extends EntityState<Dog> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface DogsPartialState {
  readonly [DOGS_FEATURE_KEY]: DogsState;
}

export interface DogsAction extends Action {
  error: string;
}

export const dogsAdapter: EntityAdapter<Dog> = createEntityAdapter<Dog>();

export const initialState: DogsState = dogsAdapter.getInitialState({
  loaded: false,
});

const setLoading = (state: DogsState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: DogsState, { error }: DogsAction) => ({
  ...state,
  error,
});

const _dogsReducer = createReducer(
  initialState,
  on(
    DogsActions.loadDog,
    DogsActions.loadDogs,
    DogsActions.createDog,
    DogsActions.updateDog,
    DogsActions.deleteDog,
    setLoading
  ),
  on(
    DogsActions.loadDogFailure,
    DogsActions.loadDogsFailure,
    DogsActions.createDogFailure,
    DogsActions.updateDogFailure,
    DogsActions.deleteDogFailure,
    setFailure
  ),
  on(DogsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(DogsActions.loadDogsSuccess, (state, { dogs }) =>
    dogsAdapter.setAll(dogs, { ...state, loaded: true })
  ),
  on(DogsActions.loadDogsFailure, (state, { error }) => ({ ...state, error })),
  on(DogsActions.selectDog, (state, { dogId }) => ({
    ...state,
    selectedId: dogId,
  })),
  on(DogsActions.loadDogSuccess, (state, { dog }) =>
    dogsAdapter.upsertOne(dog, { ...state, loaded: true })
  ),
  on(DogsActions.updateDogSuccess, (state, { dog: { id, ...restDog } }) =>
    dogsAdapter.updateOne(
      { id, changes: { ...restDog } },
      { ...state, loaded: true }
    )
  ),
  on(DogsActions.deleteDogSuccess, (state, { id }) =>
    dogsAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function dogsReducer(state: DogsState | undefined, action: Action) {
  return _dogsReducer(state, action);
}

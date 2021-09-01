import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dog, emptyDog } from '@pets/api-interfaces';
import { DOGS_FEATURE_KEY, DogsState, dogsAdapter } from './dogs.reducer';

// Lookup the 'Dogs' feature state managed by NgRx
export const getDogsState = createFeatureSelector<DogsState>(DOGS_FEATURE_KEY);

const { selectAll, selectEntities } = dogsAdapter.getSelectors();

export const getDogsLoaded = createSelector(
  getDogsState,
  (state: DogsState) => state.loaded
);

export const getDogsError = createSelector(
  getDogsState,
  (state: DogsState) => state.error
);

export const getAllDogs = createSelector(getDogsState, (state: DogsState) =>
  selectAll(state)
);

export const getDogsEntities = createSelector(
  getDogsState,
  (state: DogsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDogsState,
  (state: DogsState) => state.selectedId
);

export const getSelected = createSelector(
  getDogsEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyDog) as Dog
);

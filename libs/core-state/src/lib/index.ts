import { ActionReducerMap } from '@ngrx/store';
import { dogsReducer, DogsState, DOGS_FEATURE_KEY } from './dogs/dogs.reducer';

export interface AppState {
  [DOGS_FEATURE_KEY]: DogsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [DOGS_FEATURE_KEY]: dogsReducer,
};

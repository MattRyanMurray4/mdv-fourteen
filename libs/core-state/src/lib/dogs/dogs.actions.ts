import { Dog } from '@pets/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Dogs Page] Init');

// all

export const loadDogs = createAction('[Dogs] Load All Dogs');

export const loadDogsSuccess = createAction(
  '[Dogs] Loaded Dogs Success',
  props<{ dogs: Dog[] }>()
);

export const loadDogsFailure = createAction(
  '[Dogs] Loaded Dogs Failure',
  props<{ error: any }>()
);

// singular

export const loadDog = createAction(
  '[Dog] Load A Dog',
  props<{ id: string }>()
);

export const loadDogSuccess = createAction(
  '[Dog] Loaded Dog Success',
  props<{ dog: Dog }>()
);

export const loadDogFailure = createAction(
  '[Dog] Loaded Dog Failure',
  props<{ error: any }>()
);

// selection

export const selectDog = createAction(
  '[Dog] Select A Dog',
  props<{ dogId: string }>()
);

// creation

export const createDog = createAction(
  '[Dog] Create A Dog',
  props<{ dog: Dog }>()
);

export const createDogSuccess = createAction(
  '[Dog] Created Dog Success',
  props<{ dog: Dog }>()
);

export const createDogFailure = createAction(
  '[Dog] Created Dog Failure',
  props<{ error: any }>()
);

// updating

export const updateDog = createAction(
  '[Dog] Update A Dog',
  props<{ dog: Dog }>()
);

export const updateDogSuccess = createAction(
  '[Dog] Updated Dog Success',
  props<{ dog: Dog }>()
);

export const updateDogFailure = createAction(
  '[Dog] Updated Dog Failure',
  props<{ error: any }>()
);

// deletion

export const deleteDog = createAction(
  '[Dog] Delete A Dog',
  props<{ dog: Dog }>()
);

export const deleteDogSuccess = createAction(
  '[Dog] Deleted Dog Success',
  props<{ id: string }>()
);

export const deleteDogFailure = createAction(
  '[Dog] Deleted Dog Failure',
  props<{ error: any }>()
);

import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  DogsService,
  getActionType,
  NotifyService,
} from '@pets/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import {
  loadDog,
  loadDogFailure,
  loadDogSuccess,
  loadDogs,
  loadDogsFailure,
  loadDogsSuccess,
  createDog,
  createDogFailure,
  createDogSuccess,
  updateDog,
  updateDogFailure,
  updateDogSuccess,
  deleteDog,
  deleteDogFailure,
  deleteDogSuccess,
} from './dogs.actions';
import * as DogsActions from './dogs.actions';
import { of } from 'rxjs';

@Injectable()
export class DogsEffects {
  loadDog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDog),
      switchMap(({ id }) =>
        this.dogsService.find(id).pipe(
          map((dog) => loadDogSuccess({ dog })),
          catchError((error) => of(loadDogFailure({ error })))
        )
      )
    )
  );

  loadDogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDogs),
      switchMap(() =>
        this.dogsService.all().pipe(
          map((dogs) => loadDogsSuccess({ dogs })),
          catchError((error) => of(loadDogsFailure({ error })))
        )
      )
    )
  );

  createDog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDog),
      switchMap(({ dog }) =>
        this.dogsService.create(dog).pipe(
          map((dog) => createDogSuccess({ dog })),
          catchError((error) => of(createDogFailure({ error })))
        )
      )
    )
  );

  updateDog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDog),
      switchMap(({ dog }) =>
        this.dogsService.update(dog).pipe(
          map((dog) => updateDogSuccess({ dog })),
          catchError((error) => of(updateDogFailure({ error })))
        )
      )
    )
  );

  deleteDog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDog),
      switchMap(({ dog }) =>
        this.dogsService.delete(dog.id).pipe(
          map((id) => deleteDogSuccess({ id })),
          catchError((error) => of(deleteDogFailure({ error })))
        )
      )
    )
  );

  dogSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDogSuccess, createDogSuccess, deleteDogSuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Dog ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  dogFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDogFailure, createDogFailure, deleteDogFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Dog. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private dogsService: DogsService,
    private notify: NotifyService
  ) {}
}

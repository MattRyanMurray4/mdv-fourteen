import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Dog } from '@pets/api-interfaces';
import * as DogsActions from './dogs.actions';
import * as DogsSelectors from './dogs.selectors';

@Injectable()
export class DogsFacade {
  loaded$ = this.store.pipe(select(DogsSelectors.getDogsLoaded));
  allDogs$ = this.store.pipe(select(DogsSelectors.getAllDogs));
  selectedDogs$ = this.store.pipe(select(DogsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(DogsActions.init());
  }

  loadDogs() {
    return this.store.dispatch(DogsActions.loadDogs());
  }

  selectDog(dogId: string) {
    return this.store.dispatch(DogsActions.selectDog({ dogId }));
  }

  loadDog(id: string) {
    return this.store.dispatch(DogsActions.loadDog({ id }));
  }

  createDog(dog: Dog) {
    return this.store.dispatch(DogsActions.createDog({ dog }));
  }

  updateDog(dog: Dog) {
    return this.store.dispatch(DogsActions.updateDog({ dog }));
  }

  deleteDog(dog: Dog) {
    return this.store.dispatch(DogsActions.deleteDog({ dog }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}

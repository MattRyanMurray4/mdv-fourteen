import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as DogsActions from './dogs.actions';
import { DogsEffects } from './dogs.effects';
import { DogsFacade } from './dogs.facade';
import { DogsEntity } from './dogs.models';
import { DOGS_FEATURE_KEY, State, initialState, reducer } from './dogs.reducer';
import * as DogsSelectors from './dogs.selectors';

interface TestSchema {
  dogs: State;
}

describe('DogsFacade', () => {
  let facade: DogsFacade;
  let store: Store<TestSchema>;
  const createDogsEntity = (id: string, name = ''): DogsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DOGS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DogsEffects]),
        ],
        providers: [DogsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DogsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDogs$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDogs$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDogsSuccess` to manually update list
     */
    it('allDogs$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDogs$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DogsActions.loadDogsSuccess({
          dogs: [createDogsEntity('AAA'), createDogsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allDogs$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

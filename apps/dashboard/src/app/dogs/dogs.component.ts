import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dog, emptyDog } from '@pets/api-interfaces';
import { DogsFacade } from '@pets/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'pets-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent implements OnInit {
  dogs$: Observable<Dog[]> = this.dogsFacade.allDogs$;
  selectedDog$: Observable<Dog> = this.dogsFacade.selectedDogs$;
  form: FormGroup;
  constructor(
    private dogsFacade: DogsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.dogsFacade.loadDogs();
    this.reset();
  }

  selectDog(dog: Dog) {
    this.dogsFacade.selectDog(dog.id);
    this.form.patchValue(dog);
  }

  reset() {
    this.selectDog(emptyDog);
    this.form.reset();
  }

  createDog(dog: Dog) {
    this.dogsFacade.createDog(dog);
    this.reset();
  }

  updateDog(dog: Dog) {
    this.dogsFacade.updateDog(dog);
    this.reset();
  }

  saveDog(dog: Dog) {
    dog.id ? this.dogsFacade.updateDog(dog) : this.dogsFacade.createDog(dog);
    this.reset();
  }

  deleteDog(dog: Dog) {
    this.dogsFacade.deleteDog(dog);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', Validators.required],
      favoriteTreats: ['', Validators.required],
      pottyTrained: [''],
    });
  }
}

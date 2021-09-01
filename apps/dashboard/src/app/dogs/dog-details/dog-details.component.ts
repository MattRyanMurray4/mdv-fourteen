import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Dog } from '@pets/api-interfaces';

@Component({
  selector: 'pets-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss'],
})
export class DogDetailsComponent {
  currentDog: Dog;
  originalName: string;

  @Input() set dog(value: Dog | null) {
    if (value) this.originalName = value.name;
    this.currentDog = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(dog: Dog) {
    this.saved.emit(dog);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}

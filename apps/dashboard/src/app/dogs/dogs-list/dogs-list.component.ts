import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dog } from '@pets/api-interfaces';

@Component({
  selector: 'pets-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss'],
})
export class DogsListComponent {
  @Input() dogs: Dog[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '@pets/api-interfaces';
import { DogsFacade } from '@pets/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'pets-dogs-item',
  templateUrl: './dogs-item.component.html',
  styleUrls: ['./dogs-item.component.scss'],
})
export class DogsItemComponent implements OnInit {
  @Input() dog: Dog | null;
  currentDog$: Observable<Dog> = this.dogsFacade.selectedDogs$;
  constructor(private route: ActivatedRoute, private dogsFacade: DogsFacade) {}

  ngOnInit() {
    this.dogsFacade.loadDog('id');
    this.route.params.subscribe((param) =>
      this.dogsFacade.selectDog(param['id'])
    );
  }
}

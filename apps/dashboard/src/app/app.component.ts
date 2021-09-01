import { Component } from '@angular/core';

@Component({
  selector: 'pets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pets-Application';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'dogs', icon: 'view_list', title: 'Dogs-List' },
  ];
}

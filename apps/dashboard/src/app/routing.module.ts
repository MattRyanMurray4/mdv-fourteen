import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent, WildComponent } from '@pets/ui-library';
import { DogsListComponent } from './dogs/dogs-list/dogs-list.component';
import { DogsComponent } from './dogs/dogs.component';

const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'wild', component: WildComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'dogs/:id', component: DogsListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'wild', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}

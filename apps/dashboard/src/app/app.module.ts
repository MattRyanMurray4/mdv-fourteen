import { CoreStateModule } from '@pets/core-state';
import { CoreDataModule } from '@pets/core-data';
import { MaterialModule } from '@pets/material';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiLibraryModule } from '@pets/ui-library';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DogsComponent } from './dogs/dogs.component';
import { DogsListComponent } from './dogs/dogs-list/dogs-list.component';
import { DogDetailsComponent } from './dogs/dog-details/dog-details.component';
import { DogsItemComponent } from './dogs/dogs-item/dogs-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DogsComponent,
    DogsListComponent,
    DogDetailsComponent,
    DogsItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    UiLibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from '@pets/api-interfaces';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  private model = 'dogs';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Dog[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Dog>(this.getUrlById(id));
  }

  create(dog: Dog) {
    return this.httpClient.post<Dog>(this.getUrl(), dog);
  }

  update(dog: Dog) {
    return this.httpClient.patch<Dog>(this.getUrlById(dog.id), dog);
  }

  delete(dogId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(dogId))
      .pipe(mapTo(dogId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}

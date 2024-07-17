import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { Continent } from '../models/continent.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://thronesapi.com/api/v2';
  readonly http = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/Characters`);
  }

  getContinents(): Observable<Continent[]> {
    return this.http.get<Continent[]>(`${this.baseUrl}/Continents`);
  }
}

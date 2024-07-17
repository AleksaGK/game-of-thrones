import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  readonly http = inject(HttpClient);
  readonly charactersUrl = 'assets/characters.json';
  readonly key = 'characters';

  getCharacters(): Character[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  addCharacter(character: Character) {
    const characters: any = this.getCharacters();
    characters.push(character);
    const data = JSON.stringify(characters);
    localStorage.setItem(this.key, data);
    return characters;
  }

  saveCharacters(characters: Character[]) {
    if (!localStorage.getItem(this.key))
      localStorage.setItem(this.key, JSON.stringify(characters));
  }

  getLastId(){
    return this.getCharacters().length
  }

  idExists(id: number){
    return this.getCharacters().some(c => c.id === id);
  }

  updateCharacter(result: Character): Character[] {
    const characters: Character[] = this.getCharacters();
    const index = characters.findIndex(c => c.id === result.id);
    if (index !== -1) {
      characters[index] = result;
      localStorage.setItem(this.key, JSON.stringify(characters));
    }
    return characters;
  }

  deleteCharacter(id: number){
    let characters: Character[] = this.getCharacters();
    characters = characters.filter(item => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(characters));
    return characters;
  }
}

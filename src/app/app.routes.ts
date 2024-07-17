import { Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { ContinentListComponent } from './continent-list/continent-list.component';

export const routes: Routes = [
    { path: 'characters', component: CharacterListComponent },
    { path: 'continents', component: ContinentListComponent },
    { path: '',   redirectTo: '/characters', pathMatch: 'full' }
  ];
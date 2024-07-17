import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character } from '../models/character.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AddCharacterDialogComponent } from './add-character-dialog/add-character-dialog.component';
import { DbService } from '../services/db.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    MatButtonModule
  ],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  houses: string[] = [];
  selectedHouse: string | null = null;
  filteredCharacters: Character[] = [];
  private apiService = inject(ApiService);
  private dbService = inject(DbService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.characters = this.filteredCharacters = this.dbService.getCharacters();
    if (!this.characters || this.characters.length === 0) {
      this.apiService.getCharacters().subscribe((data: Character[]) => {
        this.houses = [
          ...new Set(data.map((character) => character.family)),
        ].sort();
        this.characters = this.filteredCharacters = data;
        this.dbService.saveCharacters(this.characters);
      });
    } else {
      this.houses = [
        ...new Set(this.characters.map((character) => character.family)),
      ].sort();
    }
  }

  filterCharactersByHouse(house: string | null) {
    this.selectedHouse = house;
    if (!house) {
      this.filteredCharacters = this.characters;
      return;
    }
    this.filteredCharacters = this.characters.filter(
      (character) => character.family === this.selectedHouse
    );
  }

  createNewCharacter(): void {
    const dialogRef = this.dialog.open(AddCharacterDialogComponent, {
      width: '400px',
      data: { houses: this.houses },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.characters = this.filteredCharacters =
          this.dbService.addCharacter(result);
      }
    });
  }

  showDetails(character: Character): void {
    const dialogRef = this.dialog.open(AddCharacterDialogComponent, {
      width: '400px',
      data: { houses: this.houses, character: character },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.dbService.idExists(result.id))
          this.characters = this.filteredCharacters =
            this.dbService.updateCharacter(result);
        else
          this.characters = this.filteredCharacters =
            this.dbService.addCharacter(result);
      }
      this.selectedHouse = '';
    });
  }

  delete(id:number){
    this.characters = this.filteredCharacters = this.dbService.deleteCharacter(id);
    alert('Karakter uspesno obrisan!')
  }
}

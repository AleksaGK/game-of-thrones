import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Continent } from '../models/continent.model';
import { Character } from '../models/character.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-continent-list',
  standalone: true,
  imports: [],
  templateUrl: './continent-list.component.html',
  styleUrl: './continent-list.component.scss'
})
export class ContinentListComponent implements OnInit{
  continents: Continent[] = [];
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getContinents().subscribe(continents => {
      this.continents = continents;
    });
  }
}

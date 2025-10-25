import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCard } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemonCards = signal<PokemonCard[]>([]);

  // Pagination properties
  totalCount = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = 10;
  pageSizeOptions = [10, 10, 20, 50, 100];

  constructor(
    private pokemonService: PokemonService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    const offset = this.currentPage() * this.pageSize;

    this.pokemonService
      .getPokemonList(this.pageSize, offset)
      .pipe(
        map((response) => ({
          cards: response.results.map((pokemon) => this.transformToPokemonCard(pokemon)),
          total: response.count,
        })),
      )
      .subscribe({
        next: (data) => {
          this.pokemonCards.set(data.cards);
          this.totalCount.set(data.total);
        },
        error: (err) => {
          this.snackBar
            .open('Failed to load Pokemon. Please try again.', 'Retry', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
            .onAction()
            .subscribe(() => {
              this.loadPokemon();
            });
          console.error('Error loading Pokemon:', err);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize = event.pageSize;
    this.loadPokemon();
  }

  capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }


  private transformToPokemonCard(pokemon: any): PokemonCard {
    const id = this.extractIdFromUrl(pokemon.url);
    return {
      id: id,
      name: pokemon.name,
      image: this.pokemonService.getOfficialImage(id),
    };
  }
}

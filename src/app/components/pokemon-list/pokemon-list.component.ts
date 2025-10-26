import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCard } from '../../models/pokemon.interface';
import { capitalizeFirstLetter } from '../../utils/capitalize.utils';
import { showErrorSnackBar } from '../../utils/snackbar.utils';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatIconModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemonCards = signal<PokemonCard[]>([]);

  showImage = signal<{ [id: number]: boolean }>({});
  // Pagination properties
  totalCount = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  pageSizeOptions = [10, 20, 50, 100];

  // Utility functions
  readonly capitalize = capitalizeFirstLetter;

  constructor(
    private pokemonService: PokemonService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.setPageFromQueryParams(params);
      this.loadPokemon();
    });
  }

  loadPokemon(): void {
    const offset = this.currentPage() * this.pageSize();

    this.pokemonService
      .getPokemonList(this.pageSize(), offset)
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
          showErrorSnackBar(this.snackBar, 'Failed to load Pokemon. Please try again.');
          console.error('Error loading Pokemon:', err);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.updatePageQueryParam(event.pageIndex);
    this.loadPokemon();
  }

  private updatePageQueryParam(pageIndex: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: pageIndex },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private setPageFromQueryParams(params: any): void {
    const page = params.get('page');
    if (page && !isNaN(+page)) {
      this.currentPage.set(+page);
    }
  }

  onImageError(id: number): void {
    this.showImage.update((state) => ({ ...state, [id]: false }));
  }
  onPokemonClick(pokemon: PokemonCard): void {
    this.router.navigate(['/pokemon', pokemon.id], { queryParams: { page: this.currentPage() } });
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

  onRandomPokemonClick(): void {
    // Generate random Pokemon ID between 1 and 1010 (covers all main Pokemon)
    const randomId = Math.floor(Math.random() * 1010) + 1;
    this.router.navigate(['/pokemon', randomId]);
  }
}

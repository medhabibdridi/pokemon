import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../models/pokemon.interface';
import { capitalizeFirstLetter } from '../../utils/capitalize.utils';
import { showErrorSnackBar } from '../../utils/snackbar.utils';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css',
})
export class PokemonDetailsComponent implements OnInit {
  showImage = signal(true);
  pokemonDetails = signal<PokemonDetails | null>(null);
  pokemonId: string | number = '';

  // Utility functions
  readonly capitalize = capitalizeFirstLetter;

  pokemonImageUrl = computed(() => {
    const pokemon = this.pokemonDetails();
    return pokemon ? this.pokemonService.getOfficialImage(pokemon.id) : '';
  });

  constructor(
    public pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonId = params['id'];
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails(): void {
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe({
      next: (details) => {
        this.pokemonDetails.set(details);
      },
      error: (err) => {
        showErrorSnackBar(this.snackBar, 'Failed to load Pokemon details. Please try again.');
        console.error('Error loading Pokemon details:', err);
      },
    });
  }

  goBack(): void {
    const page = this.route.snapshot.queryParamMap.get('page');
    this.router.navigate(['/pokemon'], { queryParams: page ? { page } : undefined });
  }
}

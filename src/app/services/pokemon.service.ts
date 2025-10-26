import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { PokemonListResponse, PokemonDetails } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private cache = new Map<string, Observable<PokemonListResponse>>();

  constructor(private http: HttpClient) {}

  /**
   * Get a list of Pokemon with pagination
   */
  getPokemonList(limit: number, offset: number): Observable<PokemonListResponse> {
    const cacheKey = `${limit}-${offset}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const request$ = this.http
      .get<PokemonListResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`)
      .pipe(shareReplay(1));

    this.cache.set(cacheKey, request$);
    return request$;
  }

  /**
   * Get detailed information about a specific Pokemon
   */
  getPokemonDetails(idOrName: string | number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${idOrName}`);
  }

  /**
   * Get official artwork image URL for a Pokemon
   */
  getOfficialImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}

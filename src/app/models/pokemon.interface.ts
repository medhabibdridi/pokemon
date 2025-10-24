// Interface for the Pokemon list response
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Interface for individual Pokemon in the list
export interface PokemonListItem {
  name: string;
  url: string;
}

// Interface for Pokemon card display
export interface PokemonCard {
  id: number;
  name: string;
  image: string;
}
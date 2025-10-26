import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemon list', () => {
    service.getPokemonList(4, 0).subscribe((res) => {
      expect(res.count).toBe(4);
      expect(res.results.length).toBe(4);
      expect(res.results[0].name).toBe('bulbasaur');
      expect(res.results[3].name).toBe('charmander');
    });
    const req = httpMock.expectOne((r) => r.url.includes('pokemon'));
    req.flush({
      count: 4,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    });
  });

  it('should fetch pokemon details', () => {
    service.getPokemonDetails(1).subscribe((res) => {
      expect(res.id).toBe(1);
    });
    const req = httpMock.expectOne((r) => r.url.includes('pokemon/1'));
    req.flush({ id: 1 });
  });

  it('should return official image url', () => {
    const url = service.getOfficialImage(1);
    expect(url).toContain('official-artwork/1.png');
  });
});

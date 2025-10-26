import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const mockPokemonService = {
  getPokemonDetails: () => of({ id: 1, name: 'bulbasaur', height: 7, weight: 69, types: [] }),
  getOfficialImage: () => 'test-url',
};

const mockActivatedRoute = {
  params: of({ id: 1 }),
  snapshot: { queryParamMap: { get: () => null } },
};

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon details', () => {
    component.loadPokemonDetails();
    expect(component.pokemonDetails()?.name).toBe('bulbasaur');
  });
});

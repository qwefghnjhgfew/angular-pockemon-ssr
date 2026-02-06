import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePockemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pockemond-card',
  imports: [RouterLink],
  templateUrl: './pockemond-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PockemondCard {
  public pokemon = input.required<SimplePockemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`,
  );

  /* 
logEffect = effect(() => {
  console.log('PokemonCard: ', this.pokemon());
}) */
}

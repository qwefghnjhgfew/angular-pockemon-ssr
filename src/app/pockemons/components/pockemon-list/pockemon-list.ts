import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PockemondCard } from "../pockemond-card/pockemond-card";
import { SimplePockemon } from '../../interfaces';

@Component({
  selector: 'pockemon-list',
  imports: [PockemondCard],
  templateUrl: './pockemon-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PockemonList {

public pokemons = input.required<SimplePockemon[]>();

 }

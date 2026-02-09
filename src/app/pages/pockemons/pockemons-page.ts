import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PockemonList } from '../../pockemons/components/pockemon-list/pockemon-list';
import { PokemoListSkeleton } from './ui/pokemo-list-skeleton/pokemo-list-skeleton';
import { map, tap, timeout } from 'rxjs';
import { PokemonsService } from '../../pockemons/services/pokemons.Service';
import { SimplePockemon } from '../../pockemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pockemons-page',
  imports: [PockemonList /* PokemoListSkeleton */, PokemoListSkeleton, RouterLink],
  templateUrl: './pockemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PockemonsPage {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePockemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  });

  /*  public isLoading = signal(true);

  private appRef = inject(ApplicationRef);

  private $appsatate = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  }) */ /* ngOnInit(): void {
    console.log(this.currentPage());

    this.loadPokemons();

    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  } */

  public loadPokemons(page = 0) {

    this.pokemonsService
      .loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], { queryParams: { page: page } })),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`)),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  /* ngOnDestroy(): void {
    this.$appsatate.unsubscribe();
  } */
}

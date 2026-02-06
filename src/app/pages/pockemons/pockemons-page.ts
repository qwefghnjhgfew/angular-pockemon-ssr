import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
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
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pockemons-page',
  imports: [PockemonList /* PokemoListSkeleton */, PokemoListSkeleton],
  templateUrl: './pockemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PockemonsPage implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePockemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  /*  public isLoading = signal(true);

  private appRef = inject(ApplicationRef);

  private $appsatate = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  }) */ ngOnInit(): void {
    console.log(this.currentPage());

    this.loadPokemons();

    /* setTimeout(() => {
      this.isLoading.set(false);
    }, 5000); */
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`)),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  /* ngOnDestroy(): void {
    this.$appsatate.unsubscribe();
  } */
}

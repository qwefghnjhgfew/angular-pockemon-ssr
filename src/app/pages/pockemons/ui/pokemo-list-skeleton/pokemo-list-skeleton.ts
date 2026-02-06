import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemo-list-skeleton',
  imports: [],
  templateUrl: './pokemo-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemoListSkeleton { }

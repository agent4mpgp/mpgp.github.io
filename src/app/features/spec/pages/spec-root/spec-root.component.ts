import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Message } from '../../models/message';
import { SpecService } from '../../services/spec.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'spec-root',
  styleUrls: ['./spec-root.component.scss'],
  templateUrl: './spec-root.component.html',
})
export class SpecRootComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(public readonly route: ActivatedRoute, public readonly router: Router, private readonly specService: SpecService) {}

  ngOnInit(): void {
    this.messages$ = this.route.params.pipe(
      map(({ schema }) => schema),
      distinctUntilChanged(),
      switchMap(schema => this.specService.getMessages(schema)),
    );
  }

  onNavigate(schema: string, _module: number, action: number, tab: number): void {
    this.router.navigate(['/spec', schema, _module, action, tab]).catch(reason => console.error(reason));
  }
}

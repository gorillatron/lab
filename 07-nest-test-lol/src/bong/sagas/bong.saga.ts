import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ConsumeBongTokenCommand } from '../commands/impl/consume-bong-token.command';
import { BongTokenConsumed } from '../events/impl/bongtoken-consumed.event';

@Injectable()
export class BongSaga {
  // @Saga()
  // bongTokenConsumed = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$
  //     .pipe(
  //       ofType(BongTokenConsumed),
  //       delay(1000),
  //       map(event => {
  //         console.log('saga', event);
  //         return new ConsumeBongTokenCommand('1337', '2');
  //       }),
  //     );
  // }
}
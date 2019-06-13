import { AggregateRoot } from '@nestjs/cqrs';
import { BongTokenConsumed } from './events/impl/bongtoken-consumed.event' 

export type Token = {
  id: string;
};

export class Bong extends AggregateRoot {
  constructor(
    public id: string,
    public tokens: Token[],
  ) {
    super();
  }

  consumeToken(tokenId: string) {
    this.apply(new BongTokenConsumed(this.id, tokenId))
  }
}

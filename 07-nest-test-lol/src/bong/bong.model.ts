import { AggregateRoot } from '@nestjs/cqrs';
import { BongCreated } from './events/impl/bong-created-event'
import { BongTokenConsumed } from './events/impl/bongtoken-consumed.event' 

export type Token = {
  id: string;
};

export type CreateBongDto = {
  id: string;
  tokens: Token[]
}

export class Bong extends AggregateRoot {
  constructor(
    public id: string,
    public tokens: Token[],
  ) {
    super();
  }

  static create(dto: CreateBongDto) {
    const bong = new Bong(dto.id, dto.tokens);
    bong.apply(new BongCreated(bong))
    return bong
  }

  consumeToken(tokenId: string) {
    this.apply(new BongTokenConsumed(this.id, tokenId))
  }
}

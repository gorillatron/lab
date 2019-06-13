
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { BongRepository } from '../../bong.repository';
import { BongTokenConsumed } from '../impl/bongtoken-consumed.event';

@EventsHandler(BongTokenConsumed)
export class BongTokenConsumedHandler implements IEventHandler<BongTokenConsumed> {

  constructor(
    private readonly repository: BongRepository
  ) {}

  async handle(event: BongTokenConsumed) {
    const bong = await this.repository.findOneById(event.bongId);
    await this.repository.update(event.bongId, {
      tokens: bong.tokens.filter(token => token.id !== event.tokenId)
    })
    console.log('bongtoken consumed event handler', event);
  }
}
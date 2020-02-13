
import { IEventHandler } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { BongRepository } from '../../bong.repository';
import { BongTokenConsumed } from '../impl/bongtoken-consumed.event';

@EventsHandler(BongTokenConsumed)
export class BongTokenConsumedHandler implements IEventHandler<BongTokenConsumed> {

  constructor(
    private readonly repository: BongRepository
  ) {}
  
  @EventPattern('BongTokenConsumed')
  async handle(event: BongTokenConsumed) {
    console.log('bongtoken consumed event handler', event);
  }
}
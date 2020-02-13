
import { IEventHandler } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { BongRepository } from '../../bong.repository';
import { BongCreated } from '../impl/bong-created-event';

@EventsHandler(BongCreated)
export class BongCreatedHandler implements IEventHandler<BongCreated> {

  constructor(
    private readonly repository: BongRepository
  ) {}
  
  @EventPattern('BongCreated')
  async handle(event: BongCreated) {
    console.log('bong created event handler', event);
  }
}
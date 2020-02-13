import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventStoreModule } from '../core/event-store/event-store.module'
import commandHandlers from './commands/handlers';
import eventHandlers from './events/handlers';
import { BongTokenConsumed } from "./events/impl/bongtoken-consumed.event"
import { BongCreated } from "./events/impl/bong-created-event"
import queryHandlers from './queries/handlers';
import { BongSaga } from './sagas/bong.saga';
import { BongController } from './bong.controller';
import { BongRepository } from './bong.repository';
import { EventStore } from '../core/event-store/event-store';
import { Bong } from './bong.model';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature()
  ],
  controllers: [
    BongController
  ],
  providers: [
    BongRepository,
    ...commandHandlers,
    ...eventHandlers,
    ...queryHandlers,
    BongSaga
  ],
}) 
export class BongModule implements OnModuleInit {

  constructor(
    private readonly event$: EventBus,
    private readonly eventStore: EventStore,
  ) {}

  async onModuleInit() {
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
  }

  eventHandlers = {
    BongTokenConsumed: (bongId: string, tokenId: string) => new BongTokenConsumed(bongId, tokenId),
    BongCreated: (bong: Bong) => new BongCreated(bong)
  }
}
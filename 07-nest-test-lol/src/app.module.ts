import { Module } from '@nestjs/common';
import { BongModule } from './bong/bong.module'
import { EventStoreModule } from './core/event-store/event-store.module'

@Module({
  imports: [
    EventStoreModule.forRoot(),
    BongModule
  ],
})
export class AppModule {}

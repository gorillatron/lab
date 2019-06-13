import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import commandHandlers from './commands/handlers';
import eventHandlers from './events/handlers';
import queryHandlers from './queries/handlers';
import { BongSaga } from './sagas/bong.saga';
import { BongController } from './bong.controller';
import { BongRepository } from './bong.repository';

@Module({
  imports: [CqrsModule],
  controllers: [BongController],
  providers: [
    BongRepository,
    ...commandHandlers,
    ...eventHandlers,
    ...queryHandlers,
    BongSaga
  ],
}) 
export class BongModule {}
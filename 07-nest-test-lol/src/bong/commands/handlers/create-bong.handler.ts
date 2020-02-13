import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { BongRepository } from '../../bong.repository';
import { CreateBongTokenCommand } from '../impl/create-bong.command';
import { Bong } from '../../bong.model';

@CommandHandler(CreateBongTokenCommand)
export class CreateBongTokenHandler implements ICommandHandler<CreateBongTokenCommand> {
  constructor(
    private readonly repository: BongRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateBongTokenCommand) {
    const id = uuid.v4()
    const { tokens } = command;
    const bong = this.publisher.mergeObjectContext(
      await this.repository.create({id, tokens})
    );
    bong.commit();
  }
}
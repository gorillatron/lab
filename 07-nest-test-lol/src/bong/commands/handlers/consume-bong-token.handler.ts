import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BongRepository } from '../../bong.repository';
import { ConsumeBongTokenCommand } from '../impl/consume-bong-token.command';

@CommandHandler(ConsumeBongTokenCommand)
export class ConsumeBongTokenHandler implements ICommandHandler<ConsumeBongTokenCommand> {
  constructor(
    private readonly repository: BongRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ConsumeBongTokenCommand) {
    const { bongId, tokenId } = command;
    const bong = this.publisher.mergeObjectContext(
      await this.repository.findOneById(bongId),
    );
    
    bong.consumeToken(tokenId);
    bong.commit();
  }
}
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConsumeBongTokenCommand } from './commands/impl/consume-bong-token.command';
import { ConsumeBongTokenDto } from './interfaces/consume-bong-token-dto.interface';
import { Bong } from './bong.model';
import { GetBongsQuery } from './queries/impl/get-bongs.query';

@Controller('bong')
export class BongController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/consumetoken')
  async killDragon(@Param('id') id: string, @Body() dto: ConsumeBongTokenDto) {
    return this.commandBus.execute(new ConsumeBongTokenCommand(id, dto.tokenId));
  }

  @Get()
  async findAll(): Promise<Bong[]> {
    return this.queryBus.execute(new GetBongsQuery());
  }
}
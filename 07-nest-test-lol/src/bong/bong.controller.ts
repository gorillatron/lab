import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBongTokenCommand } from './commands/impl/create-bong.command';
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
  
  @Post()
  async createBong(@Body() dto: CreateBongTokenCommand) {
    return this.commandBus.execute(new CreateBongTokenCommand(dto.tokens));
  }

  @Post(':id/consumetoken')
  async consumeToken(@Param('id') id: string, @Body() dto: ConsumeBongTokenDto) {
    return this.commandBus.execute(new ConsumeBongTokenCommand(id, dto.tokenId));
  }

  @Get()
  async findAll(): Promise<Bong[]> {
    return this.queryBus.execute(new GetBongsQuery());
  }
}
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { BongRepository } from '../../bong.repository';
import { GetBongsQuery } from '../impl/get-bongs.query';

@QueryHandler(GetBongsQuery)
export class GetBongsHandler implements IQueryHandler<GetBongsQuery> {
  constructor(private readonly repository: BongRepository) {}

  async execute(query: BongRepository) {
    return this.repository.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { EventStore } from '../core/event-store/event-store';
import { Bong, Token, CreateBongDto } from './bong.model';

let bongs = [];

@Injectable()
export class BongRepository {

  constructor(
    private readonly eventStore: EventStore
  ) {}

  async create(bongDto: CreateBongDto) {
    const bong = Bong.create(bongDto);
    return bong
  }

  async findOneById(id: string) {
    return bongs.find(bong => bong.id === id)
  }

  async findAll(): Promise<Bong[]> {
    return bongs;
  }

  async update(id:string, update: {tokens: Token[]}): Promise<Bong> {
    const bong = await this.findOneById(id);
    bong.tokens = update.tokens;
    return bong
  }
}


import { Injectable } from '@nestjs/common';
import { Bong } from './bong.model';
import { Token } from 'dist/bong/bong.model';

let bongs = [new Bong('1337', [{ id: '1' }, { id: '2' }])];

@Injectable()
export class BongRepository {
  async findOneById(id: string): Promise<Bong> {
    return bongs[0];
  }

  async findAll(): Promise<Bong[]> {
    return bongs;
  }

  async update(id:string, update: {tokens: Token[]}): Promise<Bong> {
    const bong = bongs.find(bong => bong.id)
    bong.tokens = update.tokens;
    return bong
  }
}

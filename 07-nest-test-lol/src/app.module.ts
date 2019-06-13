import { Module } from '@nestjs/common';
import { BongModule } from './bong/bong.module'

@Module({
  imports: [BongModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { QuizeController } from './quize.controller';
import { QuizeService } from './quize.service';

@Module({
  controllers: [QuizeController],
  providers: [QuizeService]
})
export class QuizeModule {}

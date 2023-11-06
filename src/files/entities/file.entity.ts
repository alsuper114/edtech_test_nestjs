import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import appConfig from 'src/config/app.config';
import { AppConfig } from 'src/config/config.type';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfab98b-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = (appConfig() as AppConfig).backendDomain + this.path;
    }
  }
}

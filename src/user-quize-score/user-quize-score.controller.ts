import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserQuizeScoreService } from './user-quize-score.service';
import { SetScoreDto } from './dto/set-score.dto';
import { UserQuizeScore } from './entity/user-quize-score.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Score for Quiz')
@Controller({ path: 'userscore', version: '1' })
export class UserQuizeScoreController {
  constructor(private readonly userQuizeScoreService: UserQuizeScoreService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async setScore(@Body() payload: SetScoreDto): Promise<UserQuizeScore> {
    return await this.userQuizeScoreService.setScore(payload);
  }

  @Get('/:userId/:lessonId')
  @HttpCode(HttpStatus.OK)
  async getScores(
    @Param('userId') userId: number,
    @Param('lessonId') lessonId: number,
  ): Promise<any> {
    return await this.userQuizeScoreService.getScores(userId, lessonId);
  }
}

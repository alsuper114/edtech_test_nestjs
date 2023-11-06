import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { Quize } from './entities/quize.entity';
import { QuizesService } from './quizes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Quizes')
@Controller({path: 'quizes', version: '1'})
export class QuizesController {

    constructor(
        private readonly quizeService: QuizesService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createQuize(@Body() payload: CreateQuizeDto): Promise<Quize> {
        return await this.quizeService.createQuize(payload);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getQuizeById(@Param('id') id: number): Promise<Quize> {
        return await this.quizeService.getQuizeById(id); 
    }
}

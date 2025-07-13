import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('creatures')
@Controller('creatures')
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @ApiOperation({ summary: 'Create a new creature' })
  @Post()
  create(@Body() createCreatureDto: CreateCreatureDto) {
    return this.creatureService.create(createCreatureDto);
  }

  @ApiOperation({ summary: 'Get all creatures' })
  @Get()
  findAll() {
    return this.creatureService.findAll();
  }

  @ApiOperation({ summary: 'Get a creature by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatureService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a creature by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    return this.creatureService.update(+id, updateCreatureDto);
  }

  @ApiOperation({ summary: 'Delete a creature by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatureService.remove(+id);
  }
}

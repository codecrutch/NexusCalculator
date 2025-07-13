import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaveService } from './cave.service';
import { CreateCaveDto } from './dto/create-cave.dto';
import { UpdateCaveDto } from './dto/update-cave.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('caves')
@Controller('caves')
export class CaveController {
  constructor(private readonly caveService: CaveService) {}

  @ApiOperation({ summary: 'Create a new cave' })
  @Post()
  create(@Body() createCaveDto: CreateCaveDto) {
    return this.caveService.create(createCaveDto);
  }

  @ApiOperation({ summary: 'Get all caves' })
  @Get()
  findAll() {
    return this.caveService.findAll();
  }

  @ApiOperation({ summary: 'Get a cave by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caveService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a cave by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaveDto: UpdateCaveDto) {
    return this.caveService.update(+id, updateCaveDto);
  }

  @ApiOperation({ summary: 'Delete a cave by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caveService.remove(+id);
  }
}

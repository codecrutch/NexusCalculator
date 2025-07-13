import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaveService } from './cave.service';
import { CreateCaveDto } from './dto/create-cave.dto';
import { UpdateCaveDto } from './dto/update-cave.dto';

@Controller('cave')
export class CaveController {
  constructor(private readonly caveService: CaveService) {}

  @Post()
  create(@Body() createCaveDto: CreateCaveDto) {
    return this.caveService.create(createCaveDto);
  }

  @Get()
  findAll() {
    return this.caveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaveDto: UpdateCaveDto) {
    return this.caveService.update(+id, updateCaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caveService.remove(+id);
  }
}

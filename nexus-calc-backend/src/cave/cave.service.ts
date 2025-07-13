import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cave } from '../entities/cave.entity';
import { CreateCaveDto } from './dto/create-cave.dto';
import { UpdateCaveDto } from './dto/update-cave.dto';

@Injectable()
export class CaveService {
  constructor(
    @InjectRepository(Cave)
    private readonly caveRepository: Repository<Cave>,
  ) {}

  async create(createCaveDto: CreateCaveDto): Promise<Cave> {
    const cave = this.caveRepository.create(createCaveDto);
    return this.caveRepository.save(cave);
  }

  async findAll(): Promise<Cave[]> {
    return this.caveRepository.find({ relations: ['creatures'] });
  }

  async findOne(id: number): Promise<Cave | null> {
    return this.caveRepository.findOne({
      where: { id },
      relations: ['creatures'],
    });
  }

  async update(id: number, updateCaveDto: UpdateCaveDto): Promise<Cave | null> {
    await this.caveRepository.update(id, updateCaveDto);
    return this.caveRepository.findOne({
      where: { id },
      relations: ['creatures'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.caveRepository.delete(id);
  }
}

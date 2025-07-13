import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creature } from '../entities/creature.entity';
import { Cave } from '../entities/cave.entity';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';

@Injectable()
export class CreatureService {
  constructor(
    @InjectRepository(Creature)
    private readonly creatureRepository: Repository<Creature>,
    @InjectRepository(Cave)
    private readonly caveRepository: Repository<Cave>,
  ) {}

  async create(createCreatureDto: CreateCreatureDto): Promise<Creature> {
    const cave = await this.caveRepository.findOneBy({
      id: createCreatureDto.caveId,
    });
    if (!cave) throw new Error('Cave not found');
    const creature = this.creatureRepository.create({
      ...createCreatureDto,
      cave,
    });
    return this.creatureRepository.save(creature);
  }

  async findAll(): Promise<Creature[]> {
    return this.creatureRepository.find({ relations: ['cave'] });
  }

  async findOne(id: number): Promise<Creature | null> {
    return this.creatureRepository.findOne({
      where: { id },
      relations: ['cave'],
    });
  }

  async update(
    id: number,
    updateCreatureDto: UpdateCreatureDto,
  ): Promise<Creature | null> {
    const updateData: any = { ...updateCreatureDto };
    if (updateCreatureDto.caveId) {
      const cave = await this.caveRepository.findOneBy({
        id: updateCreatureDto.caveId,
      });
      if (!cave) throw new Error('Cave not found');
      updateData.cave = cave;
    }
    await this.creatureRepository.update(id, updateData);
    return this.creatureRepository.findOne({
      where: { id },
      relations: ['cave'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.creatureRepository.delete(id);
  }
}

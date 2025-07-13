import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { User } from '../entities/user.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const user = await this.userRepository.findOneBy({
      id: createCharacterDto.userId,
    });
    if (!user) throw new Error('User not found');
    const character = this.characterRepository.create({
      ...createCharacterDto,
      user,
    });
    return this.characterRepository.save(character);
  }

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Character | null> {
    return this.characterRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character | null> {
    const updateData: any = { ...updateCharacterDto };
    if (updateCharacterDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateCharacterDto.userId,
      });
      if (!user) throw new Error('User not found');
      updateData.user = user;
    }
    await this.characterRepository.update(id, updateData);
    return this.characterRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.characterRepository.delete(id);
  }
}

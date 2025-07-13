import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { User } from '../entities/user.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterService {
    private readonly characterRepository;
    private readonly userRepository;
    constructor(characterRepository: Repository<Character>, userRepository: Repository<User>);
    create(createCharacterDto: CreateCharacterDto): Promise<Character>;
    findAll(): Promise<Character[]>;
    findOne(id: number): Promise<Character | null>;
    update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character | null>;
    remove(id: number): Promise<void>;
}

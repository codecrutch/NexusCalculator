import { Repository } from 'typeorm';
import { Creature } from '../entities/creature.entity';
import { Cave } from '../entities/cave.entity';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
export declare class CreatureService {
    private readonly creatureRepository;
    private readonly caveRepository;
    constructor(creatureRepository: Repository<Creature>, caveRepository: Repository<Cave>);
    create(createCreatureDto: CreateCreatureDto): Promise<Creature>;
    findAll(): Promise<Creature[]>;
    findOne(id: number): Promise<Creature | null>;
    update(id: number, updateCreatureDto: UpdateCreatureDto): Promise<Creature | null>;
    remove(id: number): Promise<void>;
}

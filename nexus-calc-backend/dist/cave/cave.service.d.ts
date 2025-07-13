import { Repository } from 'typeorm';
import { Cave } from '../entities/cave.entity';
import { CreateCaveDto } from './dto/create-cave.dto';
import { UpdateCaveDto } from './dto/update-cave.dto';
export declare class CaveService {
    private readonly caveRepository;
    constructor(caveRepository: Repository<Cave>);
    create(createCaveDto: CreateCaveDto): Promise<Cave>;
    findAll(): Promise<Cave[]>;
    findOne(id: number): Promise<Cave | null>;
    update(id: number, updateCaveDto: UpdateCaveDto): Promise<Cave | null>;
    remove(id: number): Promise<void>;
}

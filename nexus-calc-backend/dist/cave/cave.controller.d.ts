import { CaveService } from './cave.service';
import { CreateCaveDto } from './dto/create-cave.dto';
import { UpdateCaveDto } from './dto/update-cave.dto';
export declare class CaveController {
    private readonly caveService;
    constructor(caveService: CaveService);
    create(createCaveDto: CreateCaveDto): Promise<import("../entities/cave.entity").Cave>;
    findAll(): Promise<import("../entities/cave.entity").Cave[]>;
    findOne(id: string): Promise<import("../entities/cave.entity").Cave | null>;
    update(id: string, updateCaveDto: UpdateCaveDto): Promise<import("../entities/cave.entity").Cave | null>;
    remove(id: string): Promise<void>;
}

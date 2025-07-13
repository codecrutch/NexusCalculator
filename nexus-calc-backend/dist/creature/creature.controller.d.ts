import { CreatureService } from './creature.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
export declare class CreatureController {
    private readonly creatureService;
    constructor(creatureService: CreatureService);
    create(createCreatureDto: CreateCreatureDto): Promise<import("../entities/creature.entity").Creature>;
    findAll(): Promise<import("../entities/creature.entity").Creature[]>;
    findOne(id: string): Promise<import("../entities/creature.entity").Creature | null>;
    update(id: string, updateCreatureDto: UpdateCreatureDto): Promise<import("../entities/creature.entity").Creature | null>;
    remove(id: string): Promise<void>;
}

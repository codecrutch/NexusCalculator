import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    create(createCharacterDto: CreateCharacterDto): Promise<import("../entities/character.entity").Character>;
    findAll(): Promise<import("../entities/character.entity").Character[]>;
    findOne(id: string): Promise<import("../entities/character.entity").Character | null>;
    update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<import("../entities/character.entity").Character | null>;
    remove(id: string): Promise<void>;
}

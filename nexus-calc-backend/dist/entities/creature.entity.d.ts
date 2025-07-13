import { Cave } from './cave.entity';
export declare class Creature {
    id: number;
    creaturename: string;
    vita: number;
    ac: number;
    imagelocation: string;
    cave: Cave;
    created_at: Date;
    updated_at: Date;
}

import { Creature } from './creature.entity';
export declare class Cave {
    id: number;
    cavename: string;
    requirements: string;
    coordinates: string;
    boss: string;
    drops: string;
    creatures: Creature[];
    created_at: Date;
    updated_at: Date;
}

import { User } from './user.entity';
export declare class Character {
    id: number;
    path: string;
    subpath: string;
    name: string;
    vita: number;
    mana: number;
    might: number;
    will: number;
    grace: number;
    alignment: string;
    title: string;
    clan: string;
    clantitle: string;
    imagelocation: string;
    user: User;
    created_at: Date;
    updated_at: Date;
}

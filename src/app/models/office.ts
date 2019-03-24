import { Houseroom } from './houseroom';

export interface Office {
    id: number;
    name: string;
    address: string;
    houserooms: Houseroom[];
}

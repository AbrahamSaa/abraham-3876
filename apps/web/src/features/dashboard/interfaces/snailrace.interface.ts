import type { Snail } from "./snail.interface";

export interface SnailRace {
    id: string;
    race: string;
    hour: string;
    snail: Snail;
    completed: boolean;
}
import type { Snail } from "../interfaces/snail.interface";
import type { SnailRace } from "../interfaces/snail-race.interface";

export const snails: Snail[] = [
    { color: "#0294c7", name: "Franchesco" },
    { color: "#e11d48", name: "El rayo caracol" },
    { color: "#d97757", name: "Caparazón" },
    { color: "#9333ea", name: "Caracolin" },
    { color: "#d97706", name: "Don lentitud" },
    { color: "#059669", name: "kararun" },
];

const randomSnail = () => snails[Math.floor(Math.random() * snails.length)];

const RACE_SCHEDULE = [
    { race: "Carrera 1", hour: "10:00 a.m" },
    { race: "Carrera 2", hour: "11:30 a.m" },
    { race: "Carrera 3", hour: "1:00 p.m" },
    { race: "Carrera 4", hour: "2:00 p.m" },
    { race: "Carrera 5", hour: "4:00 p.m" },
    { race: "Carrera 6", hour: "8:00 p.m" },
];

// Simulated data: winners and ids are regenerated on every page load.
export const snailRace: SnailRace[] = RACE_SCHEDULE.map((slot) => ({
    id: crypto.randomUUID(),
    ...slot,
    snail: randomSnail(),
    completed: true,
}));

export const getCompletedRaces = (races: SnailRace[] = snailRace) =>
    races.filter((race) => race.completed);

export const getWinsBySnail = (races: SnailRace[] = snailRace) => {
    const completed = getCompletedRaces(races);
    return snails.map((snail) => ({
        name: snail.name,
        color: snail.color,
        wins: completed.filter((race) => race.snail.name === snail.name).length,
    }));
};

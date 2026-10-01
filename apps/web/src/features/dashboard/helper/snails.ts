import type { Snail } from "../interfaces/snail.interface";
import type { SnailRace } from "../interfaces/snailrace.interface";

export const snails: Snail[] = [
    {
        color: "#0294c7",
        name: "Franchesco",
    },
    {
        color: "#e11d48",
        name: "El rayo caracol",
    },
    {
        color: "#d97757",
        name: "Caparazón",
    },
    {
        color: "#9333ea",
        name: "Caracolin",
    },
    {
        color: "#d97706",
        name: "Don lentitud",
    },
    {
        color: "#059669",
        name: "kararun",
    },
];



export const snailRace: SnailRace[] = [
    {
        id: crypto.randomUUID(),
        hour: "10:00 a.m",
        race: "Carrera 1",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
    {
        id: crypto.randomUUID(),
        hour: "11:30 a.m",
        race: "Carrera 2",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
    {
        id: crypto.randomUUID(),
        hour: "1:00 p.m",
        race: "Carrera 3",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
    {
        id: crypto.randomUUID(),
        hour: "2:00 p.m",
        race: "Carrera 4",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
    {
        id: crypto.randomUUID(),
        hour: "4:00 p.m",
        race: "Carrera 5",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
    {
        id: crypto.randomUUID(),
        hour: "8:00 p.m",
        race: "Carrera 6",
        snail: snails[Math.floor(Math.random() * snails.length)],
        completed: true,
    },
];


export const getWinsBySnail = (races: SnailRace[] = snailRace) =>
    snails.map((snail) => ({
        name: snail.name,
        color: snail.color,
        wins: races.filter((race) => race.completed && race.snail.name === snail.name).length,
    }));

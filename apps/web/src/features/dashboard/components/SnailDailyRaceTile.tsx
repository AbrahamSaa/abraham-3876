import React from 'react'
import type { SnailRace } from '../interfaces/snailrace.interface'
import { Snail } from 'lucide-react';

interface Props {
    race: SnailRace;
    isLastIndex?: boolean;
}

export const SnailDailyRaceTile = ({ race, isLastIndex = false }: Props) => {
    return (
        <div className={`flex flex-row px-2 py-3 items-center justify-between ${!isLastIndex ? 'border-b' : ''}`}>
            <div className='felx-col flex-1'>
                <h5 className='font-heading font-semibold text-sm'>{race.race}</h5>
                <p className='font-sans text-xs text-gray-500'>{race.hour}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <span className='text-gray-500 text-xs font-sans'>Ganador</span>
                <h5 className='font-heading font-semibold text-sm'>{race.snail.name}</h5>
                <Snail color={race.snail.color} />
            </div>
        </div>
    )
}

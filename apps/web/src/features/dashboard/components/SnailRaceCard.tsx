import React from 'react'
import { snailRace } from '../helper/snails';
import { Snail } from 'lucide-react';
import { SnailDailyRaceTile } from './SnailDailyRaceTile';

interface Props {
    className?: string;
}

export const SnailRaceCard = ({ className }: Props) => {

    return (
        <div className={`${className} bg-white shadow-md rounded-md p-3 flex flex-col gap-3`}>

            <div className='flex flex-row justify-between items-center'>
                <div className='flex-1'>
                    <h5 className='font-heading text-md font-semibold'>Carreras de hoy</h5>
                    <p className='text-xs font-normal font-sans text-gray-500'>{snailRace.length} de {snailRace.filter((race) => race.completed).length} finalizadas</p>
                </div>
                <div>
                    <span className='bg-gray-200 rounded-full text-xs items-center p-2 shadow-sm'>Día cerrado</span>
                </div>

            </div>
            <div className=''>
                {snailRace.map((race, index) => <SnailDailyRaceTile key={race.id} race={race} isLastIndex={index == snailRace.length - 1} />)}
            </div>
        </div>
    )
}

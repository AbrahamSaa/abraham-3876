import { cn } from 'cn';
import { getCompletedRaces, snailRace } from '../helpers/snails';
import { DashboardCard } from './DashboardCard';
import { Pill } from './Pill';
import { SnailDailyRaceTile } from './SnailDailyRaceTile';

interface Props {
    className?: string;
}

export const SnailRaceCard = ({ className }: Props) => {
    const completedRaces = getCompletedRaces().length;

    return (
        <DashboardCard className={cn('gap-3', className)}>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex-1'>
                    <h5 className='font-heading text-md font-semibold'>Carreras de hoy</h5>
                    <p className='text-xs font-normal font-sans text-gray-500'>{completedRaces} de {snailRace.length} finalizadas</p>
                </div>
                <Pill>Día cerrado</Pill>
            </div>
            <div>
                {snailRace.map((race, index) => (
                    <SnailDailyRaceTile key={race.id} race={race} isLastIndex={index === snailRace.length - 1} />
                ))}
            </div>
        </DashboardCard>
    )
}

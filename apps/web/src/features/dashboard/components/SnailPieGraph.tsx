import { FaceSlightlyFrowning, Trophy } from 'lucide-react';
import { Pie, PieChart, Tooltip } from 'recharts';

interface CakeGraphProps {
    wins?: number;
    losses?: number;
    className?: string;
}

const WIN_COLOR = '#008236';
const LOSS_COLOR = '#9ca3af';

export const SnailPieGraph = ({ wins = 10, losses = 15, className }: CakeGraphProps) => {
    const total = wins + losses;
    const winPercentage = total > 0 ? Math.round((wins / total) * 100) : 0;

    const data = [
        { name: 'Ganadas', value: wins, fill: WIN_COLOR },
        { name: 'Perdidas', value: losses, fill: LOSS_COLOR },
    ];

    return (
        <div className={`bg-white shadow-md rounded-md p-3 flex flex-col ${className}`}>

            <h5 className='font-heading text-md font-semibold'>Apuestas ganadas vs perdidas</h5>
            <p className='text-xs font-normal font-sans text-gray-500'>Histórico de la cuenta</p>
            <div className='flex gap-6 items-center'>
                <div className='relative w-32 h-32'>
                    <PieChart responsive style={{ width: '100%', height: '100%' }}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="90%"
                            outerRadius="100%"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            isAnimationActive={true}
                        />
                        <Tooltip />
                    </PieChart>
                    <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                        <span className='text-3xl font-bold text-primary'>{winPercentage}%</span>
                        <span className='text-sm text-gray-500'>Wins</span>
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <div className='flex items-center gap-3 rounded-md bg-green-50 px-3 py-2'>
                        <span className='flex size-8 items-center justify-center rounded-full bg-primary/10'>
                            <Trophy className='text-primary' size={16} />
                        </span>
                        <div className='flex flex-1 flex-col leading-tight'>
                            <span className='text-xs text-gray-600'>Ganadas</span>
                            <span className='text-lg font-semibold'>{wins}</span>
                        </div>
                        <span className='text-xs font-medium text-primary'>{winPercentage}%</span>
                    </div>
                    <div className='flex items-center gap-3 rounded-md bg-gray-50 px-3 py-2'>
                        <span className='flex size-8 items-center justify-center rounded-full bg-gray-200'>
                            <FaceSlightlyFrowning className='text-gray-500' size={16} />
                        </span>
                        <div className='flex flex-1 flex-col leading-tight'>
                            <span className='text-xs text-gray-600'>Perdidas</span>
                            <span className='text-lg font-semibold'>{losses}</span>
                        </div>
                        <span className='text-xs font-medium text-gray-500'>{total > 0 ? 100 - winPercentage : 0}%</span>
                    </div>
                    <div className='flex items-center justify-between border-t border-gray-200 px-1 pt-2'>
                        <span className='text-xs text-gray-600'>Total de apuestas</span>
                        <span className='text-sm font-semibold'>{total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { FaceSlightlyFrowning, Trophy } from 'lucide-react';
import { cn } from 'cn';
import type { ReactNode } from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';
import { CHART_COLORS } from '../constants/chart-colors';
import { DashboardCard } from './DashboardCard';

interface SnailPieGraphProps {
    wins?: number;
    losses?: number;
    className?: string;
}

interface StatRowProps {
    icon: ReactNode;
    label: string;
    value: number;
    percentage: number;
    rowClassName: string;
    iconClassName: string;
    percentageClassName: string;
}

const StatRow = ({ icon, label, value, percentage, rowClassName, iconClassName, percentageClassName }: StatRowProps) => (
    <div className={cn('flex items-center gap-3 rounded-md px-3 py-2', rowClassName)}>
        <span className={cn('flex size-8 items-center justify-center rounded-full', iconClassName)}>{icon}</span>
        <div className='flex flex-1 flex-col leading-tight'>
            <span className='text-xs text-gray-600'>{label}</span>
            <span className='text-lg font-semibold'>{value}</span>
        </div>
        <span className={cn('text-xs font-medium', percentageClassName)}>{percentage}%</span>
    </div>
)

// Placeholder values until real betting history is available.
export const SnailPieGraph = ({ wins = 10, losses = 15, className }: SnailPieGraphProps) => {
    const total = wins + losses;
    const winPercentage = total > 0 ? Math.round((wins / total) * 100) : 0;
    const lossPercentage = total > 0 ? 100 - winPercentage : 0;

    const data = [
        { name: 'Ganadas', value: wins, fill: CHART_COLORS.win },
        { name: 'Perdidas', value: losses, fill: CHART_COLORS.loss },
    ];

    return (
        <DashboardCard className={className}>
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
                            isAnimationActive
                        />
                        <Tooltip />
                    </PieChart>
                    <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                        <span className='text-3xl font-bold text-primary'>{winPercentage}%</span>
                        <span className='text-sm text-gray-500'>Ganados</span>
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <StatRow
                        icon={<Trophy className='text-primary' size={16} />}
                        label='Ganadas'
                        value={wins}
                        percentage={winPercentage}
                        rowClassName='bg-green-50'
                        iconClassName='bg-primary/10'
                        percentageClassName='text-primary' />
                    <StatRow
                        icon={<FaceSlightlyFrowning className='text-gray-500' size={16} />}
                        label='Perdidas'
                        value={losses}
                        percentage={lossPercentage}
                        rowClassName='bg-gray-50'
                        iconClassName='bg-gray-200'
                        percentageClassName='text-gray-500' />
                    <div className='flex items-center justify-between border-t border-gray-200 px-1 pt-2'>
                        <span className='text-xs text-gray-600'>Total de apuestas</span>
                        <span className='text-sm font-semibold'>{total}</span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    )
}

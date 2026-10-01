import { cn } from 'cn';
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS } from '../constants/chart-colors';
import { getCompletedRaces, getWinsBySnail } from '../helpers/snails';
import { DashboardCard } from './DashboardCard';

interface Props {
    className?: string;
}

export const SnailBarGraph = ({ className }: Props) => {
    const data = getWinsBySnail();
    const totalRaces = getCompletedRaces().length;

    return (
        <DashboardCard className={cn('gap-3', className)}>
            <div>
                <h5 className='font-heading text-md font-semibold'>Victorias por caracol</h5>
                <p className='text-xs font-normal font-sans text-gray-500'>
                    {totalRaces} carreras del día simulado
                </p>
            </div>
            <BarChart
                responsive
                data={data}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                style={{ width: '100%', height: 220 }}
            >
                <XAxis dataKey='name' tickLine={false} axisLine={false} fontSize={12} />
                <YAxis allowDecimals={false} domain={[0, totalRaces]} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip formatter={(value) => [value, 'Victorias']} cursor={{ fill: CHART_COLORS.barCursor }} />
                <Bar dataKey='wins' radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {data.map((snail) => <Cell key={snail.name} fill={snail.color} />)}
                </Bar>
            </BarChart>
        </DashboardCard>
    )
}

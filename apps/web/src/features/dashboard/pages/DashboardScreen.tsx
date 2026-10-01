import { useAuth } from '../../auth/hooks/useAuth';
import { Pill } from '../components/Pill';
import { SnailBarGraph } from '../components/SnailBarGraph';
import { SnailCreditCard } from '../components/SnailCreditCard';
import { SnailPieGraph } from '../components/SnailPieGraph';
import { SnailRaceCard } from '../components/SnailRaceCard';

const formatLongDate = (date: Date) =>
    date.toLocaleString('es-MX', { month: 'long', day: 'numeric', year: 'numeric' });

export const DashboardScreen = () => {
    const { user } = useAuth();

    return (
        <div className='w-full flex flex-col gap-6 bg-transparent'>
            <div className='flex gap-3 justify-between items-center'>
                <div className='flex-col'>
                    <h4 className='font-semibold text-xl'>Hola, {user?.name}</h4>
                    <span className='text-mist-600 text-sm'>Resumen del día {formatLongDate(new Date())}</span>
                </div>
                <Pill className='text-sm'>Datos simulados</Pill>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 gap-6 grid-rows-2 max-md:grid-cols-1'>
                <SnailCreditCard className='max-md:col-span-2' />
                <SnailPieGraph className='max-md:col-span-2' />
                <SnailRaceCard className='row-span-2 max-lg:col-span-2' />
                <SnailBarGraph className='col-span-2' />
            </div>
        </div>
    )
}

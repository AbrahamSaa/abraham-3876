import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { SnailCreditCard } from '../components/SnailCreditCard';
import { SnailPieGraph } from '../components/SnailPieGraph';
import { SnailRaceCard } from '../components/SnailRaceCard';
import { SnailBarGraph } from '../components/SnailBarGraph';

export const DashboardScreen = () => {
    const { user } = useAuth();
    const today = new Date();
    const formatted = today.toLocaleString('es-MX', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className='w-full flex flex-col gap-6 bg-transparent'>
            <div className='flex gap-3 justify-between items-center'>
                <div className='flex-col'>
                    <h4 className='font-semibold text-xl'>Hola, {user?.name}</h4>
                    <span className='text-mist-600 text-sm'>Resumen del día {formatted}</span>
                </div>
                <div>
                    <span className='bg-gray-200 rounded-full text-sm items-center p-2 shadow-sm'>Datos simulados</span>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6 grid-rows-3'>
                <SnailCreditCard />
                <SnailPieGraph />
                <SnailRaceCard className='row-span-2' />
                <SnailBarGraph className='col-span-2' />
            </div>
        </div>
    )
}

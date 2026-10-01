import { SnailButton } from '@/src/components/SnailButton'
import { CreditCard, Snail } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string;
}

export const SnailCreditCard = ({ className }: Props) => {
    return (
        <div className={`bg-primary/90 rounded-md shadow-md p-3 flex flex-col text-white ${className}`}>
            <div className='flex gap-3'>
                <div className='flex-1'>
                    <h5 className='font-sans text-xs'>Saldo disponible</h5>
                    <div className='flex gap-3 items-end'>
                        <h3 className='font-semibold text-3xl font-heading'>$0.00</h3>
                        <span className='font-normal text-sm'>mxn</span>
                    </div>
                </div>
                <div>
                    <Snail />
                </div>
            </div>
            <div className='bg-white/10 rounded-md p-3 my-3'>
                <p className='text-sm'>Tu saldo está en cero. carga saldo con SnailPay para empezar a apostar en las carreras más rapidas del día.</p>
            </div>
            <SnailButton isLoading={false} title={'Recargar saldo'} variant={"outline"} className='text-mist-800 cursor-pointer' />
        </div>
    )
}

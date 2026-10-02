import { Snail } from 'lucide-react'
import { cn } from 'cn'
import { PaymentDialog } from '../../payment/components/PaymentDialog';
import type { UserFunds } from '../../payment/types/user-funds';
import { formatCurrency } from '@snail/shared';

interface Props {
    className?: string;
    userFunds: UserFunds | undefined | null;
}

export const SnailCreditCard = ({ className, userFunds }: Props) => {
    return (
        <div className={cn('bg-primary/90 rounded-md shadow-md p-3 flex flex-col text-white', className)}>
            <div className='flex gap-3'>
                <div className='flex-1'>
                    <h5 className='font-sans text-xs'>Saldo disponible</h5>
                    <div className='flex gap-3 items-end'>
                        <h3 className={`font-semibold text-3xl font-heading ${userFunds === undefined ? 'shimmer' : ''}`}>{formatCurrency(userFunds?.funds)}</h3>
                        <span className='font-normal text-sm'>mxn</span>
                    </div>
                </div>
                <div>
                    <Snail />
                </div>
            </div>
            <div className='bg-white/10 rounded-md p-3 my-3'>
                {userFunds === null || userFunds === undefined ?
                    <p className='text-sm'>Tu saldo está en cero. carga saldo con SnailPay para empezar a apostar en las carreras más rapidas del día.</p>
                    : <p className='text-sm'>Recuerda que siempre puedes recargar más saldo con SnailPay.</p>}
            </div>
            <div className="flex-1"></div>
            <PaymentDialog />
        </div>
    )
}

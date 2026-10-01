import { cn } from 'cn'
import type { ComponentProps } from 'react'

export const DashboardCard = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('bg-white shadow-md rounded-md p-3 flex flex-col', className)} {...props} />
)

import { cn } from 'cn'
import type { ComponentProps } from 'react'

export const Pill = ({ className, ...props }: ComponentProps<'span'>) => (
    <span className={cn('bg-gray-200 rounded-full text-xs items-center p-2 shadow-sm', className)} {...props} />
)

import { Button } from '@/components/ui/button'
import { type ComponentProps } from 'react'
import { Spinner } from '@/components/ui/spinner';

interface Props extends ComponentProps<"button"> {
    isLoading: boolean;
    title: string;
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
}

export const SnailButton = ({ isLoading, title, variant = "default", ...props }: Props) => {

    if (isLoading) {
        return <div className='w-full justify-items-center'><Spinner /></div>
    }
    return (
        <Button variant={variant} {...props}>{title}</Button>

    )
}

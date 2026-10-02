import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
interface Props {
    title: string;
    description: string;
    variant?: "default" | "destructive" | null | undefined;
    className?: string;
}

export const SnailAlert = ({ title, description, variant = "default", className = "" }: Props) => {
    return (
        <Alert variant={variant} className={`${variant === 'destructive' ? "bg-red-200" : ""} ${className}`}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

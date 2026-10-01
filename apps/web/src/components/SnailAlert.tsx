import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
interface Props {
    title: string;
    description: string;
    variant?: "default" | "destructive" | null | undefined;
}

export const SnailAlert = ({ title, description, variant = "default" }: Props) => {
    return (
        <Alert variant={variant} className={`${variant === 'destructive' ? "bg-red-200" : ""}`}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

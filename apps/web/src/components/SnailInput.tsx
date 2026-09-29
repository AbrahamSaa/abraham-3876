import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { ComponentProps } from 'react';

interface Props extends ComponentProps<"input"> {
    label: string;
    error?: string;
}

export const SnailInput = ({ label, error, id, ...props }: Props) => {
    return (
        <Field data-invalid={!!error} className='gap-1'>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input id={id} aria-invalid={!!error} {...props} />
            {error && <FieldError className='text-xs'>{error}</FieldError>}
        </Field>
    )
}

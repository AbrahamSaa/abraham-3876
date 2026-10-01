import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { mergeRefs } from '@/src/lib/merge-refs'
import { Eye, EyeClosed } from 'lucide-react'
import { cn } from 'cn'
import { useState, type ComponentProps, type ReactNode, type Ref } from 'react'

interface Props extends ComponentProps<"input"> {
    label: string;
    error?: string;
    suffixIcon?: ReactNode;
    prefixIcon?: ReactNode;
    fieldClassName?: string;
    maskRef?: Ref<HTMLInputElement>;
}

export const SnailInput = ({ label, error, id, suffixIcon, prefixIcon, fieldClassName, maskRef, ref, ...props }: Props) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const isPassword = props.type === "password";
    // `ref` (e.g. from react-hook-form's register) and `maskRef` (from useMask) must both reach the input
    const inputRef = mergeRefs(ref, maskRef);

    return (
        <Field data-invalid={!!error} className={cn("gap-1", fieldClassName)}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    ref={inputRef}
                    id={id}
                    aria-invalid={!!error}
                    {...props}
                    type={passwordVisibility ? "text" : props.type} />
                {isPassword && (
                    <InputGroupAddon align="inline-end">
                        <Button
                            type="button"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => setPasswordVisibility(!passwordVisibility)}>
                            {passwordVisibility ? <Eye /> : <EyeClosed />}
                        </Button>
                    </InputGroupAddon>
                )}
                {suffixIcon && <InputGroupAddon align="inline-end">{suffixIcon}</InputGroupAddon>}
                {prefixIcon && <InputGroupAddon align="inline-start">{prefixIcon}</InputGroupAddon>}
            </InputGroup>
            {error && <FieldError className='text-xs'>{error}</FieldError>}
        </Field>
    )
}

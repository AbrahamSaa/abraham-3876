import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Eye, EyeClosed, EyeOffIcon } from 'lucide-react';
import { useEffect, useState, type ComponentProps } from 'react';

interface Props extends ComponentProps<"input"> {
    label: string;
    error?: string;
}

export const SnailInput = ({ label, error, id, ...props }: Props) => {

    const [passwordVisibility, setPasswordVisibility] = useState(false);


    return (
        <Field data-invalid={!!error} className='gap-1'>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <InputGroup>
                <InputGroupInput id={id} aria-invalid={!!error} {...props} type={passwordVisibility ? "text" : props.type} />
                {props.type == "password" && <InputGroupAddon align={"inline-end"}>
                    <Button variant={"ghost"} className={"cursor-pointer"} onClick={() => setPasswordVisibility(!passwordVisibility)}>
                        {passwordVisibility ? <Eye /> : <EyeClosed />}
                    </Button>
                </InputGroupAddon>}
            </InputGroup>
            {error && <FieldError className='text-xs'>{error}</FieldError>}
        </Field>
    )
}

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react'
import { Link } from 'react-router-dom'

export const SignupScreen = () => {


    const handleOnSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <Card size='default'>
            <CardHeader>
                <CardTitle >Crea tu cuenta</CardTitle>
                <CardAction>
                    <Link to={"/"}><Button variant={"link"} className={"cursor-pointer"} >Iniciar sesión</Button>
                    </Link>
                </CardAction>


            </CardHeader>
            <CardContent>
                <form onSubmit={handleOnSubmit}>
                    <div className='flex flex-col gap-3'>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input type='email' placeholder='Tu email' required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Contraseña</FieldLabel>
                            <Input type='password' placeholder='Tu contraseña' required />
                        </Field>
                        <Button variant={"default"} type='submit'>Iniciar sesión</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

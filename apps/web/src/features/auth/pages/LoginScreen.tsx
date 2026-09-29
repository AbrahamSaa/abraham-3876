import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type LoginFormValues, loginSchema } from '@snail/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { SnailInput } from '@/src/components/SnailInput';
import { SnailButton } from '@/src/components/SnailButton';

export const LoginScreen = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched"
    });

    const handleOnSubmit = async (values: LoginFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    console.log(isSubmitting);

    return (
        <Card size='default'>
            <CardHeader>
                <CardTitle >Iniciar sesión</CardTitle>
                <CardDescription>Inicia sesión para conocer tu saldo y apostar en los mejores caracoles</CardDescription>
                <CardAction>
                    <Link to={"/signup"}><Button variant={"link"} className={"cursor-pointer"} >Crea una cuenta</Button>
                    </Link>
                </CardAction>


            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <SnailInput
                            id='email'
                            label={'Email'}
                            {...register("email")}
                            autoComplete='email'
                            type='email'
                            error={errors.email?.message} />
                        <SnailInput
                            id='password'
                            label={'Contraseña'}
                            {...register("password")}
                            autoComplete='current-password'
                            type='password'
                            error={errors.password?.message} />
                        <SnailButton
                            type='submit'
                            isLoading={isSubmitting}
                            title={'Iniciar sesión'} />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

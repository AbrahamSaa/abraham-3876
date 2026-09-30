import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type SignupFormValues, signupSchema } from '@snail/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { SnailInput } from '@/src/components/SnailInput';
import { SnailButton } from '@/src/components/SnailButton';
import { CircleCheckIcon } from 'lucide-react';
import { signup } from '../services/authService';
import { SnailAlert } from '@/src/components/SnailAlert';

export const SignupScreen = () => {

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onTouched"
    });

    const handleOnSubmit = async (values: SignupFormValues) => {
        try {
            await signup(values);

        } catch (error) {
            if (error instanceof Error) {
                setError('root', {
                    message: error.message
                });
            }
        }
    }

    console.log(errors);

    return (
        <Card size='default'>
            <CardHeader>
                <CardTitle >Crea tu cuenta</CardTitle>
                <CardDescription>Regístrate para apostar en los mejores caracoles</CardDescription>
                <CardAction>
                    <Link to={"/"}><Button variant={"link"} className={"cursor-pointer"} >Iniciar sesión</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <SnailInput
                            id='name'
                            label={'Nombre'}
                            {...register("name")}
                            autoComplete='name'
                            type='text'
                            error={errors.name?.message} />
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
                            autoComplete='new-password'
                            type='password'
                            error={errors.password?.message} />
                        <SnailInput
                            id='confirmPassword'
                            label={'Confirmar contraseña'}
                            {...register("confirmPassword")}
                            autoComplete='new-password'
                            type='password'
                            error={errors.confirmPassword?.message} />
                        <div className='flex flex-col gap-3'>
                            <div className={`flex flex-row gap-3 ${watch("password", "").length >= 8 ? "text-green-900" : "text-gray-500"}`}>
                                <CircleCheckIcon />
                                <span>La contraseña tiene al menos 8 caracteres</span>
                            </div>
                            <div className={`flex flex-row gap-3 ${watch("password", "") !== "" && watch("password", "") === watch("confirmPassword") ? "text-green-900" : "text-gray-500"}`}>
                                <CircleCheckIcon />
                                <span>Las contraseñas coinciden</span>
                            </div>
                        </div>
                        {errors.root && <SnailAlert variant={"destructive"} title={'Atención'} description={errors.root.message ?? ""} />}
                        <SnailButton
                            type='submit'
                            isLoading={isSubmitting}
                            title={'Crear cuenta'} />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

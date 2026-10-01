import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { type SignupFormValues, signupSchema } from '@snail/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { SnailInput } from '@/src/components/SnailInput';
import { SnailButton } from '@/src/components/SnailButton';
import { signup } from '../services/authService';
import { SnailAlert } from '@/src/components/SnailAlert';
import { getErrorMessage } from '@/src/lib/get-error-message';
import { PasswordRule } from '../components/PasswordRule';

const MIN_PASSWORD_LENGTH = 8;

export const SignupScreen = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onTouched"
    });

    const password = useWatch({ control, name: "password", defaultValue: "" });
    const confirmPassword = useWatch({ control, name: "confirmPassword", defaultValue: "" });
    const hasMinLength = password.length >= MIN_PASSWORD_LENGTH;
    const passwordsMatch = password !== "" && password === confirmPassword;

    const submitSignup = async (values: SignupFormValues) => {
        try {
            await signup(values);
            navigate("/");
        } catch (error) {
            setError('root', { message: getErrorMessage(error) });
        }
    }

    return (
        <Card size='default'>
            <CardHeader>
                <CardTitle>Crea tu cuenta</CardTitle>
                <CardDescription>Regístrate para apostar en los mejores caracoles</CardDescription>
                <CardAction>
                    <Button variant="link" className="cursor-pointer" nativeButton={false} render={<Link to="/" />}>
                        Iniciar sesión
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(submitSignup)}>
                    <div className='flex flex-col gap-3'>
                        <SnailInput
                            id='name'
                            label="Nombre"
                            {...register("name")}
                            autoComplete='name'
                            error={errors.name?.message} />
                        <SnailInput
                            id='email'
                            label="Email"
                            {...register("email")}
                            autoComplete='email'
                            type='email'
                            error={errors.email?.message} />
                        <SnailInput
                            id='password'
                            label="Contraseña"
                            {...register("password")}
                            autoComplete='new-password'
                            type='password'
                            error={errors.password?.message} />
                        <SnailInput
                            id='confirmPassword'
                            label="Confirmar contraseña"
                            {...register("confirmPassword")}
                            autoComplete='new-password'
                            type='password'
                            error={errors.confirmPassword?.message} />
                        <div className='flex flex-col gap-3'>
                            <PasswordRule met={hasMinLength}>La contraseña tiene al menos 8 caracteres</PasswordRule>
                            <PasswordRule met={passwordsMatch}>Las contraseñas coinciden</PasswordRule>
                        </div>
                        {errors.root && <SnailAlert variant={"destructive"} title="Atención" description={errors.root.message ?? ''} />}
                        <SnailButton
                            type='submit'
                            isLoading={isSubmitting}
                            title="Crear cuenta" />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

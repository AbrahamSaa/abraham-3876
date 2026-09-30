import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row md:h-screen gap-3'>
            <div className='gap-6 bg-accent content-center p-4 md:flex-4/12'>
                <h2 className='text-white! text-4xl font-bold'>Apuesta por el caracol<br />más veloz de la pista.</h2>
                <p className='text-muted pt-4'>Consulta tu saldo, recarga con SnailPay y sigue las 6 carreras más rapidas del día</p>
            </div>
            <div className='flex-1 content-center justify-items-center md:flex-6/12 py-4'>

                <div className='w-3/5 max-md:w-full max-md:px-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

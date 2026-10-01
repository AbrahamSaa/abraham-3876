import { PrivateRoute } from '../router/PrivateRoute'
import { Outlet } from 'react-router-dom'
import { Header } from '@/src/components/Header'

export const DashboardLayout = () => {
    return (
        <PrivateRoute>
            <Header />
            <div className='w-5/6 p-4 place-self-center max-md:w-full '>

                <Outlet />
            </div>
        </PrivateRoute>
    )
}

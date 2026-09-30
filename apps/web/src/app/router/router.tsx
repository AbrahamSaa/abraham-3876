import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { LoginScreen } from '@/src/features/auth/pages/LoginScreen';
import { SignupScreen } from '@/src/features/auth/pages/SignupScreen';
import { PrivateRoute } from './PrivateRoute';
import { DashboardLayout } from '../layout/DashboardLayout';


const router = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: LoginScreen,
            },
            {
                path: "/signup",
                Component: SignupScreen,
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: '/dashboard',
    }
]);

export default router;

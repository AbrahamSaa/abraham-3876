import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { LoginScreen } from '@/src/features/auth/pages/LoginScreen';
import { SignupScreen } from '@/src/features/auth/pages/SignupScreen';
import { DashboardLayout } from '../layout/DashboardLayout';
import { DashboardScreen } from '@/src/features/dashboard/pages/DashboardScreen';


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
        children: [
            {
                index: true,
                Component: DashboardScreen
            }
        ]
    }
]);

export default router;

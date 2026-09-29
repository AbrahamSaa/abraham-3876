import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { LoginScreen } from '../features/auth/pages/LoginScreen';
import { SignupScreen } from '../features/auth/pages/SignupScreen';


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
    }
]);

export default router;

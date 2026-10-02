import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { AuthProvider } from '../features/auth/context/AuthProvider'
import { PaymentProvider } from '../features/payment/context/PaymentProvider'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function SnailApp() {
    return (

        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <PaymentProvider>
                    <RouterProvider router={router} />
                </PaymentProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

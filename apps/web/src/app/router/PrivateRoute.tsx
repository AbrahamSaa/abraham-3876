import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {

    const { authStatus } = useAuth();

    if (authStatus === 'authenticated') {

        return (
            <div>
                {children}
            </div>
        )
    }

    if (authStatus === "unauthenticated") {
        return <Navigate to={"/"} />;
    }

    return <Spinner />
}

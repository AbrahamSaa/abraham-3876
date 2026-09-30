import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import React from 'react';
import { Navigate, redirect } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: Props) => {

    const { authStatus } = useAuth();

    if (authStatus === 'Unauthenticated') {

        return (
            <div>
                {children}
            </div>
        )
    }

    if (authStatus === "Authenticated") {
        return <Navigate to={"/dashboard"} />;
    }

    return <Spinner />
}

import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: Props) => {

    const { authStatus } = useAuth();

    if (authStatus === 'unauthenticated') {

        return (
            <div>
                {children}
            </div>
        )
    }

    if (authStatus === "authenticated") {
        return <Navigate to={"/dashboard"} />;
    }

    return <Spinner />
}

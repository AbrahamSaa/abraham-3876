import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import React from 'react';
import { redirect } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {

    const { authStatus } = useAuth();

    if (authStatus === 'Authenticated') {

        return (
            <div>
                {children}
            </div>
        )
    }

    if (authStatus === "Unauthenticated") {
        return redirect("/");
    }

    return <Spinner />
}

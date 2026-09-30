import React from 'react'
import { PrivateRoute } from '../router/PrivateRoute'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
    return (
        <PrivateRoute>
            <Outlet />
        </PrivateRoute>
    )
}

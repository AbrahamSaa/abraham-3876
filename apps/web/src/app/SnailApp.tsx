import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { AuthProvider } from '../features/auth/context/AuthProvider'

export default function SnailApp() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

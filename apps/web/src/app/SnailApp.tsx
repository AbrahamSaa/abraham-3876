import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

export default function SnailApp() {
    return (
        <RouterProvider router={router} />
    )
}

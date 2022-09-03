import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            1
            <Link to="/home"></Link>
            <Outlet />
        </div>
    )
}

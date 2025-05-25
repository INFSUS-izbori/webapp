import React from "react"
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
                    IZBORI
                </Link>
                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/candidates"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive ? "bg-white text-blue-700 shadow-md" : "text-blue-100 hover:bg-blue-500 hover:text-white"
                            }`
                        }>
                        Candidates
                    </NavLink>
                    <NavLink
                        to="/parties"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive ? "bg-white text-blue-700 shadow-md" : "text-blue-100 hover:bg-blue-500 hover:text-white"
                            }`
                        }>
                        Parties
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

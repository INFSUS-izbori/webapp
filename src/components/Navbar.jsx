import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<nav className="bg-gray-800 p-4 text-white">
			<div className="container mx-auto flex items-center justify-between">
				<Link to="/" className="text-xl font-bold">
					IZBORI
				</Link>
				<div>
					<Link to="/candidates" className="px-3 hover:text-gray-300">
						Candidates
					</Link>
					<Link to="/parties" className="px-3 hover:text-gray-300">
						Parties
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

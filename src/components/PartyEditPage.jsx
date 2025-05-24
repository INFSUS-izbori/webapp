import React, { useState, useEffect } from "react";
import PartyService from "../services/party.service";
import { useParams, useNavigate } from "react-router-dom";

const PartyEditPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [party, setParty] = useState({
		name: "",
		description: "",
		dateOfEstablishment: "",
		logo: "",
	});

	useEffect(() => {
		fetchParty();
	}, [id]);

	const fetchParty = async () => {
		try {
			const response = await PartyService.getById(id);
			setParty(response.data);
		} catch (error) {
			console.error("Error fetching party:", error);
		}
	};

	const handleChange = (e) => {
		setParty({ ...party, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await PartyService.update(id, party);
			navigate("/parties");
		} catch (error) {
			console.error("Error updating party:", error);
		}
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">Edit Party</h2>
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
						Name:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						name="name"
						value={party.name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
						Description:
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="description"
						name="description"
						value={party.description}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfEstablishment">
						Date of Establishment:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="dateOfEstablishment"
						type="text"
						name="dateOfEstablishment"
						value={party.dateOfEstablishment}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
						Logo:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="logo"
						type="text"
						name="logo"
						value={party.logo}
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Update
					</button>
					<Link
						to="/parties"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
};

export default PartyEditPage;

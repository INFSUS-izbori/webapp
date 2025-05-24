import React, { useState, useEffect } from "react";
import CandidateService from "../services/candidate.service";
import { Link } from "react-router-dom";

const CandidatesListPage = () => {
	const [candidates, setCandidates] = useState([]);

	useEffect(() => {
		fetchCandidates();
	}, []);

	const fetchCandidates = async () => {
		try {
			const response = await CandidateService.getAll();
			setCandidates(response.data);
		} catch (error) {
			console.error("Error fetching candidates:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await CandidateService.delete(id);
			setCandidates(candidates.filter((candidate) => candidate.id !== id));
		} catch (error) {
			console.error("Error deleting candidate:", error);
		}
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">Candidates</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="py-2 px-4 border-b">ID</th>
							<th className="py-2 px-4 border-b">OIB</th>
							<th className="py-2 px-4 border-b">Name</th>
							<th className="py-2 px-4 border-b">Image</th>
							<th className="py-2 px-4 border-b">Description</th>
							<th className="py-2 px-4 border-b">Party ID</th>
							<th className="py-2 px-4 border-b">Created Date</th>
							<th className="py-2 px-4 border-b">Actions</th>
						</tr>
					</thead>
					<tbody>
						{candidates.map((candidate) => (
							<tr key={candidate.id} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b">{candidate.id}</td>
								<td className="py-2 px-4 border-b">{candidate.oib}</td>
								<td className="py-2 px-4 border-b">{candidate.name}</td>
								<td className="py-2 px-4 border-b">{candidate.image}</td>
								<td className="py-2 px-4 border-b">{candidate.description}</td>
								<td className="py-2 px-4 border-b">{candidate.partyId}</td>
								<td className="py-2 px-4 border-b">{candidate.createdDate}</td>
								<td className="py-2 px-4 border-b">
									<Link
										to={`/candidates/${candidate.id}`}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
									>
										Edit
									</Link>
									<button
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => handleDelete(candidate.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CandidatesListPage;

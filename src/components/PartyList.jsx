import React, { useState, useEffect } from "react";
import PartyService from "../services/party.service";
import { Link } from "react-router-dom";

const PartyList = () => {
	const [parties, setParties] = useState([]);

	useEffect(() => {
		fetchParties();
	}, []);

	const fetchParties = async () => {
		try {
			const response = await PartyService.getAll();
			setParties(response.data);
		} catch (error) {
			console.error("Error fetching parties:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await PartyService.delete(id);
			setParties(parties.filter((party) => party.id !== id));
		} catch (error) {
			console.error("Error deleting party:", error);
		}
	};

	return (
		<div>
			<h2>Parties</h2>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Date of Establishment</th>
						<th>Logo</th>
						<th>Created Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{parties.map((party) => (
						<tr key={party.id}>
							<td>{party.id}</td>
							<td>{party.name}</td>
							<td>{party.description}</td>
							<td>{party.dateOfEstablishment}</td>
							<td>{party.logo}</td>
							<td>{party.createdDate}</td>
							<td>
								<Link to={`/parties/${party.id}`} className="btn btn-primary">
									Edit
								</Link>
								<button
									className="btn btn-danger"
									onClick={() => handleDelete(party.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PartyList;

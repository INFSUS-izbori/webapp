import React, { useState, useEffect } from "react"
import CandidateService from "../services/candidate.service"
import { Link } from "react-router-dom"
import Base64Image from "./Base64Image" // Added import

const CandidatesListPage = () => {
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        fetchCandidates()
    }, [])

    const fetchCandidates = async () => {
        try {
            const response = await CandidateService.getAll()
            setCandidates(response.data)
        } catch (error) {
            console.error("Error fetching candidates:", error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await CandidateService.delete(id)
            setCandidates(candidates.filter((candidate) => candidate.id !== id))
        } catch (error) {
            console.error("Error deleting candidate:", error)
        }
    }

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Candidates</h2>
                {/* Optional: Add a button for creating a new candidate here if needed */}
                {/* <Link to="/candidates/new" className="btn btn-primary">Add Candidate</Link> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table-custom">
                    <thead>
                        <tr>
                            {/* <th className="py-2 px-4 border-b">ID</th> */}
                            <th>OIB</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Party ID</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                {/* <td className="py-2 px-4 border-b">{candidate.id}</td> */}
                                <td>{candidate.oib}</td>
                                <td>{candidate.name}</td>
                                <td>
                                    <Base64Image
                                        base64String={candidate.image}
                                        altText={`${candidate.name} Image`}
                                        className="h-12 w-12 object-contain rounded"
                                    />
                                </td>
                                <td>{candidate.description}</td>
                                <td>{candidate.partyId}</td>
                                <td>{candidate.createdDate}</td>
                                <td className="space-x-2 whitespace-nowrap">
                                    <Link to={`/candidates/${candidate.id}`} className="btn btn-primary btn-sm py-1 px-3">
                                        {" "}
                                        {/* Adjusted button class and size */}
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm py-1 px-3" /* Adjusted button class and size */
                                        onClick={() => handleDelete(candidate.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CandidatesListPage

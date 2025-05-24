import React, { useState, useEffect } from "react"
import CandidateService from "../controllers/candidate.controller"
import PartyService from "../controllers/party.controller" // Import PartyService
import { Link } from "react-router-dom"
import Base64Image from "../components/Base64Image" // Added import
import ToastMessage from "../components/ToastMessage" // Import ToastMessage

const CandidatesListPage = () => {
    const [candidates, setCandidates] = useState([])
    const [parties, setParties] = useState([]) // State for parties
    const [message, setMessage] = useState({ text: "", type: "", visible: false }) // State for toast messages

    useEffect(() => {
        fetchCandidates()
        fetchParties() // Fetch parties
    }, [])

    const fetchCandidates = () => {
        CandidateService.getAll()
            .then((data) => {
                setCandidates(data)
            })
            .catch((error) => {
                console.error("Error fetching candidates:", error)
            })
    }

    const fetchParties = () => {
        PartyService.getAll()
            .then((data) => {
                setParties(data)
            })
            .catch((error) => {
                console.error("Error fetching parties:", error)
            })
    }

    const getPartyNameById = (partyId) => {
        if (partyId === null) {
            return "Nezavisan"
        }
        const party = parties.find((p) => p.id === partyId)
        return party ? party.name : "Nezavisan" // Fallback for not found, though ideally all IDs should match
    }

    const handleDelete = (id) => {
        CandidateService.delete(id)
            .then(() => {
                setCandidates(candidates.filter((candidate) => candidate.id !== id))
                setMessage({ text: "Candidate deleted successfully!", type: "success", visible: true })
            })
            .catch((error) => {
                console.error("Error deleting candidate:", error)
                setMessage({ text: `Error deleting candidate: ${error.message}`, type: "error", visible: true })
            })
    }

    return (
        <div className="card">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Candidates</h2>
                {/* Optional: Add a button for creating a new candidate here if needed */}
                <Link to="/candidates/new" className="btn btn-primary">
                    Add Candidate
                </Link>
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
                            <th>Party</th>
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
                                <td>{getPartyNameById(candidate.partyId)}</td>
                                <td>
                                    {new Date(candidate.createdDate).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className="space-x-2 whitespace-nowrap">
                                    <Link to={`/candidates/${candidate.id}`} className="btn btn-primary btn-sm py-1 px-3">
                                        {" "}
                                        {/* Adjusted button class and size */}
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm py-1 px-3 cursor-pointer" /* Adjusted button class and size */
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

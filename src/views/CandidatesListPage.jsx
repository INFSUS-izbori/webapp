import React, { useState, useEffect } from "react"
import CandidateService from "../controllers/candidate.controller"
import PartyService from "../controllers/party.controller"
import { Link } from "react-router-dom"
import Base64Image from "../components/Base64Image"
import ToastMessage from "../components/ToastMessage"

const CandidatesListPage = () => {
    const [candidates, setCandidates] = useState([])
    const [parties, setParties] = useState([])
    const [message, setMessage] = useState({ text: "", type: "", visible: false })
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchCandidates()
        fetchParties()
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
        return party ? party.name : "Nezavisan"
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredCandidates = candidates.filter(
        (candidate) =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.oib.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="card">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Candidates</h2>
                <div className="form-input-with-icon w-1/3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search candidates by name or OIB..."
                        className="form-input w-full"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link to="/candidates/new" className="btn btn-primary">
                    Add Candidate
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-custom">
                    <thead>
                        <tr>
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
                        {filteredCandidates.map((candidate) => (
                            <tr key={candidate.id}>
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
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm py-1 px-3 cursor-pointer"
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

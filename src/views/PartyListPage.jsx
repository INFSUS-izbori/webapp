import React, { useState, useEffect } from "react"
import PartyService from "../controllers/party.controller"
import { Link } from "react-router-dom"
import Base64Image from "../components/Base64Image"
import ToastMessage from "../components/ToastMessage"

const PartyListPage = () => {
    const [parties, setParties] = useState([])
    const [message, setMessage] = useState({ text: "", type: "", visible: false })
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchParties()
    }, [])

    const fetchParties = () => {
        PartyService.getAll()
            .then((data) => {
                setParties(data)
            })
            .catch((error) => {
                console.error("Error fetching parties:", error)
            })
    }

    const handleDelete = (id) => {
        PartyService.delete(id)
            .then(() => {
                setParties(parties.filter((party) => party.id !== id))
                setMessage({ text: "Party deleted successfully!", type: "success", visible: true })
            })
            .catch((error) => {
                console.error("Error deleting party:", error)
                setMessage({ text: `Error deleting party: ${error.message}`, type: "error", visible: true })
            })
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredParties = parties.filter((party) => party.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="card">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Parties</h2>
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
                        placeholder="Search parties by name..."
                        className="form-input w-full"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link to="/parties/new" className="btn btn-primary">
                    Add Party
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date of Establishment</th>
                            <th>Logo</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParties.map((party) => (
                            <tr key={party.id}>
                                <td>{party.name}</td>
                                <td>{party.description}</td>
                                <td>
                                    {new Date(party.dateOfEstablishment).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                                <td>
                                    <Base64Image
                                        base64String={party.logo}
                                        altText={`${party.name} Logo`}
                                        className="h-12 w-12 object-contain rounded"
                                    />
                                </td>
                                <td>
                                    {new Date(party.createdDate).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className="space-x-2 whitespace-nowrap">
                                    <Link to={`/parties/detail/${party.id}`} className="btn btn-success btn-sm py-1 px-3">
                                        {" "}
                                        View
                                    </Link>
                                    <Link to={`/parties/${party.id}`} className="btn btn-primary btn-sm py-1 px-3">
                                        {" "}
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm py-1 px-3 cursor-pointer"
                                        onClick={() => handleDelete(party.id)}>
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

export default PartyListPage

import React, { useState, useEffect } from "react"
import PartyService from "../controllers/party.controller"
import { Link } from "react-router-dom"
import Base64Image from "../components/Base64Image" // Added import
import ToastMessage from "../components/ToastMessage" // Import ToastMessage

const PartyListPage = () => {
    const [parties, setParties] = useState([])
    const [message, setMessage] = useState({ text: "", type: "", visible: false }) // State for toast messages

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

    return (
        <div className="card">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Parties</h2>
                {/* Optional: Add a button for creating a new party here if needed */}
                <Link to="/parties/new" className="btn btn-primary">
                    Add Party
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-custom">
                    <thead>
                        <tr>
                            {/* Removed ID column as it might not be user-facing friendly */}
                            {/* <th className="py-2 px-4 border-b">ID</th> */}
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
                                {/* <td className="py-2 px-4 border-b">{party.id}</td> */}
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
                                        {/* Adjusted button class and size */}
                                        View
                                    </Link>
                                    <Link to={`/parties/${party.id}`} className="btn btn-primary btn-sm py-1 px-3">
                                        {" "}
                                        {/* Adjusted button class and size */}
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm py-1 px-3 cursor-pointer" /* Adjusted button class and size */
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

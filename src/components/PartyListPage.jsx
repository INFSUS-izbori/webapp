import React, { useState, useEffect } from "react"
import PartyService from "../services/party.service"
import { Link } from "react-router-dom"
import Base64Image from "./Base64Image" // Added import

const PartyListPage = () => {
    const [parties, setParties] = useState([])

    useEffect(() => {
        fetchParties()
    }, [])

    const fetchParties = async () => {
        try {
            const response = await PartyService.getAll()
            setParties(response.data)
        } catch (error) {
            console.error("Error fetching parties:", error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await PartyService.delete(id)
            setParties(parties.filter((party) => party.id !== id))
        } catch (error) {
            console.error("Error deleting party:", error)
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Parties</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Date of Establishment</th>
                            <th className="py-2 px-4 border-b">Logo</th>
                            <th className="py-2 px-4 border-b">Created Date</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map((party) => (
                            <tr key={party.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{party.id}</td>
                                <td className="py-2 px-4 border-b">{party.name}</td>
                                <td className="py-2 px-4 border-b">{party.description}</td>
                                <td className="py-2 px-4 border-b">{party.dateOfEstablishment}</td>
                                <td className="py-2 px-4 border-b">
                                    <Base64Image
                                        base64String={party.logo}
                                        altText={`${party.name} Logo`}
                                        className="h-12 w-auto max-w-xs"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{party.createdDate}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link
                                        to={`/parties/detail/${party.id}`} // Changed Link to point to detail page
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/parties/${party.id}`} // This is the existing edit link
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Edit
                                    </Link>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

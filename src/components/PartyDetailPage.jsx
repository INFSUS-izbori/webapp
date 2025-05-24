import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import PartyService from "../services/party.service"
import CandidateService from "../services/candidate.service"
import Base64Image from "./Base64Image"

const PartyDetailPage = () => {
    const { id } = useParams() // Get party ID from URL
    const [party, setParty] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPartyDetailsAndCandidates = async () => {
            setLoading(true)
            setError(null)
            try {
                // Fetch party details
                const partyResponse = await PartyService.getById(id)
                setParty(partyResponse.data)

                // Fetch all candidates and filter by partyId
                const candidatesResponse = await CandidateService.getAll()
                // Ensure partyId from URL (string) is compared correctly with candidate.partyId (likely number)
                const partyCandidates = candidatesResponse.data.filter((candidate) => candidate.partyId === id)
                setCandidates(partyCandidates)
            } catch (err) {
                console.error("Error fetching party details or candidates:", err)
                setError("Failed to load party details and candidates. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchPartyDetailsAndCandidates()
        }
    }, [id])

    if (loading)
        return (
            <div className="container mx-auto mt-8 text-center">
                <p className="text-xl">Loading party details...</p>
            </div>
        )
    if (error)
        return (
            <div className="container mx-auto mt-8 text-center">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        )
    if (!party)
        return (
            <div className="container mx-auto mt-8 text-center">
                <p className="text-xl">Party not found.</p>
            </div>
        )

    return (
        <div className="container mx-auto mt-8 p-4">
            {/* Party Details Section */}
            <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-gray-800">{party.name}</h2>
                    <Link
                        to={`/parties/${party.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                        Edit Party
                    </Link>
                </div>
                {party.logo && (
                    <div className="mb-6 flex justify-center">
                        <Base64Image
                            base64String={party.logo}
                            altText={`${party.name} Logo`}
                            className="h-40 w-auto max-w-md rounded-md border-2 border-gray-200 shadow-sm"
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                    <div>
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold text-gray-600">Description:</span>
                        </p>
                        <p className="text-gray-800 pl-2">{party.description || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold text-gray-600">Established:</span>
                        </p>
                        <p className="text-gray-800 pl-2">{party.dateOfEstablishment || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold text-gray-600">Record Created:</span>
                        </p>
                        <p className="text-gray-800 pl-2">{party.createdDate ? new Date(party.createdDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                </div>
            </div>

            {/* Candidates Section */}
            <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Candidates</h3>
                {candidates.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="py-3 px-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="py-3 px-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        OIB
                                    </th>
                                    <th className="py-3 px-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="py-3 px-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                                        <td className="py-4 px-5 border-b border-gray-200">
                                            <Base64Image
                                                base64String={candidate.image}
                                                altText={`${candidate.name} Image`}
                                                className="h-14 w-14 object-cover rounded-full shadow-sm"
                                            />
                                        </td>
                                        <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-900">{candidate.name}</td>
                                        <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{candidate.oib}</td>
                                        <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                                            {candidate.description}
                                        </td>
                                        <td className="py-4 px-5 border-b border-gray-200">
                                            <Link
                                                to={`/candidates/${candidate.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150 ease-in-out">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No candidates found for this party.</p>
                )}
                <div className="mt-8 text-center">
                    <Link
                        to="/parties"
                        className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-150 ease-in-out">
                        &larr; Back to Parties List
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PartyDetailPage

import React, { useState, useEffect } from "react"
import PartyService from "../controllers/party.controller"
import CandidateService from "../controllers/candidate.controller"
import { useParams, Link } from "react-router-dom"
import Base64Image from "../components/Base64Image"

const PartyDetailPage = () => {
    const { id } = useParams()
    const [party, setParty] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchPartyDetails = () => {
            setLoading(true)
            PartyService.getById(id)
                .then((partyData) => {
                    if (partyData && partyData.logo && partyData.logo.startsWith("data:image")) {
                        partyData.logo = partyData.logo.split(",")[1]
                    }
                    setParty(partyData)
                    return CandidateService.getAll()
                })
                .then((candidatesData) => {
                    const partyCandidates = Array.isArray(candidatesData)
                        ? candidatesData.filter((candidate) => candidate.partyId === id)
                        : []
                    setCandidates(partyCandidates)
                    setError(null)
                })
                .catch((err) => {
                    console.error("Error fetching party details:", err)
                    setError("Failed to load party details. Please try again later.")
                    setParty(null)
                    setCandidates([])
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        fetchPartyDetails()
    }, [id])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredCandidates = candidates.filter(
        (candidate) =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (candidate.oib && candidate.oib.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Loading party details...</p>
            </div>
        )
    }

    if (error) {
        return <div className="card alert alert-danger">{error}</div>
    }

    if (!party) {
        return (
            <div className="card">
                <p className="text-lg text-center text-gray-500">Party not found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="card">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                    <Base64Image
                        base64String={party.logo}
                        altText={`${party.name} Logo`}
                        className="h-32 w-32 object-contain rounded-lg shadow-md mr-0 md:mr-8 mb-4 md:mb-0"
                    />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">{party.name}</h1>
                        <p className="text-gray-600 text-lg mb-1">{party.description}</p>
                        <p className="text-sm text-gray-500 mb-1">
                            Established:{" "}
                            {new Date(party.dateOfEstablishment).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                        <p className="text-sm text-gray-500">
                            Record Created:{" "}
                            {new Date(party.createdDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                    </div>
                    <Link to={`/parties/${party.id}`} className="btn btn-primary mt-4 md:mt-0 self-start md:self-auto">
                        Edit Party
                    </Link>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Candidates</h2>
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
                </div>
                {filteredCandidates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCandidates.map((candidate) => (
                            <div key={candidate.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                                <Base64Image
                                    base64String={candidate.image}
                                    altText={`${candidate.name} Image`}
                                    className="h-24 w-24 object-contain rounded-full mx-auto mb-3 shadow-sm"
                                />
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">{candidate.name}</h3>
                                <p className="text-sm text-gray-600 text-center mb-1">OIB: {candidate.oib}</p>
                                <p className="text-sm text-gray-500 text-center truncate" title={candidate.description}>
                                    {candidate.description}
                                </p>
                                <div className="mt-3 text-center">
                                    <Link to={`/candidates/${candidate.id}`} className="btn btn-secondary btn-sm py-1 px-3">
                                        Edit Candidate
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No candidates found for this party.</p>
                )}
            </div>

            <div className="mt-8 text-center">
                <Link to="/parties" className="btn btn-link">
                    &larr; Back to Parties List
                </Link>
            </div>
        </div>
    )
}

export default PartyDetailPage

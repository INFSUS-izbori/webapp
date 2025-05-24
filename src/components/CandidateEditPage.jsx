import React, { useState, useEffect } from "react"
import CandidateService from "../services/candidate.service"
import { useParams, useNavigate, Link } from "react-router-dom"

const CandidateEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [candidate, setCandidate] = useState({
        oib: "",
        name: "",
        image: "",
        description: "",
        partyId: "",
    })

    useEffect(() => {
        fetchCandidate()
    }, [id])

    const fetchCandidate = async () => {
        try {
            const response = await CandidateService.getById(id)
            setCandidate(response.data)
        } catch (error) {
            console.error("Error fetching candidate:", error)
        }
    }

    const handleChange = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await CandidateService.update(id, candidate)
            navigate("/candidates")
        } catch (error) {
            console.error("Error updating candidate:", error)
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Candidate</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oib">
                        OIB:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="oib"
                        type="text"
                        name="oib"
                        value={candidate.oib}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={candidate.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="text"
                        name="image"
                        value={candidate.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        value={candidate.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partyId">
                        Party ID:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="partyId"
                        type="text"
                        name="partyId"
                        value={candidate.partyId}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Update
                    </button>
                    <Link to="/candidates" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CandidateEditPage

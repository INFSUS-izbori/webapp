import React, { useState, useEffect } from "react"
import CandidateService from "../services/candidate.service"
import { useParams, useNavigate, Link } from "react-router-dom"
import Base64Image from "../components/Base64Image" // Import the Base64Image component

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
        <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Edit Candidate</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="form-label" htmlFor="oib">
                        OIB:
                    </label>
                    <input className="form-input" id="oib" type="text" name="oib" value={candidate.oib} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="form-input"
                        id="name"
                        type="text"
                        name="name"
                        value={candidate.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="image">
                        Image (Base64 String):
                    </label>
                    <textarea className="form-input h-32" id="image" name="image" value={candidate.image} onChange={handleChange} />
                    {candidate.image && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                            <Base64Image
                                base64String={candidate.image}
                                altText="Candidate Preview"
                                className="h-24 w-24 object-contain rounded border"
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="form-input h-24"
                        id="description"
                        name="description"
                        value={candidate.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="partyId">
                        Party ID:
                    </label>
                    <input
                        className="form-input"
                        id="partyId"
                        type="number"
                        name="partyId"
                        value={candidate.partyId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-start space-x-4 pt-4">
                    <button className="btn btn-primary" type="submit">
                        Update Candidate
                    </button>
                    <Link to="/candidates" className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CandidateEditPage
